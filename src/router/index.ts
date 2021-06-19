import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '@/views/Index.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [{ path: '/', component: Index }]
})

export default router
