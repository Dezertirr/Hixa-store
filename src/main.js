
import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { createI18n } from 'vue-i18n'; // Импортируйте createI18n
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

const i18n = createI18n({ // Создайте экземпляр i18n перед использованием
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: () => import('./locales/en.json'),
    pl: () => import('./locales/pl.json'),
    de: () => import('./locales/de.json'),
    hu: () => import('./locales/hu.json'),
    uk: () => import('./locales/uk.json'),
  },
});

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const app = createApp(App);
app.use(createPinia());
app.use(i18n); // Используйте i18n
app.use(router);

app.mount('#app');