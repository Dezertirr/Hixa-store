<script setup>
import { ref, onMounted } from 'vue';
import exchangeCourse from '../services/exchangeCourse'

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
    <select class="Catalog-all" name='Каталог'>
        <option>Каталог</option>
        <option>AISIN WARNER</option>
        <option>ALLISON</option>
        <option>AUDI, VOLKSWAGEN, SKODA</option>
        <option>BMW</option>
        <option>CHINESE CARS</option>
        <option>CHRYSLER, DODGE</option>
        <option>CITROEN, PEUGEOT, RENAULT</option>
        <option>FORD</option>
        <option>GENERAL MOTORS</option>
        <option>HALDEX</option>
        <option>HONDA, ACURA</option>
        <option>HYUNDAI, KIA</option>
        <option>JAGUAR</option>
        <option>LAND ROVER</option>
        <option>MAZDA</option>
        <option>MERCEDES-BENZ</option>
        <option>MITSUBISHI</option>
        <option>NISSAN, INFINITI, JATCO</option>
        <option>OPEL</option>
        <option>PORSCHE</option>
        <option>SSANGYONG</option>
        <option>SUBARU</option>
        <option>SUZUKI</option>
        <option>TOYOTA, LEXUS</option>
        <option>VOLVO</option>
        <option>ZF</option>
        <option>Гідроблоки</option>
        <option>Мастила для АКПП</option>
        <option>Фільтра діференціалів</option>
        <option>Запчастини для гідротрансформаторів</option>


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
.Catalog-all {
    width: 80px;
    display: flex;
}
</style>