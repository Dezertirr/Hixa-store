<template>
  <header class="header">
    <div class="sideBar">
      <ul class="headerMainNav">
        <li class="headerNavItem">
          <button type="button" @click="testClick" class="headerNatItemBtn">Наша адреса</button>
        </li>
        <li class="headerNavItem">
          <button type="button" @click="testClick" class="headerNatItemBtn">Час роботи</button>
        </li>
        <li class="headerNavItem">
          <button type="button" @click="testClick" class="headerNatItemBtn">Доставка</button>
        </li>
        <li class="headerNavItem">
          <button type="button" @click="testClick" class="headerNatItemBtn">Оплата</button>
        </li>
        <li class="headerNavItem">
          <button type="button" @click="testClick" class="headerNatItemBtn">Відгуки</button>
        </li>
      </ul>
      <ul class="headerNavSec">
        <li class="headerNavSecItem"><a class="langSelect">Мова</a></li>
        <li class="headerNavSecItem"><a>Тема</a></li>
        <li class="headerNavSecItem">
          <a v-if="isLoggedIn" class="personalArea" @click="goToPersonalArea">Особистий кабінет</a>
          <button v-if="isLoggedIn" class="personalArea" @click="logout">Logout</button>

          <div v-else>
            <button @click="goToLogin">Логін</button>
            <button @click="goToRegistration">Реєстрація</button>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <div class="SearchLine">
        <a @click="backMainPage"><img src="@/images/logo.svg" /></a>
        <form @submit.prevent="searchStart">
          <input v-model="searchValue" placeholder="Search" class="searchInput" />
          <button type="submit" class="searchBtn">Search</button>
        </form>
        <div><img src="@/images/shopping-basket.svg" /></div>
      </div>
      <Catalogs></Catalogs>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, computed, watch, provide } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import Catalogs from './Catalogs.vue'
import jsonArray from '../services/Catalog.json'
import { useSearchStore } from '../stores/counter'
import { useRouter } from 'vue-router'

const search = ref('')
const jsonData = jsonArray
const searchStore = useSearchStore()
const router = useRouter()
const searchValue = ref('')
const isLoggedIn = ref(false)
const isLogined = ref(false)

const filteredData = computed(() => {
  const searchText = searchStore.getSearch().toLowerCase()
  return jsonData.filter((item) => item.name.toLowerCase().includes(searchText))
})
const goToLogin = () => {
  router.push('/login')
}

const goToRegistration = () => {
  router.push('/register')
}
onMounted(() => {
  search.value = searchStore.getSearch()
})
const logout = async () => {
  try {
    // Выполните разлогин пользователя
    await signOut(auth) // auth - ваш объект аутентификации

    // Установите значение isLoggedIn в false
    isLoggedIn.value = false

    // Опционально: перенаправьте пользователя на страницу логина или на главную страницу
    router.push('/login') // Измените '/login' на путь к вашей странице логина
  } catch (error) {
    console.log('Ошибка при разлогине пользователя', error)
  }
}
watch(search, (newValue) => {
  searchStore.setSearch(newValue)
})

const searchStart = () => {
  search.value = searchValue.value
  searchStore.setSearch(searchValue.value)
  router.push('/Catalog')
}

const backMainPage = () => {
  router.push('/')
}

const testClick = () => {
  console.log('hi')
}

provide('filteredData', filteredData)
provide('isLoggedIn', isLoggedIn)
provide('isLogined', isLogined)

const auth = getAuth()
onAuthStateChanged(auth, (user) => {
  isLoggedIn.value = user !== null
  isLogined.value = isLoggedIn.value ? false : true // Исправленная логика
})

const showLogin = () => {
  isLogined.value = true // Показываем страницу логина
}

const loginSuccess = () => {
  isLogined.value = false // При успешной авторизации скрываем страницу логина
}
</script>

<style scoped>
.header {
}
.sideBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, #222222, #555555);
  color: #b0b0b0;
  height: 50px;
}
.headerMainNav {
  display: flex;
  height: 50px;
}

.headerNavItem {
  list-style: none;
  display: flex;
  align-items: center;
  border-left: 1px solid;
}

.headerNatItemBtn {
  padding: 10px;
}

.headerNavSec {
  display: flex;
}

.headerNavSecItem {
  list-style: none;
  margin: 15px;
  color: #bdb9b9;
}

.langSelect {
}

.personalArea {
}

.SearchLine {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 15px;
}

.searchInput {
  width: 400px;
  height: 35px;
  border: 0;
  border-radius: 5px;
}
.searchBtn {
  height: 35px;
  background-color: var(--main-bg-color);
  border: 2px solid #b0b0b0;
  margin-left: -57px;
  border-radius: 5px;
}
</style>
