import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router/router'
import { languages, defaultLocale } from './locales/index'
import Notifications from '@kyvg/vue3-notification'

const firebaseConfig = {
  apiKey: 'AIzaSyDBup_VXH-6gJf0qhuibWs1JRSomtBR6Ak',
  authDomain: 'hix-store.firebaseapp.com',
  projectId: 'hix-store',
  storageBucket: 'hix-store.appspot.com',
  messagingSenderId: '736688927113',
  appId: 'hix-store'
}

const messages = Object.assign(languages)
const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: 'en',
  legacy: false,
  messages
})

const savedLanguage = localStorage.getItem('lang')
if (savedLanguage) {
  i18n.global.locale.value = savedLanguage
}

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(Notifications)
app.mount('#app')
