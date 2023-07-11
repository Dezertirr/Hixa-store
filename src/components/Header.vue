<script setup>
import { ref, onMounted, computed, watch, provide, pushScopeId } from "vue";
import exchangeCourse from '../services/exchangeCourse';
import Catalogs from './Catalogs.vue';
import jsonArray from '../services/Catalog.json';
import { useSearchStore } from '../stores/counter';
import { useRouter } from "vue-router";

const search = ref('');
const course = ref(0);
const jsonData = jsonArray;

const searchStore = useSearchStore();
const router = useRouter()
const searchValue = ref('');

onMounted(async () => {
  try {
    const data = await exchangeCourse();
    course.value = data;
  } catch (error) {
    console.error(error);
  }
});

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

provide('filteredData', filteredData);

const setup = () => {
  return {
    search,
    course,
    searchValue,
    searchStart
  };
};
</script>

<template>
  <header>
    <ul>
      <li>Наша адреса</li>
      <li>Час роботи</li>
      <li>Доставка</li>
      <li>Оплата</li>
      <li>Відгуки</li>
    </ul>
    <ul>
      <li>Мова</li>
      <li>Курс $: {{ course }} UAH</li>
      <li>Особистий кабінет</li>
    </ul>
    <div>
      <a @click="backMainPage"><div>logo</div></a>
      <div>
        <form @submit.prevent="searchStart">
      <input v-model="searchValue" placeholder="Search">
      <button type="submit">Search</button>
    </form>
      </div>
      <Catalogs></Catalogs>
      <div>basket logo</div>
    </div>
  </header>
</template>

<style scoped>
</style>
