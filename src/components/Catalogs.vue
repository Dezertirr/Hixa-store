<template>
    <div>
      <div @mouseover="showSpoiler = true" @mouseout="showSpoiler = false">
        <div>
          <button>Show Spoiler</button>
        </div>
        <div v-if="showSpoiler" class="CatalogBig">
          <div @mouseover="showSpoiler = true" @mouseout="showSpoiler = false">
            <li>AISIN WARNER</li>
        <li>ALLISON</li>
        <li>AUDI, VOLKSWAGEN, SKODA</li>
        <li>BMW</li>
        <li>CHINESE CARS</li>
        <li>CHRYSLER, DODGE</li>
        <li>CITROEN, PEUGEOT, RENAULT</li>
        <li>FORD</li>
        <li>GENERAL MOTORS</li>
        <li>HALDEX</li>
        <li>HONDA, ACURA</li>
        <li>HYUNDAI, KIA</li>
        <li>JAGUAR</li>
        <li>LAND ROVER</li>
        <li>MAZDA</li>
        <li>MERCEDES-BENZ</li>
        <li>MITSUBISHI</li>
        <li>NISSAN, INFINITI, JATCO</li>
        <li>OPEL</li>
        <li>PORSCHE</li>
        <li>SSANGYONG</li>
        <li>SUBARU</li>
        <li>SUZUKI</li>
        <li>TOYOTA, LEXUS</li>
        <li>VOLVO</li>
        <li>ZF</li>
        <li>Гідроблоки</li>
        <li>Мастила для АКПП</li>
        <li>Фільтра діференціалів</li>
        <li>Запчастини для гідротрансформаторів</li>

            <!-- Остальной код списка здесь -->
          </div>
        </div>
      </div>
      <a class="CatalogAll" @focus="showSpoiler = true" @blur="showSpoiler = false">Каталог</a>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const showSpoiler = ref(false);
      const searchCatalog = ref('');
      const selecteda1 = ref('');
      const selecteda2 = ref('');
      const selecteda3 = ref('');
      const selecteda4 = ref('');
      const selecteda5 = ref('');
  
      return {
        showSpoiler,
        searchCatalog,
        selecteda1,
        selecteda2,
        selecteda3,
        selecteda4,
        selecteda5
      };
    }
  }
  </script>
  
  <style>
  *{
    margin: -1px
  }
  .CatalogBig {
    width: 300px;
    height: auto;
    background-color: aqua;
    margin: 0;
  }
  </style>
  