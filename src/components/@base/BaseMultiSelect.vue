<template>
  <div class="flex items-center">
    <Label v-if="label" class="text-right">{{ label }}</Label>
    <div class="relative w-full">
      <Button
        class="flex h-10 w-full items-center"
        variant="outline"
        @click="toggle"
      >
        <span class="flex-1 truncate">{{ displayValue }}</span>
        <ChevronDownIcon class="h-4 w-4 opacity-50" />
      </Button>

      <div
        v-if="isOpen"
        class="absolute z-50 w-full min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
      >
        <div class="flex items-center border-b px-3 py-2 gap-4">
          <Input
            ref="inputRef"
            v-model="newItemInput"
            placeholder="Add new item..."
            class="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
            @keydown="onKeyDown"
          />
          <Button
            size="icon"
            :disabled="!newItemInput.trim()"
            @click="handleCreateNew"
          >
            <PlusCircleIcon class="h-4 w-4" />
          </Button>
        </div>

        <div class="max-h-[200px] overflow-auto">
          <div
            v-for="option in options"
            :key="option.value"
            class="relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 outline-none hover:bg-accent hover:text-accent-foreground"
            @click="toggleOption(option)"
          >
            <div
              class="mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary"
            >
              <CheckIcon
                v-if="modelValue.includes(option.value)"
                class="h-3 w-3"
              />
            </div>
            {{ option.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import {
  CheckIcon,
  ChevronDownIcon,
  PlusCircleIcon,
} from "@heroicons/vue/24/outline"
import Input from "~/components/ui/input/Input.vue"
import Button from "~/components/ui/button/Button.vue"

interface Option {
  label: string
  value: string
}

const modelValue = defineModel<string[]>({ type: Array, default: () => [] })
const props = defineProps<{
  label?: string
  options: Option[]
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: "update:modelValue", value: string[]): void
  (e: "create", value: string): void
}>()

const isOpen = ref(false)
const newItemInput = ref("")
const inputRef = ref<HTMLInputElement>()

const selectedOptions = computed(() =>
  props.options.filter((option) => modelValue.value?.includes(option.value))
)

const displayValue = computed(
  () =>
    selectedOptions.value.map((option) => option.label).join(", ") ||
    props.placeholder
)

function toggle() {
  isOpen.value = !isOpen.value
}

function toggleOption(option: Option) {
  const newValue = [...modelValue.value]
  const index = newValue.indexOf(option.value)

  if (index === -1) {
    newValue.push(option.value)
  } else {
    newValue.splice(index, 1)
  }

  emit("update:modelValue", newValue)
}

function handleCreateNew() {
  if (newItemInput.value.trim()) {
    emit("create", newItemInput.value.trim())
    newItemInput.value = ""
  }
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === "Enter" && newItemInput.value) {
    e.preventDefault()
    handleCreateNew()
  }
}
</script>
