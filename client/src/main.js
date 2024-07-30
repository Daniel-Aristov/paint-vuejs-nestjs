import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from '@/router/route'
import { useAuthStore } from '@/store/authStore'
import './styles/index.css'
import './styles/main.scss'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

const authStore = useAuthStore()
authStore.loadUserFromStorage()

app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
