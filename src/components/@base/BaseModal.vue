<template>
  <Dialog :open="modelValue">
    <DialogContent class="max-w-[80vw]" :width @outside-click="handleClose"  @close="handleClose ">
      <DialogHeader>
        <DialogTitle>{{ title }}</DialogTitle>
        <DialogDescription>{{ description }}</DialogDescription>
      </DialogHeader>
      <div class="">
        <slot />
      </div>
      <DialogFooter>
        <Button v-if="cancelButton" @click="cancelButton.action">
          {{ cancelButton.text }}
        </Button>
        <Button v-if="saveButton" type="submit" @click="saveButton.action">
          {{ saveButton.text }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const modelValue = defineModel<boolean>()

const props = defineProps<{
  title?: string
  description?: string
  permanent?: boolean
  width?: string
  saveButton?: {
    text: string
    action: () => void
  }
  cancelButton?: {
    text: string
    action: () => void
  }
}>()

function handleClose() {
  if (props.permanent) return
  modelValue.value = false
}
</script>
