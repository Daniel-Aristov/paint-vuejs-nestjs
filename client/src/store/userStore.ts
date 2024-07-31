import { defineStore } from 'pinia'
import User from '@/types/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {} as User,
  }),
  actions: {
		setUser(user: User) {
			this.user = user
		}
  },
})
