<template>
  <div class="auth-wrapper">
    <form class="auth-form" @submit.prevent="submitForm">
      <p class="auth-form__title">Приветствую!</p>
      <div class="auth-form__subtitle">
        <p>{{ subtitleText }}</p>
        <button type="button" class="toggle-auth-btn" @click="toggleAuth">
          {{ linkAccauntText }}
        </button>
      </div>
      <div class="auth-form__body">
        <input
          v-model="email"
          type="text"
          placeholder="Введите адрес электронной почты"
        />
        <input v-model="password" type="text" placeholder="Введите пароль" />
        <button type="submit">
          <div v-if="isLoading">
            <el-icon><Loading /></el-icon>
            <p>Загрузка...</p>
          </div>
          <div v-else>
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
        await this.authStore.register(this.email, this.password)
        this.isLoading = false
      }
    },
  },
})
</script>

<style scoped lang="scss">
.auth-wrapper {
  height: calc(100vh - 40px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-auth-btn {
  color: blue;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
}

.auth-form {
  width: 480px;
  height: 300px;
  border: 2px solid rgb(167, 167, 167);
  border-radius: 10px;
  padding: 20px;

  &__title {
    font-size: 22px;
    font-weight: 500;
    text-align: center;
  }

  &__subtitle {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 15px;
  }

  &__body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-top: 30px;

    input {
      width: 100%;
      padding: 7px 15px;
      font-size: 16px;
      border: 1px solid black;
      border-radius: 30px;
    }

    button {
      width: 100%;
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        background-color: rgb(86, 33, 118);
        color: white;
        border: none;
        border-radius: 30px;
        cursor: pointer;
        padding: 8px;
      }
    }
  }
}
</style>
