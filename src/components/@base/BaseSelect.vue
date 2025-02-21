<template>
  <div class="grid grid-cols-4 items-center gap-4">
    <Label v-if="label" class="text-right">{{ label }}</Label>
    <Select v-model="modelValue" multiple class="col-span-3">
      <option v-for="item in items" :key="item.value" :value="item.value">
        {{ item.text }}
      </option>
    </Select>
  </div>
</template>

<script setup lang="ts">
import Label from "~/components/ui/label/Label.vue"
import { Select } from "~/components/ui/select"

const modelValue = defineModel<string>()

interface ItemsOptions {
  text: string
  value: string
}

defineProps<{
  label?: string
  items: ItemsOptions[]
}>()
</script>
