import { createRouter, createWebHistory } from 'vue-router'

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
		}
	]
})

export default router
