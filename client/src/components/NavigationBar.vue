<template>
  <div
    class="w-100 bg-purple-950 sticky top-0 left-0 flex justify-between items-center py-[10px] px-[20px] z-40 border-b-2 border-slate-100"
  >
    <router-link class="flex justify-start items-center gap-[10px]" to="/">
      <img
        class="w-[50px] h-[50px]"
        src="../assets/images/icon.png"
        alt="logo"
      />
      <p class="text-slate-100 text-xl font-medium">Sketch & Chat</p>
    </router-link>
    <nav class="flex justify-center items-center gap-[15px]">
      <router-link
        class="block bg-slate-100 text-purple-950 py-[5px] px-[18px] border-2 rounded-lg border-purple-950 hover:bg-purple-950 hover:text-slate-100 hover:border-slate-100"
        to="/"
        >Главная</router-link
      >
      <router-link
        v-if="authStore.isAuth"
        class="block bg-slate-100 text-purple-950 py-[5px] px-[18px] border-2 rounded-lg border-purple-950 hover:bg-purple-950 hover:text-slate-100 hover:border-slate-100"
        to="/paint"
        >Рисование</router-link
      >
      <router-link
        class="block bg-slate-100 text-purple-950 py-[5px] px-[18px] border-2 rounded-lg border-purple-950 hover:bg-purple-950 hover:text-slate-100 hover:border-slate-100"
        to="/about"
        >О нас</router-link
      >
    </nav>
    <div class="flex justify-end items-center gap-[15px]">
        <router-link
          to="/account"
          v-if="authStore.isAuth"
          class="flex justify-center items-center gap-[5px] text-slate-100 font-medium hover:text-slate-300 "
          >
          <el-icon><User/></el-icon>Аккаунт</router-link
        >
      <router-link v-if="!authStore.isAuth" to="/auth" class="flex justify-center items-center py-[5px] px-[30px] border-2 rounded-lg bg-slate-100 text-purple-950 border-purple-950 hover:bg-purple-950 hover:text-slate-100 hover:border-slate-100 transition-all"
        >Войти</router-link
      >
      <router-link
        v-else
        to="/"
        class="flex justify-center items-center py-[5px] px-[30px] border-2 rounded-lg bg-slate-100 text-purple-950 border-purple-950 hover:bg-purple-950 hover:text-slate-100 hover:border-slate-100 transition-all"
        @click="authStore.logout"
        >Выйти</router-link
      >
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
  },
})
</script>
