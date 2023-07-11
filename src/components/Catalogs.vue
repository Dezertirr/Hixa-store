<template>
  <div>
    <div @mouseenter="showSpoiler = true" class="spoiler-trigger">
      <div></div>
      <div v-if="showSpoiler" class="CatalogBig" @mouseleave="showSpoiler = false">
        <button v-for="(catalog, index) in catalogs" :key="index" @click="catalogSelect(catalog)">{{ catalog }}</button>
      </div>
    </div>
    <a class="CatalogAll" @mouseenter="showSpoiler = true" @mouseleave="showSpoiler = false">
      Каталог
    </a>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useSearchStore } from '../stores/counter';

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

    const catalogSelect = (catalog) => {
      searchStore.setSearch(catalog);
      console.log('Выбранный каталог:', catalog);
      showSpoiler.value = false;
    };

    return {
      showSpoiler,
      catalogs,
      catalogSelect
    };
  }
};
</script>

  
  <style>
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
    width: 300px;
  }
  </style>
  

<!--
 <button v-on:click="CatalogSelect">CHINESE CARS</button>
        <button v-on:click="CatalogSelect">CHRYSLER, DODGE</button>
        <button v-on:click="CatalogSelect">CITROEN, PEUGEOT, RENAULT</button>
        <button v-on:click="CatalogSelect">FORD</button>
        <button v-on:click="CatalogSelect">GENERAL MOTORS</button>
        <button v-on:click="CatalogSelect">HALDEX</button>
        <button v-on:click="CatalogSelect">HONDA, ACURA</button>
        <button v-on:click="CatalogSelect">HYUNDAI, KIA</button>
        <button v-on:click="CatalogSelect">JAGUAR</button>
        <button v-on:click="CatalogSelect">LAND ROVER</button>
        <button v-on:click="CatalogSelect">MAZDA</button>
        <button v-on:click="CatalogSelect">MERCEDES-BENZ</button>
        <button v-on:click="CatalogSelect">MITSUBISHI</button>
        <button v-on:click="CatalogSelect">NISSAN, INFINITI, JATCO</button>
        <button v-on:click="CatalogSelect">OPEL</button>
        <button v-on:click="CatalogSelect">PORSCHE</button>
        <button v-on:click="CatalogSelect">SSANGYONG</button>
        <button v-on:click="CatalogSelect">SUBARU</button>
        <button v-on:click="CatalogSelect">SUZUKI</button>
        <button v-on:click="CatalogSelect">TOYOTA, LEXUS</button>
        <button v-on:click="CatalogSelect">VOLVO</button>
        <button v-on:click="CatalogSelect">ZF</button>
        <button v-on:click="CatalogSelect">Гідроблоки</button>
        <button v-on:click="CatalogSelect">Мастила для АКПП</button>
        <button v-on:click="CatalogSelect">Фільтра діференціалів</button>
        <button v-on:click="CatalogSelect">Запчастини для гідротрансформаторів</button> -->