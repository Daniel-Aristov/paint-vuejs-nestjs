import router from '@/router/route'
import axios from '@/ts/utils/axios.config'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuth: false,
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await axios.post('/auth/login', {
          email: email,
          password: password,
        })
        this.isAuth = true
        console.log('Logged in successfully:', response.data)
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
        console.log('Registered successfully:', response.data)
        this.isAuth = true
        router.push('/paint')
      } catch (error) {
        console.error('Registration failed:', error)
      }
    },
    logout() {
      this.isAuth = false
    },
  },
})
