import router from '@/router/route'
import axios from '@/ts/utils/axios.config'
import { defineStore } from 'pinia'
import { useUserStore } from './userStore'
import User from '@/types/user'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuth: false,
  }),
  actions: {
    clearAllStores() {
      const userStore = useUserStore()
      userStore.$reset()
    },
    loadUserFromStorage() {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser) as User
        const userStore = useUserStore()
        userStore.setUser(parsedUser)
        this.isAuth = true
      }
    },
    async login(email: string, password: string) {
      try {
        const response = await axios.post('/auth/login', {
          email: email,
          password: password,
        })

        const userData = response.data
        const userStore = useUserStore()
        userStore.setUser(userData)

        this.isAuth = true
        localStorage.setItem('user', JSON.stringify(userStore.user))

        router.push('/paint')
      } catch (error) {
        console.error('Login failed:', error)
      }
    },
    async register(name: string, surname: string, email: string, password: string) {
      try {
        const response = await axios.post('/auth/register', {
          name: name,
          surname: surname,
          email: email,
          password: password,
        })

        const userData = response.data
        const userStore = useUserStore()
        userStore.setUser(userData)

        this.isAuth = true
        localStorage.setItem('user', JSON.stringify(userStore.user))

        router.push('/paint')
      } catch (error) {
        console.error('Registration failed:', error)
      }
    },
    logout() {
      this.isAuth = false
      localStorage.removeItem('user')
      this.clearAllStores()
    },
  },
})
