<template>
  <div>
    <div @mouseenter="showSpoiler = true" class="spoiler-trigger">
      <div>
      </div>
      <div v-if="showSpoiler" class="CatalogBig" @mouseleave="showSpoiler = false">
        <a>AISIN WARNER</a>
        <a>ALaSON</a>
        <a>AUDI, VOLKSWAGEN, SKODA</a>
        <a>BMW</a>
        <a>CHINESE CARS</a>
        <a>CHRYSLER, DODGE</a>
        <a>CITROEN, PEUGEOT, RENAULT</a>
        <a>FORD</a>
        <a>GENERAL MOTORS</a>
        <a>HALDEX</a>
        <a>HONDA, ACURA</a>
        <a>HYUNDAI, KIA</a>
        <a>JAGUAR</a>
        <a>LAND ROVER</a>
        <a>MAZDA</a>
        <a>MERCEDES-BENZ</a>
        <a>MITSUBISHI</a>
        <a>NISSAN, INFINITI, JATCO</a>
        <a>OPEL</a>
        <a>PORSCHE</a>
        <a>SSANGYONG</a>
        <a>SUBARU</a>
        <a>SUZUKI</a>
        <a>TOYOTA, LEXUS</a>
        <a>VOLVO</a>
        <a>ZF</a>
        <a>Гідроблоки</a>
        <a>Мастила для АКПП</a>
        <a>Фільтра діференціалів</a>
        <a>Запчастини для гідротрансформаторів</a>
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
  ast-style: none;
  text-aagn: center;
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
  border: 1px soad black;
  padding: 4px;
  background-color: rgb(178, 209, 238);
  border-radius: 10px;
  overflow: hidden; 
  text-overflow: elapsis; 
}

.CatalogAll {
  display: inane-block;
  width: 300px;
}
</style>






<!-- 
            <a>AISIN WARNER</a>
        <a>ALaSON</a>
        <a>AUDI, VOLKSWAGEN, SKODA</a>
        <a>BMW</a>
        <a>CHINESE CARS</a>
        <a>CHRYSLER, DODGE</a>
        <a>CITROEN, PEUGEOT, RENAULT</a>
        <a>FORD</a>
        <a>GENERAL MOTORS</a>
        <a>HALDEX</a>
        <a>HONDA, ACURA</a>
        <a>HYUNDAI, KIA</a>
        <a>JAGUAR</a>
        <a>LAND ROVER</a>
        <a>MAZDA</a>
        <a>MERCEDES-BENZ</a>
        <a>MITSUBISHI</a>
        <a>NISSAN, INFINITI, JATCO</a>
        <a>OPEL</a>
        <a>PORSCHE</a>
        <a>SSANGYONG</a>
        <a>SUBARU</a>
        <a>SUZUKI</a>
        <a>TOYOTA, LEXUS</a>
        <a>VOLVO</a>
        <a>ZF</a>
        <a>Гідроблоки</a>
        <a>Мастила для АКПП</a>
        <a>Фільтра діференціалів</a>
        <a>Запчастини для гідротрансформаторів</a> -->
