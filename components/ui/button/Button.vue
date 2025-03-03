<script setup lang="ts">
import type { PrimitiveProps } from "radix-vue"
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "."
import { cn } from "@/lib/utils"
import { Primitive } from "radix-vue"
import { buttonVariants } from "."

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  class?: HTMLAttributes["class"]
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  loading: false,
})

const sizeIcon = computed(() => {
  const config: { [key: string]: string } = {
    sm: "8px",
    lg: "16px",
    icon: "16px",
    default: "12px",
  }
  if (!props.size) return config.default

  return config[props.size] || config.default
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    :disabled="loading"
  >
    <slot v-if="!(size === 'icon' && loading)" />
    <template v-if="loading">
      <span :style="{ '--sizeIcon': sizeIcon }" class="loader" />
    </template>
  </Primitive>
</template>

<style lang="scss" scoped>
.loader {
  border: 1px solid gray;
  border-top: 1px solid black;
  border-radius: 50%;
  width: var(--sizeIcon);
  height: var(--sizeIcon);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
