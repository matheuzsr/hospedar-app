<script setup>
import { ref, onMounted } from 'vue'

const hotels = ref([])

onMounted(async () => {
  try {
    // Chama o endpoint criado no backend
    hotels.value = await $fetch('/api/hotels/list')
  } catch (error) {
    console.error('Erro ao buscar hotéis:', error)
  }
})
</script>

<template>
  <div>
    <h1>Lista de Hotéis</h1>
    <ul>
      <li v-for="hotel in hotels" :key="hotel.name">
        <strong>{{ hotel.name }}</strong>: {{ hotel.description }}
      </li>
    </ul>
  </div>
  <NuxtPage />
</template>
