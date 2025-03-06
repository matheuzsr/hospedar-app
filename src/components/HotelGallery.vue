<template>
  <BaseModal v-model="modelValue" class="p-4" width="800px">
    <div
      class="mb-6 border-2 border-dashed p-8 rounded-lg text-center"
      :class="{
        'border-gray-300': !isDragging,
      }"
      :style="
        isDragging &&
        'border-color: blue; background-color: rgba(0, 0, 255, 0.1)'
      "
      @dragenter.prevent="isDragging = true"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop="handleDrop"
    >
      <div v-if="isUploading" class="mb-4">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto"
          style="border-color: blue"
        />
        <p class="mt-2 text-gray-600">Enviando imagens...</p>
      </div>
      <div v-else>
        <p class="text-gray-600 mb-4">
          Arraste e solte as imagens aqui ou clique para selecionar os arquivos
        </p>
        <input
          ref="fileInput"
          type="file"
          multiple
          accept="image/*"
          class="hidden"
          @change="handleFileInput"
        />
        <Button
          class="px-4 py-2 rounded transition"
          @click="$refs.fileInput.click()"
        >
          Selecione as imagens
        </Button>
      </div>
    </div>

    <draggable
      v-model="images"
      class="grid gap-4 mt-4"
      style="grid-template-columns: 1fr 1fr 1fr"
      item-key="path"
      :animation="200"
      @end="saveImageOrder"
    >
      <template #item="{ element: image }">
        <div
          class="relative w-[32px] h-[32px] rounded-lg group cursor-move shadow-lg"
        >
          <img
            class="w-full h-full rounded-lg object-cover"
            :src="image.url"
            alt="Hotel image"
          />
          <div
            class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center"
          >
            <Button
              class="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
              :disabled="image.isDeleting"
              variant="destructive"
              @click.stop="deleteImage(image)"
            >
              <span v-if="image.isDeleting">Deleting...</span>
              <span v-else>Delete</span>
            </Button>
          </div>
        </div>
      </template>
    </draggable>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import draggable from "vuedraggable"
import BaseModal from "./@base/BaseModal.vue"
import { HotelImageService } from "~/infra/service/HotelImageService"
import Button from "~/components/ui/button/Button.vue"

interface ImageInfo {
  url: string
  path: string
  order: number
  isDeleting?: boolean
}
const modelValue = ref(false)
const props = defineProps<{ hotelId: number }>()

const images = ref<ImageInfo[]>([])
const isDragging = ref(false)
const isUploading = ref(false)
const isSavingOrder = ref(false)

async function loadImages() {
  const response = await hotelImageService.getList(props.hotelId)
  if (response.error) return

  images.value = response.data.map((image: any) => ({
    url: image.publicUrl,
    path: image.pathImage,
    order: image.imageOrder,
  }))
}

const hotelImageService = new HotelImageService()
async function uploadImages(files: FileList | File[]) {
  for (const file of files) {
    const compressedFile = await compressImage(file)

    isUploading.value = true
    const response = await hotelImageService.upload(
      props.hotelId,
      file.name,
      compressedFile
    )
    isUploading.value = false

    if (response.error) return
  }
  loadImages()
}

async function deleteImage(image: ImageInfo) {
  if (image.isDeleting) return
  if (!confirm("Tem certeza que deseja deletar essa imagem?")) return

  image.isDeleting = true
  const response = await hotelImageService.delete(props.hotelId, image.path)
  image.isDeleting = false

  if (response.error) return

  loadImages()
}

function handleDrop(e: DragEvent) {
  e.preventDefault()
  isDragging.value = false

  if (!e.dataTransfer?.files) return
  uploadImages(e.dataTransfer.files)
}

function handleFileInput(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files) return
  uploadImages(input.files)
}

async function saveImageOrder() {
  isSavingOrder.value = true
  try {
    // Update the order property of each image
    images.value = images.value.map((img, index) => ({ ...img, order: index }))

    // Here you would typically save the order to your database
    // For now, we'll just show a success message
    console.log("New order saved:", images.value)
  } catch (error) {
    console.error("Error saving image order:", error)
  } finally {
    isSavingOrder.value = false
  }
}
onMounted(() => loadImages())
</script>
