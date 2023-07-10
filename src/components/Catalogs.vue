<template>
  <div>
    <div @mouseenter="showSpoiler = true" class="spoiler-trigger">
      <div>
        <!-- <button>Show Spoiler</button> -->
      </div>
      <div v-if="showSpoiler" class="CatalogBig" @mouseleave="showSpoiler = false">
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
      </div>
    </div>
    <a class="CatalogAll" @mouseenter="showSpoiler = true" @mouseleave="showSpoiler = false">
      Каталог
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSpoiler: false
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
 background-color: rgb(188, 187, 187, 0.3);
  gap: 8px;
  list-style: none;
  text-align: center;
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
        <li>Запчастини для гідротрансформаторів</li> -->
