import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/authStore'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: () => import('@/views/HomePage.vue'),
		},
		{
			path: '/paint',
			name: 'Paint',
			component: () => import('@/views/PaintPage.vue'),
			meta: { requiresAuth: true },
		},
		{
			path: '/about',
			name: 'About',
			component: () => import('@/views/AboutPage.vue'),
		},
		{
			path: '/auth',
			name: 'Auth',
			component: () => import('@/views/AuthPage.vue'),
		},
		{
			path: '/account',
			name: 'Account',
			component: () => import('@/views/AccountPage.vue'),
			meta: { requiresAuth: true },
		}
	]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.isAuth) {
      next({ name: 'Auth' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
