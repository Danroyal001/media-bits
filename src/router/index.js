import { createRouter, createWebHashHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue';
import Home from '@/views/HomePage.vue'
import NetworkError from '@/components/NetworkError.vue';
import PreLoader from '@/components/PreLoader.vue';

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
      // The factory function
      loader: () => import('@/views/Editor.vue'),
      // A component to use while the async component is loading
      loadingComponent: PreLoader,
      // A component to use if the load fails
      errorComponent: NetworkError,
      // Delay before showing the loading component. Default: 200ms.
      delay: 1,
      // The error component will be displayed if a timeout is
      // provided and exceeded. Default: 120000.
      timeout: 120000,
      // Defining if component is suspensible. Default: true.
      suspensible: false,
      /**
       *
       * @param {*} error Error message object
       * @param {*} retry A function that indicating whether the async component should retry when the loader promise rejects
       * @param {*} fail  End of failure
       * @param {*} attempts Maximum allowed retries number
       */
      onError(error, retry, fail, attempts) {
        if (error.message.match(/fetch/) && attempts <= 3) {
          // retry on fetch errors, 3 max attempts
          retry()
        } else {
          // Note that retry/fail are like resolve/reject of a promise:
          // one of them must be called for the error handling to continue.
          fail()
        }
      },
    })
  },
  {
    path: '/contact',
    name: 'contact',
    component: defineAsyncComponent({
      loader: () => import('@/views/ContactPage.vue'),
      loadingComponent: PreLoader,
      errorComponent: NetworkError,
      delay: 1,
      timeout: 120000,
      suspensible: false,
      onError(error, retry, fail, attempts) {
        if (error.message.match(/fetch/) && attempts <= 3) {
          retry()
        } else {
          fail()
        }
      },
    })
  },
  {
    path: '/download',
    name: 'download',
    component: defineAsyncComponent({
      loader: () => import('@/views/DownloadPage.vue'),
      loadingComponent: PreLoader,
      errorComponent: NetworkError,
      delay: 1,
      timeout: 120000,
      suspensible: false,
      onError(error, retry, fail, attempts) {
        if (error.message.match(/fetch/) && attempts <= 3) {
          retry()
        } else {
          fail()
        }
      },
    })
  },
  {
    path: '/subscribtion',
    name: 'subscribtion',
    component: defineAsyncComponent({
      loader: () => import('@/views/Subscribtion.vue'),
      loadingComponent: PreLoader,
      errorComponent: NetworkError,
      delay: 1,
      timeout: 120000,
      suspensible: false,
      onError(error, retry, fail, attempts) {
        if (error.message.match(/fetch/) && attempts <= 3) {
          retry()
        } else {
          fail()
        }
      },
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

window.$router = router;

export default router
