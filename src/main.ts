import 'virtual:windi.css'
import 'virtual:windi-devtools'
import '@/styles/main.css'
import { createApp } from 'vue'
import router from '@/router'
import App from '@/App.vue'
import toast from '@/plugins/toast'

const app = createApp(App)
app.use(router)
app.mount('#app')

if (window.screen.width < 640) {
  toast.warning({ position: 'topCenter', message: '请使用桌面浏览器打开', title: '浏览器建议' })
}
