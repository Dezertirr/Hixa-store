<template>
    <div>
      <div @mouseenter="showSpoiler = true" class="spoiler-trigger">
        <div></div>
        <div v-if="showSpoiler" class="CatalogBig" @mouseleave="showSpoiler = false">
  <button v-on:click="CatalogSelect('AISIN WARNER')">AISIN WARNER</button>
  <button v-on:click="CatalogSelect('ALASON')">ALASON</button>
  <button v-on:click="CatalogSelect('AUDI, VOLKSWAGEN, SKODA')">AUDI, VOLKSWAGEN, SKODA</button>
  <button v-on:click="CatalogSelect('BMW')">BMW</button>
  <button v-on:click="CatalogSelect('CHINESE CARS')">CHINESE CARS</button>
  <button v-on:click="CatalogSelect('CHRYSLER, DODGE')">CHRYSLER, DODGE</button>
  <button v-on:click="CatalogSelect('CITROEN, PEUGEOT, RENAULT')">CITROEN, PEUGEOT, RENAULT</button>
  <button v-on:click="CatalogSelect('FORD')">FORD</button>
  <button v-on:click="CatalogSelect('GENERAL MOTORS')">GENERAL MOTORS</button>
  <button v-on:click="CatalogSelect('HALDEX')">HALDEX</button>
  <button v-on:click="CatalogSelect('HONDA, ACURA')">HONDA, ACURA</button>
  <button v-on:click="CatalogSelect('HYUNDAI, KIA')">HYUNDAI, KIA</button>
  <button v-on:click="CatalogSelect('JAGUAR')">JAGUAR</button>
  <button v-on:click="CatalogSelect('LAND ROVER')">LAND ROVER</button>
  <button v-on:click="CatalogSelect('MAZDA')">MAZDA</button>
  <button v-on:click="CatalogSelect('MERCEDES-BENZ')">MERCEDES-BENZ</button>
  <button v-on:click="CatalogSelect('MITSUBISHI')">MITSUBISHI</button>
  <button v-on:click="CatalogSelect('NISSAN, INFINITI, JATCO')">NISSAN, INFINITI, JATCO</button>
  <button v-on:click="CatalogSelect('OPEL')">OPEL</button>
  <button v-on:click="CatalogSelect('PORSCHE')">PORSCHE</button>
  <button v-on:click="CatalogSelect('SSANGYONG')">SSANGYONG</button>
  <button v-on:click="CatalogSelect('SUBARU')">SUBARU</button>
  <button v-on:click="CatalogSelect('SUZUKI')">SUZUKI</button>
  <button v-on:click="CatalogSelect('TOYOTA, LEXUS')">TOYOTA, LEXUS</button>
  <button v-on:click="CatalogSelect('VOLVO')">VOLVO</button>
  <button v-on:click="CatalogSelect('ZF')">ZF</button>
  <button v-on:click="CatalogSelect('Гідроблоки')">Гідроблоки</button>
  <button v-on:click="CatalogSelect('Мастила для АКПП')">Мастила для АКПП</button>
  <button v-on:click="CatalogSelect('Фільтра діференціалів')">Фільтра діференціалів</button>
  <button v-on:click="CatalogSelect('Запчастини для гідротрансформаторів')">Запчастини для гідротрансформаторів</button>
</div>

      </div>
      <a class="CatalogAll" @mouseenter="showSpoiler = true" @mouseleave="showSpoiler = false">
        Каталог
      </a>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';

  
  
  export default {
    data() {
      return {
        selectedCatalog: '',
        showSpoiler: false,
        
      };
    },
    methods: {
      CatalogSelect(catalog) {
        this.selectedCatalog = catalog;
        console.log('Выбранный каталог:', catalog);
        this.showSpoiler = false
      }
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