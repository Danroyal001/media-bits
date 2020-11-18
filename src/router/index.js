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
    path: '/blog',
    name: 'blog',
    component: defineAsyncComponent({
      loader: () => import('@/views/Blog.vue'),
      loadingComponent: PreLoader,
      errorComponent: NetworkError,
      delay,
      timeout,
      suspensible,
      onError,
    })
  },
  {
    path: '/forum',
    name: 'forum',
    component: defineAsyncComponent({
      loader: () => import('@/views/Forum.vue'),
      loadingComponent: PreLoader,
      errorComponent: NetworkError,
      delay,
      timeout,
      suspensible,
      onError,
    })
  },
  {
    path: '/premium-support',
    name: 'premium-support',
    component: defineAsyncComponent({
      loader: () => import('@/views/PremiumSupport.vue'),
      loadingComponent: PreLoader,
      errorComponent: NetworkError,
      delay,
      timeout,
      suspensible,
      onError,
    })
  },
  {
    path: '/email-support',
    name: 'email-support',
    component: defineAsyncComponent({
      loader: () => import('@/views/EmailSupport.vue'),
      loadingComponent: PreLoader,
      errorComponent: NetworkError,
      delay,
      timeout,
      suspensible,
      onError,
    })
  },
  {
    path: '/terms-and-conditions',
    name: 'terms-and-conditions',
    component: defineAsyncComponent({
      loader: () => import('@/views/TermsAndConditions.vue'),
      loadingComponent: PreLoader,
      errorComponent: NetworkError,
      delay,
      timeout,
      suspensible,
      onError,
    })
  },
  {
    path: '/email-action-handler',
    name: 'email-action-handler',
    component: defineAsyncComponent({
      loader: () => import('@/views/EmailActionHandler.vue'),
      loadingComponent: PreLoader,
      errorComponent: NetworkError,
      delay,
      timeout,
      suspensible,
      onError,
    })
  },
  {
    path: '/privacy-policy',
    name: 'privacy-policy',
    component: defineAsyncComponent({
      loader: () => import('@/views/PrivacyPolicy.vue'),
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
  },
  {
    path: '/tutorial-videos',
    name: 'tutorial-videos',
    component: defineAsyncComponent({
      loader: () => import('@/views/TutorialVideos.vue'),
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
  routes
});

router.beforeEach((_to, from, next) => {
  if(from.name === 'editor'){
    if(window.$store.state.currentProjectIsSaved === true){
      return next();
    } else {
      window.alert("If you leave without saving your work, all changes will be lost")
      return next(false);
    }
  } else return next();
});

window.$router = router;

export default router
