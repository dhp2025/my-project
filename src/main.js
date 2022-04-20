import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { initializeApp } from 'firebase/app'; 

const firebaseConfig = {
    apiKey: "AIzaSyBYLztdUsKeqW06pvn8V2ggtgfJr_vPBT4",
    authDomain: "first-project-d3032.firebaseapp.com",
    projectId: "first-project-d3032",
    storageBucket: "first-project-d3032.appspot.com",
    messagingSenderId: "713691990656",
    appId: "1:713691990656:web:6d037bc203aebd25a47465"
  };
  initializeApp(firebaseConfig);
createApp(App).use(store).use(router).mount("#app");
