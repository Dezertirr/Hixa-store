<template>
  <div class="SliderSection">
  <div class="SliderMainCatalogSection">
    <div class="swiperContainer">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(value, index) in slidersValue" :key="index">
          <div
            class=" SliderTitle"
            :style="{ backgroundImage: 'url(' + sliderPhoto[index] + ')' }"
            @click="goToCatalog"
          >


          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { ref } from 'vue';
import { useSearchStore } from '../stores/counter';
import { useRouter } from 'vue-router';
import Swiper from 'swiper';

export default {
  setup() {
    const slidersValue = [
      'Це каталог з клапанами Ауді',
      'Це каталог з патруками для Renault',
      'Цей каталог з манжетами'
    ];
    const sliderPhoto = [
      'https://gd2.alicdn.com/imgextra/i2/71058703/O1CN01lwV2ct2EA1XvDXmaf_!!71058703.jpg',
      'https://www.topgear.com/sites/default/files/2022/03/1-Renault-Clio.jpg',
      'https://i.infocar.ua/i/12/5878/1200x800.jpg'
    ];
    const sliderCatalog = ['ALASON', 'FORD', 'Запчастини для гідротрансформаторів'];
    const currentIndex = ref(0);
    const searchStore = useSearchStore();
    const router = useRouter();

    // Swiper instance
    let mySwiper;

    const previosSlide = () => {
      currentIndex.value = (currentIndex.value - 1 + slidersValue.length) % slidersValue.length;
    };

    const nextSlide = () => {
      currentIndex.value = (currentIndex.value + 1) % slidersValue.length;
    };

    const goToCatalog = () => {
      const catalog = sliderCatalog[currentIndex.value];
      searchStore.setSearch(catalog);
      router.push({ name: 'Catalog', query: sliderCatalog }); // Make sure 'Catalog' matches the name used in your router configuration
    };

    const initSwiper = () => {
      mySwiper = new Swiper('.swiperContainer', {
        // Swiper options here
        loop: true,
        Autoplay: 1000,
        navigation: {
          nextEl: '.SliderBtnNext',
          prevEl: '.SliderBtnPrev'
        }
      });
    };

    return {
      slidersValue,
      currentIndex,
      sliderPhoto,
      sliderCatalog,
      previosSlide,
      nextSlide,
      goToCatalog,
      initSwiper
    };
  },
  mounted() {
    // Initialize Swiper when the component is mounted
    this.initSwiper();
  }
};
</script>
<style>

.SliderSection{
  padding: 15px 25px;
  background-color: #CCCCCC;
}

@media only screen and (min-width: 700px) {
  .SliderSection{
    padding: 22px 50px 32px 50px;
  }
}

@media only screen and (min-width: 1200x) {
  .SliderSection{
    padding: 40px 140px;
  }
}
.SliderMainCatalogSection {
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: 20px;
  
}

.swiperContainer {
  width: 100%; /* Ensure the container takes the full width */
  height: 450px;
}

.swiper-slide {
  position: relative; /* To position the buttons and text over the image */
  width: 100%;
  height: 100%;
  margin-right: -2px;
}

.SliderTitle {
  width: 100%;
  height: 450px;
  background-repeat: no-repeat;
  background-size: cover; /* Make the image cover the entire block */
  background-position: center;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  cursor: pointer;
}

.sliderText {
  font-size: larger;
  color: #3b3b3b;
  font-weight: 800;
  margin: 15px;
  max-width: 80%; /* Limit the text width */
  text-align: center; /* Center the text */
}

.SliderCatBtn {
  height: 35px;
  width: 150px;
  background-color: #555555;
  opacity: 0.75;
  border: 1px solid;
  margin: 15px;
  position: absolute; /* Position the button over the image */
  bottom: 0;
  left: 50%;
  transform: translateX(-50%); /* Center horizontally */
}

.SliderBtnPrev,
.SliderBtnNext {
  height: 35px;
  width: 25px;
  background-color: inherit;
  border: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1; /* Ensure the buttons are above the image */
}

.SliderBtnPrev {
  left: 15px;
}

.SliderBtnNext {
  right: 15px;
}
</style>
