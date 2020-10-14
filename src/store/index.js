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
    ],
    editorBtns: [
      {
          title: "OPEN FILE"
      },
      {
          title: "SAVE"
      }
    ],
    inputSources: [
      {
        name: 'Aud 1100',
        type: 'audio',
        position: 1
      },
      {
        name: 'Vid 1100',
        type: 'video',
        position: 2
      },
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
