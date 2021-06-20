import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/Index.vue'
import Help from '@/views/Help.vue'
import Sponsor from '@/views/Sponsor.vue'
import Disclaimer from '@/views/Disclaimer.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Index },
    { path: '/help', component: Help },
    { path: '/sponsor', component: Sponsor },
    { path: '/disclaimer', component: Disclaimer }
  ]
})

export default router
