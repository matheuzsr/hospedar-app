<template>
  <Select v-model="modelValue">
    <SelectTrigger class="w-[180px]">
      <SelectValue :placeholder="placeholder" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>{{ placeholder }}</SelectLabel>
        <SelectItem v-for="item in items" :key="item.value" :value="item.value">
          {{ item.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const modelValue = ref<string>("")

interface ItemsOptions {
  label: string
  value: string
}

defineProps<{
  placeholder?: string
  items: ItemsOptions[]
}>()
</script>
