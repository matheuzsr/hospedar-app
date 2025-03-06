<template>
  <div class="min-h-screen bg-gray-50">
    <div class="bg-white shadow">
      <div class="container mx-auto px-4 py-6">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-slate-800">
            Gerenciamento de hotel
            <template v-if="hotelName">| {{ hotelName }}</template>
          </h1>
          <div class="flex gap-4">
            <Button
              class="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              @click="handleShowImageManager"
            >
              <ImageIcon class="w-5 h-5 mr-2" />
              Gestão de Imagens
            </Button>
            <Button
              class="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
              @click="handleEditRoom"
            >
              <PlusIcon class="w-5 h-5 mr-2" />
              Novo Quarto
            </Button>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <Button class="mb-4" variant="outline" outlined @click="goBack">
        <ArrowLeftIcon class="w-5 h-5 mr-2" />
        Voltar
      </Button>
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center space-x-4">
            <MagnifyingGlassIcon class="w-5 h-5 text-slate-400" />
            <Input
              v-model="search"
              type="text"
              placeholder="Buscar quarto..."
              class="flex-1 border-0 focus:ring-0 text-slate-800 placeholder-slate-400 text-sm"
            />
          </div>
        </div>

        <div class="p-4">
          <BaseTable
            :items="roomWithFilter"
            :headers
            max-height="600px"
            :loading
          >
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template #item.action="{ item }">
              <div class="flex gap-2 items-center">
                <PencilSquareIcon
                  class="w-5 h-5 cursor-pointer hover:opacity-30"
                  @click="handleEditRoom(item)"
                />
                <Button
                  class="text-red-300 shadow-none hover:text-red-200 hover:bg-transparent"
                  variant="ghost"
                  size="icon"
                  :loading="!!item.loading"
                  @click="handleDeleteRoom(item)"
                >
                  <TrashIcon
                    class="w-[24px] h-[24px] cursor-pointer hover:text-red-300"
                  />
                </Button>
              </div>
            </template>
          </BaseTable>
        </div>
      </div>
    </div>
    <RoomEditModal
      v-model="showEditRoomModal"
      :data="editRoomData"
      :hotel-id
      @saved="getList"
    />
    <HotelGalleryModal v-model="showImageManager" :hotel-id="hotelId" :hotel-name="hotelName" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import {
  PencilSquareIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  ArrowLeftIcon,
} from "@heroicons/vue/24/outline"
import { RoomService } from "~/infra/service/RoomService"
import BaseTable from "~/src/components/@base/BaseTable.vue"
import RoomEditModal from "~/src/components/RoomEditModal.vue"
import Input from "~/components/ui/input/Input.vue"
import Button from "~/components/ui/button/Button.vue"
import { HotelService } from "~/infra/service/HotelService"
import { ImageIcon } from "lucide-vue-next"
import HotelGalleryModal from "~/src/components/HotelGalleryModal.vue"

const showEditRoomModal = ref<boolean>(false)
const showImageManager = ref<boolean>(false)
const editRoomData = ref({})
const room = ref()
const search = ref("")
const loading = ref(false)
const hotelName = ref()
const hotelId = computed(() => Number(route.params.hotel_id))
onBeforeMount(async () => getList())

const roomWithFilter = computed(() => {
  if (!room.value) return []

  return room.value?.filter((Room: any) => {
    return Room.name.toLowerCase().includes(search.value.toLowerCase())
  })
})

const headers = computed(() => {
  return [
    {
      value: "action",
      text: "Ações",
    },
    {
      value: "name",
      text: "Nome",
    },
    {
      value: "description",
      text: "Descrição",
    },
    {
      value: "bedType",
      text: "Tipo de Cama",
    },
    {
      value: "hasAirConditioning",
      text: "Ar-condicionado",
    },
    {
      value: "hasTv",
      text: "TV",
    },
    {
      value: "tvType",
      text: "Tipo de TV",
    },
    {
      value: "hasMinibar",
      text: "Minibar",
    },
    {
      value: "bathroomType",
      text: "Tipo de Banheiro",
    },
    {
      value: "viewType",
      text: "Tipo de Vista",
    },
    {
      value: "smokingAllowed",
      text: "Permite Fumar",
    },
    {
      value: "maxGuests",
      text: "Máximo de Hóspedes",
    },
    {
      value: "size",
      text: "Tamanho (m²)",
    },
    {
      value: "price_per_night",
      text: "Preço por Noite",
    },
    {
      value: "additional_features",
      text: "Características Adicionais",
    },
    {
      value: "floor",
      text: "Andar",
    },
    {
      value: "status",
      text: "Status",
    },
  ]
})

const service = new RoomService()
function handleEditRoom(data?: any) {
  editRoomData.value = data || {}
  showEditRoomModal.value = true
}

async function handleDeleteRoom(room: any) {
  const hotelId = Number(route.params.hotel_id)
  room.loading = true
  await service.delete(hotelId, room.id)
  room.loading = false

  getList()
}

async function getList() {
  loading.value = true
  const response = await service.getList(hotelId.value)
  loading.value = false

  room.value = response.data
}

const route = useRoute()
const hotelService = new HotelService()
async function getHotelData() {
  loading.value = true
  const response = await hotelService.get(hotelId.value)
  hotelName.value = response?.name
  loading.value = false
}

const router = useRouter()
function goBack() {
  router.push("/admin/hotels")
}

function handleShowImageManager() {
  showImageManager.value = true
}

onBeforeMount(async () => getHotelData())
</script>
