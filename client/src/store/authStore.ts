import router from '@/router/route'
import axios from '@/ts/utils/axios.config'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuth: false,
    user: {
      id: null as number | null,
      name: '',
      email: '',
    },
  }),
  actions: {
    loadUserFromStorage() {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        this.user = JSON.parse(storedUser)
        this.isAuth = true
      }
    },
    async getUser(id: number) {
      try {
        const response = await axios.get(`/auth/user/${id}`)
        this.user = response.data
        console.log(response.data)
      } catch (error) {
        console.error('Failed to fetch user:', error)
      }
    },
    async login(email: string, password: string) {
      try {
        const response = await axios.post('/auth/login', {
          email: email,
          password: password,
        })

        const userData = response.data
        this.isAuth = true
        this.user.id = userData.id
        this.user.name = userData.name
        this.user.email = userData.email

        localStorage.setItem('user', JSON.stringify(this.user))

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

        this.isAuth = true
        this.user.id = userData.id
        this.user.name = userData.name
        this.user.email = userData.email

        localStorage.setItem('user', JSON.stringify(this.user))

        router.push('/paint')
      } catch (error) {
        console.error('Registration failed:', error)
      }
    },
    logout() {
      this.user.id = null
      this.user.name = ''
      this.user.email = ''
      this.isAuth = false
      localStorage.removeItem('user')
    },
  },
})
