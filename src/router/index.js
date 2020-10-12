import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/HomePage.vue'
// import NetworkError from '@/components/NetworkError.vue';

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
    component: () => import('@/views/Editor.vue')
  },
  {
    path: '/subscribtion',
    name: 'subscribtion',
    component: () => import('@/views/Subscribtion.vue')
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
