<template>
  <BaseModal
    v-model="modelValue"
    title="Edição do Hotel"
    description="Edite as informações do Hotel Fazenda Império do Vale"
    width="540px"
    :save-button="{ text: 'Salvar', action: handleSave, loading: loading }"
  >
    <div class="flex flex-col gap-4 py-4">
      <div class="grid gap-4" style="grid-template-columns: 1fr 2fr">
        <div class="flex flex-col w-full">
          <Label>Nome</Label>
          <BaseInput v-model="hotelData.name" class="mt-2" />
        </div>
        <div class="flex flex-col w-full">
          <Label>Descrição</Label>
          <BaseInput v-model="hotelData.description" class="mt-2" />
        </div>
      </div>
      <div class="grid gap-4" style="grid-template-columns: 1fr 4fr">
        <div class="flex flex-col w-full">
          <Label>CEP</Label>
          <BaseInput v-model="hotelData.zipCode" class="mt-2" />
        </div>
        <div class="flex flex-col w-full">
          <Label>Rua</Label>
          <BaseInput v-model="hotelData.streetName" class="mt-2" />
        </div>
      </div>
      <div class="grid gap-4" style="grid-template-columns: 4fr 1fr">
        <div class="flex flex-col w-full">
          <Label>Bairro</Label>
          <BaseInput v-model="hotelData.addressNeighborhood" class="mt-2" />
        </div>
        <div class="flex flex-col w-full">
          <Label>Número</Label>
          <BaseInput v-model="hotelData.addressNumber" class="mt-2" />
        </div>
      </div>
      <!-- <div class="grid gap-4" style="grid-template-columns: 3fr 3fr 1fr 1fr">
        <div class="flex flex-col w-full">
          <Label>Latitude</Label>
          <BaseInput v-model="hotelData.latitude" class="mt-2" />
        </div>
        <div class="flex flex-col w-full">
          <Label>Longitude</Label>
          <BaseInput v-model="hotelData.longitude" class="mt-2" />
        </div>
      </div> -->
      <div class="grid gap-4" style="grid-template-columns: 1fr 1fr">
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
      <div class="grid gap-4" style="grid-template-columns: 1fr 1fr">
        <div class="grid gap-4" style="grid-template-columns: 1fr 1fr">
          <div class="flex flex-col w-full">
            <Label>Checkin</Label>
            <BaseInput
              v-model="hotelData.checkinTime"
              class="mt-2"
              type="time"
            />
          </div>
          <div class="flex flex-col w-full">
            <Label>Checkout</Label>
            <BaseInput
              v-model="hotelData.checkoutTime"
              class="mt-2"
              type="time"
            />
          </div>
        </div>
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

const amenityService = new AmenityService()
const modelValue = defineModel<boolean>()
const props = defineProps<{ data: any }>()
const amenityList = ref<{ value: string; label: string }[]>([])
const loading = ref(false)

const hotelData = ref({
  id: null,
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
  includedAmenities: [] as string[],
  optionalAmenities: [] as string[],
  loadingsIncludedServices: false,
  loadingsOptionalServices: false,
})

const emits = defineEmits(["saved"])

const hotelService = new HotelService()
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
  if (hotelData.value.id) {
    return hotelService.edit(hotelData.value.id, hotelData.value)
  }

  return hotelService.create(hotelData.value)
}

async function handleCreateItem(name: any) {
  hotelData.value.loadingsIncludedServices = true
  const response = await amenityService.create(name)
  hotelData.value.loadingsIncludedServices = false
  if (response.error) return

  amenityList.value.push({ value: response.id, label: name })
}

watch(
  () => modelValue.value,
  async () => {
    if (!modelValue.value) return
    await getAmenityList()
    await getAmenityList()

    hotelData.value = { ...props.data }
    if (!props.data.amenities?.length) return

    hotelData.value.includedAmenities = props.data.amenities
      .filter((item: any) => !item.optional)
      .map((item: any) => item.amenityId)
    hotelData.value.optionalAmenities = props.data.amenities
      .filter((item: any) => item.optional)
      .map((item: any) => item.amenityId)
  }
)

async function getAmenityList() {
  try {
    const response = await amenityService.getList()
    const list = response.map((item: any) => ({
      value: item.id,
      label: item.name,
    }))
    amenityList.value = list
  } catch (error) {
    console.error("Error getting amenity list:", error)
    amenityList.value = []
  }
}
</script>
