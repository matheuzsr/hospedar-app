<template>
  <div class="w-full">
    <Progress v-show="loading" infinite class="h-2" />
    <div class="rounded-md border">
      <div
        class="table__content relative w-full overflow-auto"
        :style="maxHeight ? { maxHeight } : {}"
      >
        <table class="w-full caption-bottom text-sm">
          <thead
            class="top-0 [&_tr]:border-b"
            style="position: sticky; background-color: #f5f6fc"
          >
            <tr
              class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
            >
              <th
                v-for="header in headers"
                :key="header.value"
                :style="{ width: header.width }"
                class="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
              >
                {{ header.text }}
              </th>
            </tr>
          </thead>
          <tbody class="[&_tr:last-child]:border-0">
            <tr
              v-for="(item, index) in items"
              :key="index"
              class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
            >
              <td
                v-for="header in headers"
                :key="header.value"
                class="p-4 align-middle"
              >
                <slot :name="`item.${header.value}`" :item="item">
                  <span> {{ item?.[header?.value] }} </span>
                </slot>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Progress from "~/components/ui/progress/Progress.vue"

interface Header {
  text: string
  value: string
  width?: string
}

interface Item {
  [key: string]: string
}

defineProps<{
  headers: Header[]
  items: Item[]
  maxHeight?: string
  loading?: boolean
}>()
</script>

<style lang="scss" scoped>
.table__content {
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: #e0e1eb;
    padding: 0 10px;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #bfc0cc;
    border-radius: 8px;
  }
}
</style>
