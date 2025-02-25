<template>
  <div class="min-h-screen bg-gray-50">
    <div class="bg-white shadow">
      <div class="container mx-auto px-4 py-6">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-slate-800">
            Gerenciamento de Hotéis
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
          <BaseTable :items="hotelsWithFilter" :headers max-height="600px">
            <template #item.action="{ item }">
              <div class="flex gap-2 items-center">
                <PencilSquareIcon
                  class="w-5 h-5 cursor-pointer hover:opacity-10"
                  @click="handleEditHotel(item)"
                />
                <TrashIcon class="w-5 h-5 cursor-pointer hover:text-red-300" @click="handleDeleteHotel(item)" />
              </div>
            </template>
          </BaseTable>
        </div>
      </div>
    </div>
    <HotelEditModal v-model="showEditHotelModal" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import {
  PencilSquareIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline"
import { HotelService } from "~/infra/service/HotelService"
import BaseTable from "~/src/components/@base/BaseTable.vue"
import HotelEditModal from "~/src/components/HotelEditModal.vue"
import Input from "~/components/ui/input/Input.vue"

const showEditHotelModal = ref(false)
const hotels = ref()
const search = ref("")
onBeforeMount(async () => {
  
})

const hotelsWithFilter = computed(() => {
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
      value: "street_name",
      text: "Rua",
    },
    {
      value: "address_neighborhood",
      text: "Bairro",
    },
    {
      value: "zip_code",
      text: "CEP",
    },
    {
      value: "address_number",
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
      value: "checkin_time",
      text: "Checkin",
    },
    {
      value: "checkout_time",
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
  console.log(data)
  showEditHotelModal.value = true
}

function handleDeleteHotel(data: any) {
  debugger
  service.delete(data.id)

  getList()
}

async function getList() {
  const response = await service.getList()
  hotels.value = response
}
</script>
