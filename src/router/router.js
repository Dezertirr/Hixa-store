import HomeView from '@/pages/HomeView.vue'
import Basket from '@/pages/Basket.vue'
import Catalog from '@/pages/Catalog.vue'
import NotFound from '@/pages/NotFound.vue'
import Product from '@/pages/Product.vue';
import RegistrationForm from '@/components/RegistrationForm.vue'
import LoginForm from '@/components/LoginForm.vue'

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
    component: Catalog
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
    path: '/register',
    name: 'Register',
    component: RegistrationForm
  },
  {
    path: '/Login',
    name: 'Login',
    component: LoginForm
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
