<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full">
      <div class="bg-white rounded-2xl shadow-2xl p-8">
        <div class="text-center mb-8">
          <div
            class="bg-slate-700 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
          >
          <KeyIcon class="w-10 h-10 text-white" />
          </div>
          <h2 class="text-3xl font-bold text-slate-800">
            Login Administrativo
          </h2>
          <p class="mt-2 text-slate-600">Acesse o painel de gerenciamento</p>
        </div>

        <form class="space-y-6" @submit.prevent="handleLogin">
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-slate-700 mb-1"
              >Email</label
            >
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="appearance-none block w-full px-4 py-3 rounded-lg border border-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
              placeholder="seu@email.com"
            >
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-slate-700 mb-1"
              >Senha</label
            >
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="appearance-none block w-full px-4 py-3 rounded-lg border border-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
              placeholder="••••••••"
            >
          </div>

          <Button
            type="submit"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
            :loading="loading"
          >
            Entrar
        </Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { SignInService } from "~/infra/service/signin/SignInService"
import {KeyIcon } from '@heroicons/vue/24/outline'
import Button from "~/components/ui/button/Button.vue"

const email = ref("pedrao@gmail.com")
const password = ref("deborinha123")
const loading = ref(false)

const handleLogin = async () => {
  const service = new SignInService()
  loading.value = true
  const response = await service.login({ username: email.value, password: password.value })
  loading.value = false
  if(response.error) return
  useRouter().push("/admin/hotels")
}
</script>
