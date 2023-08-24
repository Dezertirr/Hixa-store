import HomeView from '@/pages/HomeView.vue'
import Basket from '@/pages/Basket.vue'
import Catalog from '@/pages/Catalog.vue'
import NotFound from '@/pages/NotFound.vue'
import Product from '@/pages/Product.vue'
import RegistrationForm from '@/components/RegistrationForm.vue'
import LoginForm from '@/components/LoginForm.vue'

import Cart from '@/components/Cart.vue'
import Information from '@/pages/Information.vue'
import AdminPanel from '@/pages/AdminPanel.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import PersonalArea from '@/components/PersonalArea.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/Basket',
    component: Basket
  },
  {
    path: '/Catalog',
    name: 'Catalog',
    component: Catalog,
    props: (route) => ({ search: route.query.search || '' })
  },
  {
    path: '/404',
    component: NotFound
  },
  {
    path: '/Product',
    component: Product
  },

  {
    path: '/personal-area', 
    name: 'personal-area', 
    component: PersonalArea, 
    meta: { requiresAuth: true } 
  },
  {
    path: '/register',
    name: 'Register',
    component: RegistrationForm
  },
  {
    path: '/Login',
    name: 'Login',
    component: LoginForm
  },
  { path: '/Cart', component: Cart },
  {
    path: '/Info',
    name: 'Information',
    component: Information
  },
  {
    path: '/translate',
    name: 'Translator',
    component: LanguageSwitcher
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminPanel
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
