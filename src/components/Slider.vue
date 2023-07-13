<template>
    <div class="Slider">
    
    <div class="slidesItem" :style="{ backgroundImage: 'url(' + sliderPhoto[currentIndex] + ')' }">

        <button type="button" @click="previosSlide" class="SliderBtnPrev"><img src='../images/arrow-left.png'></button>
        <p class="sliderText">{{ slidersValue[currentIndex] }}</p>
        <button type="button" class="SliderCatBtn" @click="goToCatalog">До каталогу</button>
            <button type="button" @click="nextSlide" class="SliderBtnNext"><img src='../images/arrow-right.png'></button>
    </div>

    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useSearchStore } from '../stores/counter';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const slidersValue = ['Це каталог з клапанами Ауді', 'Це каталог з патруками для Renault', 'Цей каталог з манжетами'];
      const sliderPhoto = ['https://gd2.alicdn.com/imgextra/i2/71058703/O1CN01lwV2ct2EA1XvDXmaf_!!71058703.jpg', 'https://www.topgear.com/sites/default/files/2022/03/1-Renault-Clio.jpg', 'https://i.infocar.ua/i/12/5878/1200x800.jpg'];
      const sliderCatalog = ['ALASON', 'FORD', 'Запчастини для гідротрансформаторів']
      const currentIndex = ref(0);
      const searchStore = useSearchStore();
      const router = useRouter()
  
      const previosSlide = () => {
        currentIndex.value = (currentIndex.value - 1 + slidersValue.length) % slidersValue.length;
      };
  
      const nextSlide = () => {
        currentIndex.value = (currentIndex.value + 1) % slidersValue.length;
      };

      const goToCatalog = () => {
  const catalog = sliderCatalog[currentIndex];
  searchStore.setSearch(catalog);
  router.push({ name: 'Catalog' }); // Make sure 'Catalog' matches the name used in your router configuration
};
  
      return {
        slidersValue,
        currentIndex,
        sliderPhoto,
        sliderCatalog,
        previosSlide,
        nextSlide,
        goToCatalog,
      };
    },
  };
  </script>
  
  <style>
  .Slider {
    display: flex;
    align-items: center;
    padding: 15px;
  }
  .slidesItem {
    width: 85%;
    height: 250px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    margin: 0 auto;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  .sliderText {
    font-size: larger;
    color:#3b3b3b;
    font-weight: 800;
    margin: 15px;
    padding-right: 1015px;
  }

  .SliderCatBtn {
  height: 35px;
  width: 150px;
  background-color:#555555 ;
  opacity: 0.75;
  border: 1px solid ;
  margin: 15px;
  }

  .SliderBtnPrev {
    height: 35px;
    width: 25px;
    background-color: inherit;
    border: 0;
    margin-right:100px;
    margin-bottom: 125px;
    transform: translateY(50%);

  }

  .SliderBtnNext {
    height: 35px;
    width: 25px;
    background-color: inherit;
    border: 0;
    margin-bottom: 125px;
    transform: translateY(50%);
    margin-right: 18px;
  }


  </style>
  