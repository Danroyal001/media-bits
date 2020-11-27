// ~/plugins/vuex-persist.js
import VuexPersistence from 'vuex-persist';
import * as localForage from "localforage";

localForage.config({
  name: 'mb',
  driver: localForage.INDEXEDDB
});

localForage.setDriver(localForage.INDEXEDDB);

(window as any).localForage = localForage;
 
export default new VuexPersistence({
    storage: (window as any).localForage,
    key: 'mb',
    asyncStorage: true
  })