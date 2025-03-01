<script setup lang="ts">
import type { ProgressRootProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import {
  ProgressIndicator,
  ProgressRoot,
} from 'radix-vue'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<ProgressRootProps & { class?: HTMLAttributes['class'], infinite?: boolean }>(),
  {
    modelValue: 0,
    infinite: false,
  },
)

const delegatedProps = computed(() => {
  const { class: _, infinite: __, ...delegated } = props

  return delegated
})
</script>

<template>
  <ProgressRoot
    v-bind="delegatedProps"
    :class="
      cn(
        'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
        props.class,
      )
    "
  >
    <ProgressIndicator
      :class="[
        'h-full w-full flex-1 bg-primary transition-all',
        { 'infinite-loading': props.infinite }
      ]"
      :style="!props.infinite ? `transform: translateX(-${100 - (props.modelValue ?? 0)}%);` : ''"
    />
  </ProgressRoot>
</template>

<style scoped>
@keyframes infiniteLoading {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}

.infinite-loading {
  animation: infiniteLoading 2s linear infinite;
}
</style>
