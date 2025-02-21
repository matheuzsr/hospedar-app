<template>
  <BaseModal
    v-model="modelValue"
    title="Edição do Hotel"
    description="Edite as informações do Hotel Fazenda Império do Vale"
    width="600px"
    :save-button="{ text: 'Salvar', action: handleSave }"
  >
    <div class="grid gap-4 py-4">
      <div class="grid grid-cols-1 gap-4">
        <div>
          <Label>Nome</Label>
          <BaseInput v-model="hotelData.name" />
        </div>
        <div>
          <Label>Local</Label>
          <BaseInput v-model="hotelData.location" />
        </div>

        <div>
          <Label>Serviços Inclusos</Label>
          <BaseMultiSelect
            v-model="hotelData.includedServices"
            :options="hotelData.optionsIncludedServices"
            :loading-creating="hotelData.loadingsIncludedServices"
            @create="handleCreateItem"
          />
        </div>

        <div>
          <Label>Serviços Opcionais</Label>
          <BaseMultiSelect
            v-model="hotelData.includedServices"
            :options="hotelData.optionsIncludedServices"
            :loading-creating="hotelData.loadingsIncludedServices"
            @create="handleCreateItem"
          />
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

const modelValue = defineModel<boolean>()
const hotelData = ref({
  name: "Hotel Fazenda Império do Vale",
  location: "",
  includedServices: [],
  optionsIncludedServices: [
    { value: "wifi", label: "Wi-Fi" },
    { value: "parking", label: "Estacionamento" },
  ],
  loadingsIncludedServices: false,
  optionalServices: "",
})

const handleSave = () => {
  // Implement save logic here
  console.log("Saving changes:", hotelData.value)
}

function handleCreateItem(newItem: any) {
  hotelData.value.loadingsIncludedServices = true
  hotelData.value.optionsIncludedServices.push({
    value: newItem,
    label: newItem,
  })
  hotelData.value.loadingsIncludedServices = false
}
</script>
