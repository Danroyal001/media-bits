import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/HomePage.vue'

const routes = [
  {
    path: '/',
    alias: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => ({
      component: import('@/views/About.vue'),
      delay: 1
    })
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
