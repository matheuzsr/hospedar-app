<template>
  <BaseModal
    v-model="modelValue"
    title="Edição do Hotel"
    description="Edite as informações do Hotel Fazenda Império do Vale"
    width="680px"
    :save-button="{ text: 'Salvar', action: handleSave }"
  >
    <div class="flex flex-col gap-4 py-4">
      <div class="flex flex-col w-full">
        <Label>Nome</Label>
        <BaseInput v-model="hotelData.name" class="mt-2" />
      </div>
      <div class="flex flex-col w-full">
        <Label>Descrição</Label>
        <BaseInput v-model="hotelData.description" class="mt-2" />
      </div>
      <div class="flex gap-4">
        <div class="flex flex-col w-full">
          <Label>CEP</Label>
          <BaseInput v-model="hotelData.zipCode" class="mt-2" />
        </div>
        <div class="flex flex-col w-full">
          <Label>Número</Label>
          <BaseInput v-model="hotelData.addressNumber" class="mt-2" />
        </div>
      </div>
      <div class="flex gap-4">
        <div class="flex flex-col w-full">
          <Label>Latitude</Label>
          <BaseInput v-model="hotelData.latitude" class="mt-2" />
        </div>
        <div class="flex flex-col w-full">
          <Label>Longitude</Label>
          <BaseInput v-model="hotelData.longitude" class="mt-2" />
        </div>
      </div>
      <div class="flex gap-4">
        <div class="flex flex-col w-full">
          <Label>Checkin</Label>
          <BaseInput v-model="hotelData.checkinTime" class="mt-2" />
        </div>
        <div class="flex flex-col w-full">
          <Label>Checkout</Label>
          <BaseInput v-model="hotelData.checkoutTime" class="mt-2" />
        </div>
      </div>
      <div>
        <Label>Serviços Inclusos</Label>
        <BaseMultiSelect
          v-model="hotelData.includedAmenities"
          :options="amenityList"
          :loading-creating="hotelData.loadingsIncludedServices"
          @create="(newName: string) => handleCreateItem(newName)"
        />
      </div>
      <div>
        <Label>Serviços Opcionais</Label>
        <BaseMultiSelect
          v-model="hotelData.optionalAmenities"
          :options="amenityList"
          :loading-creating="hotelData.loadingsOptionalServices"
          @create="handleCreateItem"
        />
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from "vue"
import BaseInput from "./@base/BaseInput.vue"
import BaseModal from "./@base/BaseModal.vue"
import BaseMultiSelect from "./@base/BaseMultiSelect.vue"
import { HotelService } from "~/infra/service/HotelService"
import { AmenityService } from "~/infra/service/AmenityService"

// const hotelService = new HotelService()
const amenityService = new AmenityService()
const modelValue = defineModel<boolean>()
const props = defineProps<{ data: any }>()

const hotelData = ref({
  name: "",
  description: "",
  streetName: "",
  addressNeighborhood: "",
  zipCode: "",
  addressNumber: "",
  latitude: "",
  longitude: "",
  checkinTime: "",
  checkoutTime: "",
  includedAmenities: [],
  optionalAmenities: [],
  loadingsIncludedServices: false,
  loadingsOptionalServices: false,
})

const amenityList = ref<{ value: string; label: string }[]>([])

const handleSave = () => {
  // Implement save logic here
  console.log("Saving changes:", hotelData.value)
}

async function handleCreateItem(name: any) {
  hotelData.value.loadingsIncludedServices = true
  const response = await amenityService.create(name)
  hotelData.value.loadingsIncludedServices = false
  if(response.error) return

  amenityList.value.push({ value: name, label: name })
}

watch(() => modelValue.value, async () => {
  if (!modelValue.value) return
  await getAmenityList()
  await getAmenityList()

  hotelData.value = props.data
})

async function getAmenityList() {
  try {
    const response = await amenityService.getList()
    const list = response.map((item: any) => ({ value: item.name, label: item.name }))
    amenityList.value = list
  } catch (error) {
    console.error("Error getting amenity list:", error)
    amenityList.value = []
  }
}
</script>
