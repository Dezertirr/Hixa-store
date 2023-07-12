import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import App from './App.vue';
import router from './router/router';

const firebaseConfig = {
  apiKey: "AIzaSyDBup_VXH-6gJf0qhuibWs1JRSomtBR6Ak",
  authDomain: "hix-store.firebaseapp.com",
  projectId: "hix-store",
  storageBucket: "hix-store.appspot.com",
  messagingSenderId: "736688927113",
  appId: "hix-store"
};


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
