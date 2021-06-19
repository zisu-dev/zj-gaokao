import 'virtual:windi.css'
import 'virtual:windi-devtools'
import '@/styles/main.css'
import { createApp } from 'vue'
import router from '@/router'
import App from '@/App.vue'

const app = createApp(App)
app.use(router)
app.mount('#app')
