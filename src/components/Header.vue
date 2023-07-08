<script setup>
import { ref } from 'vue';

const search = ref('');

const searchStart = (event) => {
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
        <li>Валюта</li>
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
    <li>Курс $</li>
    </ul>
</header>
</template>
<style scoped>
</style>