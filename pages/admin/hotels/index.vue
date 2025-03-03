<template>
  <div class="min-h-screen bg-gray-50">
    <div class="bg-white shadow">
      <div class="container mx-auto px-4 py-6">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-slate-800">
            Gerenciamento geral
          </h1>
          <Button
            class="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
            @click="handleEditHotel"
          >
            <PlusIcon class="w-5 h-5 mr-2" />
            Novo Hotel
          </Button>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center space-x-4">
            <MagnifyingGlassIcon class="w-5 h-5 text-slate-400" />
            <Input
              v-model="search"
              type="text"
              placeholder="Buscar hotéis..."
              class="flex-1 border-0 focus:ring-0 text-slate-800 placeholder-slate-400 text-sm"
            />
          </div>
        </div>

        <div class="p-4">
          <BaseTable
            :items="hotelsWithFilter"
            :headers
            max-height="600px"
            :loading
          >
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template #item.action="{ item }">
              <div class="flex gap-2 items-center">
                <BuildingOfficeIcon
                  class="w-5 h-5 cursor-pointer hover:opacity-30"
                  @click="handleOpenRoom(item)"
                />
                <PencilSquareIcon
                  class="w-5 h-5 cursor-pointer hover:opacity-30"
                  @click="handleEditHotel(item)"
                />
                <Button
                  class="text-red-300 shadow-none hover:text-red-200 hover:bg-transparent"
                  variant="ghost"
                  size="icon"
                  :loading="!!item.loading"
                  @click="handleDeleteHotel(item)"
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
    <HotelEditModal
      v-model="showEditHotelModal"
      :data="editHotelData"
      @saved="getList"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import {
  PencilSquareIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  BuildingOfficeIcon,
} from "@heroicons/vue/24/outline"
import { HotelService } from "~/infra/service/HotelService"
import BaseTable from "~/src/components/@base/BaseTable.vue"
import HotelEditModal from "~/src/components/HotelEditModal.vue"
import Input from "~/components/ui/input/Input.vue"
import Button from "~/components/ui/button/Button.vue"

const showEditHotelModal = ref(false)
const editHotelData = ref({})
const hotels = ref()
const search = ref("")
const loading = ref(false)
onBeforeMount(async () => getList())

const hotelsWithFilter = computed(() => {
  if (!hotels.value) return []

  return hotels.value?.filter((hotel: any) => {
    return hotel.name.toLowerCase().includes(search.value.toLowerCase())
  })
})

const headers = computed(() => {
  return [
    {
      value: "action",
      text: "Ação",
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
      value: "streetName",
      text: "Rua",
    },
    {
      value: "addressNeighborhood",
      text: "Bairro",
    },
    {
      value: "zipCode",
      text: "CEP",
      width: "100px",
    },
    {
      value: "addressNumber",
      text: "Número",
    },
    {
      value: "latitude",
      text: "Latitude",
    },
    {
      value: "longitude",
      text: "Longitude",
    },
    {
      value: "checkinTime",
      text: "Checkin",
    },
    {
      value: "checkoutTime",
      text: "Checkout",
    },
    {
      value: "actions",
      text: "Ações",
    },
  ]
})

const service = new HotelService()
function handleEditHotel(data?: any) {
  editHotelData.value = data || {}
  showEditHotelModal.value = true
}

const router = useRouter()
function handleOpenRoom(data: any) {
  router.push(`/admin/hotels/${data.id}/rooms`)
}

async function handleDeleteHotel(data: any) {
  data.loading = true
  await service.delete(data.id)
  data.loading = false

  getList()
}

async function getList() {
  loading.value = true
  const response = await service.getList()
  hotels.value = response
  loading.value = false
}
</script>
