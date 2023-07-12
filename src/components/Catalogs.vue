<template>
  <div class="catalogs">
    <div @mouseenter="showSpoiler = true" class="spoiler-trigger">
      <div v-if="showSpoiler" class="CatalogBig" @mouseleave="showSpoiler = false">
        <button v-for="(catalog, index) in catalogs" :key="index" @click="catalogSelect(catalog)">{{ catalog }}</button>
      </div>
    </div>
    <a class="CatalogAll" @mouseenter="showSpoiler = true" @mouseleave="showSpoiler = false">
      Каталог
    </a>
    <div @mouseenter="showSpoiler = true" class="spoiler-trigger">
      <div v-if="showSpoiler" class="CatalogBig" @mouseleave="showSpoiler = false">
        <button v-for="(catalog, index) in catalogs" :key="index" @click="catalogSelect(catalog)">{{ catalog }}</button>
      </div>
    </div>
    <a class="CatalogAll" @mouseenter="showSpoiler = true" @mouseleave="showSpoiler = false">
      Каталог
    </a>
    <div @mouseenter="showSpoiler = true" class="spoiler-trigger">
      <div v-if="showSpoiler" class="CatalogBig" @mouseleave="showSpoiler = false">
        <button v-for="(catalog, index) in catalogs" :key="index" @click="catalogSelect(catalog)">{{ catalog }}</button>
      </div>
    </div>
    <a class="CatalogAll" @mouseenter="showSpoiler = true" @mouseleave="showSpoiler = false">
      Каталог
    </a>
    <div @mouseenter="showSpoiler = true" class="spoiler-trigger">
      <div v-if="showSpoiler" class="CatalogBig" @mouseleave="showSpoiler = false">
        <button v-for="(catalog, index) in catalogs" :key="index" @click="catalogSelect(catalog)">{{ catalog }}</button>
      </div>
    </div>
    <a class="CatalogAll" @mouseenter="showSpoiler = true" @mouseleave="showSpoiler = false">
      Каталог
    </a>
    <div @mouseenter="showSpoiler = true" class="spoiler-trigger">
      <div v-if="showSpoiler" class="CatalogBig" @mouseleave="showSpoiler = false">
        <button v-for="(catalog, index) in catalogs" :key="index" @click="catalogSelect(catalog)">{{ catalog }}</button>
      </div>
    </div>
    <a class="CatalogAll" @mouseenter="showSpoiler = true" @mouseleave="showSpoiler = false">
      Каталог
    </a>
  </div>
  
  <p class="headerNavSecItem">Курс $: {{ course }} UAH</p>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useSearchStore } from '../stores/counter';
import { useRouter } from 'vue-router';
import exchangeCourse from '../services/exchangeCourse';

export default {
  setup() {
    const showSpoiler = ref(false);
    const catalogs = [
      'AISIN WARNER',
      'ALASON',
      'AUDI, VOLKSWAGEN, SKODA',
      'BMW',
      'CHINESE CARS',
      'CHRYSLER, DODGE',
      'CITROEN, PEUGEOT, RENAULT',
      'FORD',
      'GENERAL MOTORS',
      'HALDEX',
      'HONDA, ACURA',
      'HYUNDAI, KIA',
      'JAGUAR',
      'LAND ROVER',
      'MAZDA',
      'MERCEDES-BENZ',
      'MITSUBISHI',
      'NISSAN, INFINITI, JATCO',
      'OPEL',
      'PORSCHE',
      'SSANGYONG',
      'SUBARU',
      'SUZUKI',
      'TOYOTA, LEXUS',
      'VOLVO',
      'ZF',
      'Гідроблоки',
      'Мастила для АКПП',
      'Фільтра діференціалів',
      'Запчастини для гідротрансформаторів'
    ];
    const searchStore = useSearchStore();
    const router = useRouter();
    const course = ref(0);

    const catalogSelect = (catalog) => {
      searchStore.setSearch(catalog);
      showSpoiler.value = false;
      router.push('/Catalog');
    };

    onMounted(async () => {
  try {
    const data = await exchangeCourse();
    course.value = data;
  } catch (error) {
    console.error(error);
  }
});

    return {
      showSpoiler,
      catalogs,
      catalogSelect,
      course
    };
  }
};
</script>

  
  <style>

  .catalogs{
    display: flex;
    height: 35px;
    background: linear-gradient(to right, #222222, #555555);
    color: #b0b0b0;
    align-items: center;
    justify-content: flex-start;
  }
  .spoiler-trigger {
    position: relative;
  }
  
  .CatalogBig {
    display: flex;
    flex-direction: column;
    background-color: rgba(188, 187, 187, 0.3);
    gap: 8px;
    font-size: 14px;
    column-gap: 80px;
    width: 150px;
    height: auto;
    margin: 0;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 999;
  }
  
  .CatalogBig > * {
    box-shadow: 0px 4px 6px rgba(1, 35, 228, 0.1);
    width: 150px;
    border: 1px solid black;
    padding: 4px;
    background-color: rgb(178, 209, 238);
    border-radius: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .CatalogAll {
    display: inline-block;
    width: 80px;
    margin: 15px;
  }
  </style>
  