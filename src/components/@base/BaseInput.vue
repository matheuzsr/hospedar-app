<template>
  <div class="flex items-center gap-4">
    <Label v-if="label">{{ label }}</Label>
    <Input :id="label" v-model="modelValue" :type />
  </div>
</template>

<script setup lang="ts">
import Input from "~/components/ui/input/Input.vue"
import Label from "~/components/ui/label/Label.vue"

const modelValue = defineModel<string | number>()

defineProps<{
  label?: string
  type?: HTMLInputElement["type"]
}>()
</script>
