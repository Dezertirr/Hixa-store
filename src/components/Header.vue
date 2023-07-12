<script setup>
import { ref, onMounted, computed, watch, provide, pushScopeId } from "vue";

import Catalogs from './Catalogs.vue';
import jsonArray from '../services/Catalog.json';
import { useSearchStore } from '../stores/counter';
import { useRouter } from "vue-router";

const search = ref('');

const jsonData = jsonArray;

const searchStore = useSearchStore();
const router = useRouter()
const searchValue = ref('');



const filteredData = computed(() => {
  const searchText = searchStore.getSearch().toLowerCase();
  return jsonData.filter(item => item.name.toLowerCase().includes(searchText));
});

onMounted(() => {
  search.value = searchStore.getSearch();
});

watch(search, (newValue) => {
  searchStore.setSearch(newValue);
});

const searchStart = () => {
  search.value = searchValue.value;
  searchStore.setSearch(searchValue.value);
  router.push('/Catalog')
};

const components = {
  Catalogs
};
const backMainPage = () => {
  router.push('/')
}
const testClick = () => {
  console.log('hi');
}

provide('filteredData', filteredData);

const setup = () => {
  return {
    search,
    searchValue,
    searchStart
  };
};
</script>

<template>
  <header class="header">
    <div class="sideBar">
    <ul class="headerMainNav">
      <li class="headerNavItem"><buttun type="button" @click="testClick" class="headerNatItemBtn">Наша адреса</buttun></li>
      <li class="headerNavItem"><buttun type="button" @click="testClick" class="headerNatItemBtn">Час роботи</buttun></li>
      <li class="headerNavItem"><buttun type="button" @click="testClick" class="headerNatItemBtn">Доставка</buttun></li>
      <li class="headerNavItem"><buttun type="button" @click="testClick" class="headerNatItemBtn">Оплата</buttun></li>
      <li class="headerNavItem"><buttun type="button" @click="testClick" class="headerNatItemBtn">Відгуки</buttun></li>
    </ul>
    <ul class="headerNavSec">
      <li class="headerNavSecItem"><a class="langSelect">Мова</a></li>
      <li class="headerNavSecItem"><a>Тема</a></li>
      <li class="headerNavSecItem"><a class="personalArea">Особистий кабінет</a></li>
    </ul>
  </div>
    <div>
      <div class="SearchLine">
        <a @click="backMainPage"><img src="@/images/logo.svg"></a>
        <form @submit.prevent="searchStart">
      <input v-model="searchValue" placeholder="Search" class="searchInput">
      <button type="submit" class="searchBtn">Search</button>
    </form>
    <div><img src="@/images/shopping-basket.svg"></div>
      </div>
      <Catalogs></Catalogs>
      
    </div>
  </header>
</template>

<style scoped>
.header {
  
}
.sideBar{
  display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(to right, #222222, #555555);
    color:#b0b0b0;
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
border-left: 1px solid ;
}

.headerNatItemBtn{
  padding: 10px;
}

.headerNavSec{
display: flex;

}

.headerNavSecItem{
list-style: none;
margin:15px;
color:#bdb9b9;
}

.langSelect{

}

.personalArea{

}

.SearchLine{
  display: flex;
  align-items: center;
    justify-content: space-evenly;
    padding: 15px;
}

.searchInput{
  width: 400px;
    height: 35px;
    border: 0;
    border-radius: 5px;
}
.searchBtn{
  height: 35px;
    background-color: var(--main-bg-color);
    border: 2px solid #b0b0b0;
    margin-left: -57px;
    border-radius: 5px;
}
</style>
