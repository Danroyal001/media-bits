import { createRouter,  createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue';
import Home from '@/views/HomePage.vue'
import NetworkError from '@/components/NetworkError.vue';
import PreLoader from '@/components/PreLoader.vue';

const onError = (error, retry, fail, attempts) => {
  if (error.message.match(/fetch/) && attempts <= 5) {
    retry()
  } else {
    fail()
  }
}
const timeout = 120000;
const delay = 1;
const suspensible = false;

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
    component: defineAsyncComponent({
      loader: () => import('@/views/Editor.vue'),
      loadingComponent: PreLoader,
      errorComponent: NetworkError,
      delay,
      timeout,
      suspensible,
      onError,
    })
  },
  {
    path: '/contact',
    name: 'contact',
    component: defineAsyncComponent({
      loader: () => import('@/views/ContactPage.vue'),
      loadingComponent: PreLoader,
      errorComponent: NetworkError,
      delay,
      timeout,
      suspensible,
      onError,
    })
  },
  {
    path: '/download',
    name: 'download',
    component: defineAsyncComponent({
      loader: () => import('@/views/DownloadPage.vue'),
      loadingComponent: PreLoader,
      errorComponent: NetworkError,
      delay,
      timeout,
      suspensible,
      onError,
    })
  },
  {
    path: '/documentation',
    name: 'documentation',
    component: defineAsyncComponent({
      loader: () => import('@/views/Documentation.vue'),
      loadingComponent: PreLoader,
      errorComponent: NetworkError,
      delay,
      timeout,
      suspensible,
      onError,
    })
  },
  {
    path: '/subscribtion',
    name: 'subscribtion',
    component: defineAsyncComponent({
      loader: () => import('@/views/Subscribtion.vue'),
      loadingComponent: PreLoader,
      errorComponent: NetworkError,
      delay,
      timeout,
      suspensible,
      onError,
    })
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  afterEach(){
    window.M.AutoInit();
  }
})

window.$router = router;

export default router
