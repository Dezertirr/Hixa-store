<template>
    <div class="Slider">
    
    <div class="slidesItem" :style="{ backgroundImage: 'url(' + sliderPhoto[currentIndex] + ')' }">

        <button type="button" @click="previosSlide" class="SliderBtnPrev">Previos</button>
        <p class="sliderText">{{ slidersValue[currentIndex] }}</p>
        <button type="submit" class="SliderCatBtn">До каталогу</button>
            <button type="button" @click="nextSlide" class="SliderBtnNext">Next</button>
    </div>

    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const slidersValue = ['Це каталог з клапанами Ауді', 'Це каталог з патруками для Renault', 'Цей каталог з манжетами'];
      const sliderPhoto = ['https://gd2.alicdn.com/imgextra/i2/71058703/O1CN01lwV2ct2EA1XvDXmaf_!!71058703.jpg', 'https://www.topgear.com/sites/default/files/2022/03/1-Renault-Clio.jpg', 'https://i.infocar.ua/i/12/5878/1200x800.jpg'];
      const currentIndex = ref(0);
  
      const previosSlide = () => {
        currentIndex.value = (currentIndex.value - 1 + slidersValue.length) % slidersValue.length;
      };
  
      const nextSlide = () => {
        currentIndex.value = (currentIndex.value + 1) % slidersValue.length;
      };
  
      return {
        slidersValue,
        currentIndex,
        sliderPhoto,
        previosSlide,
        nextSlide,
      };
    },
  };
  </script>
  
  <style>
  .Slider {
    display: flex;
    align-items: center;
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
    border: 1px solid;
    margin-right:100px;
    margin-bottom: 125px;
    transform: translateY(50%);
  }

  .SliderBtnNext {
    height: 35px;
    width: 25px;
    background-color: inherit;
    border: 1px solid;
    margin-bottom: 125px;
    transform: translateY(50%);
  }


  </style>
  