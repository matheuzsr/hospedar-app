<template>
  <RadioGroup
    v-model="modelValue"
    :default-value="defaultValue"
    :orientation="orientation || 'vertical'"
  >
    <div v-for="item in items" :key="item.id" class="flex items-center gap-1">
      <RadioGroupItem :id="item.id" :value="item.value" />
      <Label :for="item.id">{{ item.label }}</Label>
    </div>
  </RadioGroup>
</template>

<script lang="ts" setup>
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { RadioGroupRootProps } from "radix-vue"

const modelValue = defineModel<boolean>()
defineProps<{ orientation: RadioGroupRootProps["orientation"] }>()

const defaultValue = modelValue.value

const randomId = () => Math.random().toString(36).substring(2, 9)
const items = ref([
  { id: `radio-yes${randomId()}`, value: true, label: "Sim" },
  { id: `radio-no${randomId()}`, value: false, label: "Não" },
])
</script>
