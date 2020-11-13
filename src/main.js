import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/messaging";
import "firebase/functions";

window.__firebase = firebase;

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyABk77tsR2CoJeAlD8Almd2wz0_w4tbeEA",
    authDomain: "media-bits.firebaseapp.com",
    databaseURL: "https://media-bits.firebaseio.com",
    projectId: "media-bits",
    storageBucket: "media-bits.appspot.com",
    messagingSenderId: "667867459654",
    appId: "1:667867459654:web:37ff58088a9ae18edb9a47",
    measurementId: "G-PH3HPLNQSQ"
  };
  
// Initialize Firebase
window.__firebase.initializeApp(firebaseConfig);

window.vm = createApp(App).use(store).use(router).mount('#app')
