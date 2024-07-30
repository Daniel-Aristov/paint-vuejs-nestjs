<template>
  <div class="h-[85vh] flex justify-center items-center">
    <form
      class="w-[480px] min-h-[300px] border-2 border-purple-300 rounded-lg p-[20px]"
      @submit.prevent="submitForm"
    >
      <p class="text-center text-xl font-medium">Приветствую!</p>
      <div class="flex justify-center items-center gap-[15px] mt-[15px]">
        <p class="text-sm font-medium">{{ subtitleText }}</p>
        <button
          type="button"
          class="text-sm text-blue-700 font-medium"
          @click="toggleAuth"
        >
          {{ linkAccauntText }}
        </button>
      </div>
      <div
        class="flex flex-col justify-center items-center gap-[15px] mt-[30px]"
      >
        <input
          v-if="!isLogin"
          class="w-[100%] py-[7px] px-[18px] text-lg border-2 border-purple-300 rounded-3xl"
          v-model="name"
          type="text"
          placeholder="Введите имя"
        />
        <input
          v-if="!isLogin"
          class="w-[100%] py-[7px] px-[18px] text-lg border-2 border-purple-300 rounded-3xl"
          v-model="surname"
          type="text"
          placeholder="Введите фамилию"
        />
        <input
          class="w-[100%] py-[7px] px-[18px] text-lg border-2 border-purple-300 rounded-3xl"
          v-model="email"
          type="text"
          placeholder="Введите адрес электронной почты"
        />
        <input
          class="w-[100%] py-[7px] px-[18px] text-lg border-2 border-purple-300 rounded-3xl"
          v-model="password"
          type="text"
          placeholder="Введите пароль"
        />
        <button class="w-[100%]" type="submit">
          <div
            class="flex justify-center items-center gap-[5px] bg-purple-950 text-slate-100 border-none rounded-3xl cursor-pointer p-[8px]"
            v-if="isLoading"
          >
            <el-icon><Loading /></el-icon>
            <p>Загрузка...</p>
          </div>
          <div
            class="flex justify-center items-center gap-[5px] bg-purple-950 text-slate-100 border-none rounded-3xl cursor-pointer p-[8px]"
            v-else
          >
            <el-icon><UserFilled /></el-icon>
            <p>{{ submitButtonText }}</p>
          </div>
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAuthStore } from '@/store/authStore'

export default defineComponent({
  data() {
    return {
      name: '',
      surname: '',
      email: '',
      password: '',
      isLogin: true,
      isLoading: false,
    }
  },
  computed: {
    ...mapStores(useAuthStore),
    subtitleText() {
      return this.isLogin ? 'Аккаунта еще нет?' : 'Уже есть аккаунт?'
    },
    linkAccauntText() {
      return this.isLogin ? 'Создайте сейчас' : 'Войдите в него'
    },
    submitButtonText() {
      return this.isLogin ? 'Вход' : 'Регистрация'
    },
    async signUp() {
      this.isLoading = true
    },
  },
  methods: {
    toggleAuth() {
      this.isLogin = !this.isLogin
    },
    async submitForm() {
      console.log('Отправка формы произошла')
      if (this.isLogin) {
        this.isLoading = true
        await this.authStore.login(this.email, this.password)
        this.isLoading = false
      } else {
        this.isLoading = true
        await this.authStore.register(
          this.name,
          this.surname,
          this.email,
          this.password
        )
        this.isLoading = false
      }
    },
  },
})
</script>
