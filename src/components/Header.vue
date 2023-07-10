<script setup>
import {ref, onMounted  } from "vue";
import exchangeCourse from '../services/exchangeCourse'
import Catalogs from './Catalogs.vue'



const search = ref('');
const course = ref(0);

onMounted(async () => {
  try {
    const data = await exchangeCourse(); 
    course.value = data; 
  } catch (error) {
    console.error(error);
  }
});

const searchStart = async () => {
  console.log('hi');
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
        <div>logo</div>
        <div>
          <form @submit.prevent="searchStart">
          <input v-model="search">
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