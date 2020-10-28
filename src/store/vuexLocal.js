// ~/plugins/vuex-persist.js
import VuexPersistence from 'vuex-persist'
 
export default new VuexPersistence({
    storage: window.localStorage,
    key: 'mb'
  })