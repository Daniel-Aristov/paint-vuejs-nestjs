import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('@/views/HomePage.vue'),
		},
		{
			path: '/paint',
			name: 'paint',
			component: () => import('@/views/PaintPage.vue'),
		},
		{
			path: '/about',
			name: 'about',
			component: () => import('@/views/AboutPage.vue'),
		}
	]
})

export default router
