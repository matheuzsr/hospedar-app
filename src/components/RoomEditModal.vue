<template>
  <BaseModal
    v-model="modelValue"
    title="Edição do Quarto "
    description="Edite as informações do Quarto"
    width="668px"
    :save-button="{ text: 'Salvar', action: handleSave, loading: loading }"
  >
    <div class="flex flex-col gap-4 py-4">
      <div class="grid gap-4" style="grid-template-columns: 1fr 2fr">
        <div class="flex flex-col w-full">
          <Label>Nome</Label>
          <BaseInput v-model="roomData.name" class="mt-2" />
        </div>
        <div class="flex flex-col w-full">
          <Label>Descrição</Label>
          <BaseInput v-model="roomData.description" class="mt-2" />
        </div>
      </div>
      <div class="grid gap-4" style="grid-template-columns: 3fr 3fr 2fr 1fr">
        <div class="flex flex-col w-full">
          <Label>Preço por noite(R$)</Label>
          <BaseInput
            v-model="roomData.pricePerNight"
            class="mt-2"
            type="number"
          />
        </div>
        <div class="flex flex-col w-full">
          <Label>Qtd. de hóspedes</Label>
          <BaseInput v-model="roomData.maxGuests" class="mt-2" type="number" />
        </div>
        <div class="flex flex-col w-full">
          <Label>Tamanho(m²)</Label>
          <BaseInput v-model="roomData.size" class="mt-2" type="number" />
        </div>
        <div class="flex flex-col w-full">
          <Label>Andar</Label>
          <BaseInput v-model="roomData.floor" class="mt-2" type="number" />
        </div>
      </div>
      <div class="flex border border-gray-600 rounded-lg p-4">
        <div class="flex flex-col w-full">
          <Label>Ar condicionado</Label>
          <BaseRadioGroupBoolean
            v-model="roomData.hasAirConditioning"
            class="mt-2"
          />
        </div>
        <div class="flex flex-col w-full">
          <Label>TV</Label>
          <BaseRadioGroupBoolean v-model="roomData.hasTv" class="mt-2" />
        </div>
        <div class="flex flex-col w-full">
          <Label>Frigobar</Label>
          <BaseRadioGroupBoolean v-model="roomData.hasMinibar" class="mt-2" />
        </div>
        <div class="flex flex-col w-full">
          <Label>Permite fumar</Label>
          <BaseRadioGroupBoolean
            v-model="roomData.smokingAllowed"
            class="mt-2"
          />
        </div>
      </div>
      <div class="flex flex-col w-full mt-2">
        <Label class="mb-2">Tipo de banheiro</Label>
        <BaseSelect
          v-model="roomData.bathroomType"
          :items="bathroomTypeList"
          placeholder="Selecione o tipo de banheiro"
        />
        <div class="grid gap-4 mt-4" style="grid-template-columns: 1fr 1fr 1fr">
          <div class="flex flex-col w-full">
            <Label class="mb-2">Tipo de TV</Label>
            <BaseSelect
              v-model="roomData.tvType"
              :items="tvTypeList"
              placeholder="Selecione o tipo de TV"
            />
          </div>
          <div class="flex flex-col w-full">
            <Label class="mb-2">Tipo de vista</Label>
            <BaseSelect
              v-model="roomData.viewType"
              :items="viewTypeList"
              placeholder="Selecione o tipo de vista"
            />
          </div>
          <div class="flex flex-col w-full">
            <Label class="mb-2">Tipo de cama</Label>
            <BaseSelect
              v-model="roomData.bedType"
              :items="bedTypeList"
              placeholder="Selecione o tipo de cama"
            />
          </div>
        </div>
        <div class="flex flex-col w-full mt-4">
          <Label class="mb-2">Características adicionais</Label>
          <BaseInput v-model="roomData.additionalFeatures" class="mt-2" />
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from "vue"
import BaseModal from "./@base/BaseModal.vue"
import { RoomService } from "~/infra/service/RoomService"
import BaseInput from "./@base/BaseInput.vue"
import Label from "@/components/ui/label/Label.vue"
import BaseRadioGroupBoolean from "./@base/BaseRadioGroupBoolean.vue"
import BaseSelect from "./@base/BaseSelect.vue"

const modelValue = defineModel<boolean>()
const loading = ref(false)
const props = defineProps<{ data: any; hotelId: number }>()
const tvTypeList = ref<{ value: string; label: string }[]>([])
const bathroomTypeList = ref<{ value: string; label: string }[]>([])
const viewTypeList = ref<{ value: string; label: string }[]>([])
const bedTypeList = ref<{ value: string; label: string }[]>([])

const roomData = ref({
  id: null,
  name: "",
  description: "",
  hasAirConditioning: true,
  hasTv: false,
  tvType: "",
  hasMinibar: false,
  bathroomType: "",
  viewType: "",
  smokingAllowed: false,
  maxGuests: 0,
  size: 0,
  pricePerNight: 0,
  additionalFeatures: "",
  bedType: "",
  floor: 0,
})

const emits = defineEmits(["saved"])

const service = new RoomService()
async function handleSave() {
  try {
    loading.value = true
    await saveHotel()
    modelValue.value = false
    emits("saved")
  } catch (error) {
    console.error("Error saving hotel:", error)
  } finally {
    loading.value = false
  }
}

function saveHotel() {
  if (roomData.value.id) {
    return service.edit(props.hotelId, roomData.value.id, roomData.value)
  }

  return service.create(props.hotelId, roomData.value)
}

watch(
  () => modelValue.value,
  async () => {
    if (!modelValue.value) return
    roomData.value = { ...props.data }
    await getTvTypeList()
    await getBathroomTypeList()
    await getViewTypeListList()
    await getBedTypeListList()
  }
)

async function getTvTypeList() {
  tvTypeList.value = [
    { value: "smart-tv", label: "Smart TV" },
    { value: "cable-tv", label: "TV a cabo" },
    { value: "normal-tv", label: "TV" },
    { value: "lcd", label: "LCD" },
    { value: "led", label: "LED" },
  ]
}
async function getBathroomTypeList() {
  bathroomTypeList.value = [
    { value: "private", label: "Privativo" },
    { value: "shared", label: "Compartilhado" },
  ]
}
async function getViewTypeListList() {
  viewTypeList.value = [
    { value: "beach", label: "Praia" },
    { value: "mountain", label: "Montanha" },
    { value: "city", label: "Cidade" },
    { value: "lake", label: "Lago" },
    { value: "river", label: "Rio" },
  ]
}
async function getBedTypeListList() {
  bedTypeList.value = [
    { value: "single", label: "Solteiro" },
    { value: "double", label: "Casal" },
    { value: "queen", label: "Queen" },
    { value: "king", label: "King" },
    { value: "bunk", label: "Beliche" },
  ]
}
</script>
