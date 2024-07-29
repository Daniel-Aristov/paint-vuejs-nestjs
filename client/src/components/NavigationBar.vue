<template>
  <div class="navigation">
    <router-link class="logo-wrapper" to="/">
      <img src="../assets/images/icon.png" alt="logo" />
      <p>AriPaint</p>
    </router-link>
    <nav class="nav">
      <router-link class="nav__item" to="/">Главная</router-link>
      <router-link v-if="authStore.isAuth" class="nav__item" to="/paint">Рисование</router-link>
      <router-link class="nav__item" to="/about">О нас</router-link>
    </nav>
    <div>
      <router-link to="/account" v-if="authStore.isAuth" class="signin-btn">Аккаунт</router-link>
      <router-link v-if="!authStore.isAuth" to="/auth" class="signin-btn">Войти</router-link>
      <router-link v-else to="/auth" class="signin-btn" @click="authStore.logout">Выйти</router-link>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '@/store/authStore'
import { mapStores } from 'pinia'

export default defineComponent({
  computed: {
    ...mapStores(useAuthStore),
  }
})
</script>

<style scoped lang="scss">
.navigation {
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(58, 24, 78);
  padding: 10px 20px;
  z-index: 100;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
	text-decoration: none;

  p {
    font-weight: bold;
    color: white;
    font-size: 23px;
  }

  img {
    width: 50px;
    height: 50px;
  }
}

.nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;

  &__item {
    display: block;
    background-color: rgb(131, 49, 183);
    color: white;
    text-decoration: none;
    padding: 5px 18px;
    border-radius: 8px;
  }
}

.signin-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $background-color;
  color: rgb(58, 24, 78);
  padding: 5px 30px;
  border-radius: 8px;
  border: 1px solid rgb(58, 24, 78);
  transition: all 0.2s linear;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: rgb(58, 24, 78);
    color: $background-color;
    transition: all 0.2s linear;
    border: 1px solid $background-color;
  }
}
</style>
