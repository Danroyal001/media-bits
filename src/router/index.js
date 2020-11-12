import { createRouter,  createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue';
import Home from '@/views/HomePage.vue'
import NetworkError from '@/components/NetworkError.vue';
import PreLoader from '@/components/PreLoader.vue';

const onError = (error, retry, fail, attempts) => {
  if (error.message.match(/fetch/) && attempts <= 3) {
    // retry on fetch errors, 3 max attempts
    retry()
  } else {
    // Note that retry/fail are like resolve/reject of a promise:
    // one of them must be called for the error handling to continue.
    fail()
  }
}
const timeout = 120000;
const delay = 1;
const suspensible = false;

const getComponent = componentURL => defineAsyncComponent({
  // The factory function
  loader: () => import(`${componentURL}`),
  // A component to use while the async component is loading
  loadingComponent: PreLoader,
  // A component to use if the load fails
  errorComponent: NetworkError,
  // Delay before showing the loading component. Default: 200ms.
  delay,
  // The error component will be displayed if a timeout is
  // provided and exceeded. Default: 120000.
  timeout,
  // Defining if component is suspensible. Default: true.
  suspensible,
  /**
   *
   * @param {*} error Error message object
   * @param {*} retry A function that indicating whether the async component should retry when the loader promise rejects
   * @param {*} fail  End of failure
   * @param {*} attempts Maximum allowed retries number
   */
  onError,
});

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
    component: getComponent('@/views/Editor.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: getComponent('@/views/ContactPage.vue')
  },
  {
    path: '/download',
    name: 'download',
    component: getComponent('@/views/DownloadPage.vue')
  },
  {
    path: '/docummentation',
    name: 'documentation',
    component: getComponent('@/views/Documentation.vue')
  },
  {
    path: '/subscribtion',
    name: 'subscribtion',
    component: getComponent('@/views/Subscribtion.vue')
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
