<script setup>
import { ref, onMounted,watch } from 'vue';
import exchangeCourse from '../services/exchangeCourse'

const search = ref('');
const course = ref(0);

onMounted(async () => {
  try {
    const data = await exchangeCourse(); // Выполняем запрос и получаем данные
    course.value = data; // Присваиваем значение курса переменной course
  } catch (error) {
    console.error(error);
  }
});



const searchStart = async (event) => {
  event.preventDefault();
  console.log('Hi');
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
        <div><form>
            <input :value="search" @input="event => search = event.target.value">
          <button v-on:click="searchStart($event)">Search</button>

    </form>
  </div>
        
        <div>basket logo</div>
    </div>
    <ul>
    <select name='Каталог'>
        <option>Audi</option>
        <option>BMW</option>
        <option>Ser</option>
    </select>
    <select name='Каталог'>
        <option>Audi</option>
        <option>BMW</option>
        <option>Ser</option>
    </select>
    <select name='Каталог'>
        <option>Audi</option>
        <option>BMW</option>
        <option>Ser</option>
    </select>
    <select name='Каталог'>
        <option>Audi</option>
        <option>BMW</option>
        <option>Ser</option>
    </select>
    <select name='Каталог'>
        <option>Audi</option>
        <option>BMW</option>
        <option>Ser</option>
    </select>
    <select name='Каталог'>
        <option>Audi</option>
        <option>BMW</option>
        <option>Ser</option>
    </select>
    </ul>
</header>
</template>
<style scoped>
</style>