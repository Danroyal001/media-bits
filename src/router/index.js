import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/HomePage.vue'

const routes = [
  {
    path: '/',
    alias: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => ({
      component: import('@/views/Editor.vue'),
      delay: 1
    })
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  afterEach(){
    window.M.AutoInit();
  }
})

export default router
