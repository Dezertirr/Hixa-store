<template>
  <div class="SliderSection">
  <div class="SliderMainCatalogSection">
    <div class="swiperContainer">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(value, index) in slidersValue" :key="index">
  <div
    class="SliderTitle"
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
import mainPhoto from '../images/main-page-photo.png'
import {SwiperSlide} from "swiper/vue";
import {Navigation, Pagination} from "swiper/modules";

export default {
  setup() {
    const slidersValue = [
      'Це каталог з клапанами Ауді',
      'Це каталог з патруками для Renault',
      'Цей каталог з манжетами'
    ];
    const sliderPhoto = {
  0: "https://i.ibb.co/M9KRsVv/IMG-2040.jpg",
  1: "https://i.ibb.co/pZ7rM3j/photo-2023-10-30-20-50-55.jpg",
  2: "https://i.ibb.co/v4QF3Nq/Clipchamp.gif",
  3: mainPhoto,
};

    const sliderCatalog = ['Mechatronik', 'Getriebe', 'Ventile'];
const currentIndex = ref(0);
const searchStore = useSearchStore();
const router = useRouter();

// Swiper instance
let mySwiper;

const previosSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + sliderCatalog.length) % sliderCatalog.length;
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % sliderCatalog.length;
};

const goToCatalog = () => {
  const catalog = sliderCatalog[currentIndex.value]; // Получить значение из sliderCatalog на основе currentIndex
  searchStore.setSearch(catalog);
  router.push({ path: 'Catalog', query: { search: catalog } }); // Передать выбранное значение в параметре 'search'
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

@media only screen and (min-width: 1200px) {
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
