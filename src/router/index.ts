import { createRouter,  createWebHistory, RouteRecordRaw } from 'vue-router'
import { defineAsyncComponent } from 'vue';
import Home from '@/views/HomePage.vue'
import NetworkError from '@/components/NetworkError.vue';
import PreLoader from '@/components/PreLoader.vue';

const onError = (error: { message: string; }, retry: () => void, fail: () => void, attempts: number) => {
  if (error.message.match(/fetch/) && attempts <= 5) {
    retry()
  } else {
    fail()
  }
}
const timeout = 60000*5;//5 mins
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
      loader: () => import(/* webpackChunkName: 'editor', webpackPrefetch: true */'@/views/Editor.vue'),
      loadingComponent: PreLoader as any,
      errorComponent: NetworkError as any,
      delay,
      timeout,
      suspensible,
      onError,
    }) as any
  },
  {
    path: '/contact',
    name: 'contact',
    component: defineAsyncComponent({
      loader: () => import(/* webpackChunkName: 'contact' */'@/views/ContactPage.vue'),
      loadingComponent: PreLoader as any,
      errorComponent: NetworkError as any,
      delay,
      timeout,
      suspensible,
      onError,
    }) as any
  },
  {
    path: '/download',
    name: 'download',
    component: defineAsyncComponent({
      loader: () => import(/* webpackPrefetch: true, webpackChunkName: 'download' */'@/views/DownloadPage.vue'),
      loadingComponent: PreLoader as any,
      errorComponent: NetworkError as any,
      delay,
      timeout,
      suspensible,
      onError,
    }) as any
  },
  {
    path: '/documentation',
    name: 'documentation',
    component: defineAsyncComponent({
      loader: () => import(/* webpackChunkName: 'documentation-and-videos' */'@/views/Documentation.vue'),
      loadingComponent: PreLoader as any,
      errorComponent: NetworkError as any,
      delay,
      timeout,
      suspensible,
      onError,
    }) as any
  },
  {
    path: '/blog',
    name: 'blog',
    component: defineAsyncComponent({
      loader: () => import(/* webpackChunkName: 'blog' */'@/views/Blog.vue'),
      loadingComponent: PreLoader as any,
      errorComponent: NetworkError as any,
      delay,
      timeout,
      suspensible,
      onError,
    }) as any
  },
  {
    path: '/forum',
    name: 'forum',
    component: defineAsyncComponent({
      loader: () => import(/* webpackChunkName: 'forum' */'@/views/Forum.vue'),
      loadingComponent: PreLoader as any,
      errorComponent: NetworkError as any,
      delay,
      timeout,
      suspensible,
      onError,
    }) as any
  },
  {
    path: '/premium-support',
    name: 'premium-support',
    component: defineAsyncComponent({
      loader: () => import(/* webpackChunkName: 'premium-support' */'@/views/PremiumSupport.vue'),
      loadingComponent: PreLoader as any,
      errorComponent: NetworkError as any,
      delay,
      timeout,
      suspensible,
      onError,
    }) as any
  },
  {
    path: '/email-support',
    name: 'email-support',
    component: defineAsyncComponent({
      loader: () => import(/* webpackChunkName: 'email-support' */'@/views/EmailSupport.vue'),
      loadingComponent: PreLoader as any,
      errorComponent: NetworkError as any,
      delay,
      timeout,
      suspensible,
      onError,
    }) as any
  },
  {
    path: '/terms-and-conditions',
    name: 'terms-and-conditions',
    component: defineAsyncComponent({
      loader: () => import(/* webpackChunkName: 'terms-and-conditions' */'@/views/TermsAndConditions.vue'),
      loadingComponent: PreLoader as any,
      errorComponent: NetworkError as any,
      delay,
      timeout,
      suspensible,
      onError,
    }) as any
  },
  {
    path: '/email-action-handler',
    name: 'email-action-handler',
    component: defineAsyncComponent({
      loader: () => import(/* webpackChunkName: 'email-action-handler' */'@/views/EmailActionHandler.vue'),
      loadingComponent: PreLoader as any,
      errorComponent: NetworkError as any,
      delay,
      timeout,
      suspensible,
      onError,
    }) as any
  },
  {
    path: '/privacy-policy',
    name: 'privacy-policy',
    component: defineAsyncComponent({
      loader: () => import(/* webpackChunkName: 'privacy-policy' */'@/views/PrivacyPolicy.vue'),
      loadingComponent: PreLoader as any,
      errorComponent: NetworkError as any,
      delay,
      timeout,
      suspensible,
      onError,
    }) as any
  },
  {
    path: '/subscribtion',
    name: 'subscribtion',
    component: defineAsyncComponent({
      loader: () => import(/* webpackChunkName: 'subscribtion' */'@/views/Subscribtion.vue'),
      loadingComponent: PreLoader as any,
      errorComponent: NetworkError as any,
      delay,
      timeout,
      suspensible,
      onError,
    }) as any
  },
  {
    path: '/tutorial-videos',
    name: 'tutorial-videos',
    component: defineAsyncComponent({
      loader: () => import(/* webpackPrefetch: true, webpackChunkName: 'documentation-and-videos' */'@/views/TutorialVideos.vue'),
      loadingComponent: PreLoader as any,
      errorComponent: NetworkError as any,
      delay,
      timeout,
      suspensible,
      onError,
    }) as any
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes as unknown as RouteRecordRaw[]
});

router.beforeEach((_to, from, next) => {
  if(from.name === 'editor'){
    if((window as any).$store.state.currentProjectIsSaved === true){
      return next();
    } else {
      (window as any).alert("If you leave without saving your work, all changes might be lost\nMedia-Bits willl try to recover your project, but may not always succeed")
      return next(false);
    }
  } else return next();
});

(window as any).$router = router as typeof router;

export default router
