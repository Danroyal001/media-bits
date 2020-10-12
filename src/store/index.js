import { createStore } from 'vuex'

const $store = createStore({
  state: {
    appName: 'Media-Bits',
    primaryHyperlinks: [
      {
        name: 'HOME',
        href: '/home'
      },
      {
        name: 'EDITOR',
        href: '/editor'
      },
      {
        name: 'SUBSRIBTION',
        href: '/subscribtion'
      }
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
});

window.$store = $store;

export default $store;
