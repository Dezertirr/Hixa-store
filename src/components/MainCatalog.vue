<template>
  <div class="MainCatalogSection">
    <button @click="swiper.slidePrev()">Назад</button>
    <div ref="swiperContainer" class="swiper-container">
      <div class="swiper-wrapper  mainCatSlide">
        <div v-for="(product, index) in displayedProducts" :key="product.id" @click="goToProduct(product)" class="swiper-slide MainCatalogItem">
          <p class="MainCatalogText MainCatalogTitle">{{ product.brand }}</p>
          <div class="MainCatalogPhoto">Тут має бути фото</div>
          <p class="MainCatalogText">{{ product.name }}</p>
          <p class="MainCatalogText">{{ product.smallcontent }}</p>
        </div>
      </div>
    </div>
    <button @click="swiper.slideNext()">Далі</button>
  </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css';

import jsonArray from '@/services/MainCatalog.json';
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const products = ref(jsonArray.map(product => ({
      ...product,
    })));

    // Add the displayedProducts variable and populate it with the products data
    const displayedProducts = computed(() => products.value);

    const goToProduct = (product) => {
      router.push({ path: '/Product', query: { id: product.id } });
    };

    const swiper = ref(null);

    // Initialize Swiper after the component is mounted
    onMounted(() => {
      swiper.value = new Swiper('.swiper-container', {
  slidesPerView: 6,
  spaceBetween: 25,
  slidesPerColumn: 2, // Добавьте этот параметр для двух рядов
  grid: {
    rows: 2,
  },
});
    });

    return {
      displayedProducts,
      goToProduct,
      swiper,
    };
  },
};
</script>

<style>
.MainCatalogSection {
  display: flex;
  margin: 15px;
}


.swiper-container {
  width: 100%;
  overflow: hidden;
  display: flex; /* Добавьте это, чтобы элементы flex обертки встали в два ряда */
  flex-wrap: wrap; /* Добавьте это, чтобы элементы переходили на новую строку */
}

.swiper-wrapper {
  display: flex;
}

.swiper-slide {
  flex-shrink: 0;
  width: 200px;
  height: 300px;
  border: 1px solid black;
  opacity: 1;
  transition: opacity 1s ease-in-out;
  border-radius: 15px;
  margin-right: 25px;
}

.MainCatalogTitle {
  margin: 0 auto;
}

.MainCatalogPhoto {
  width: 190px;
  height: 140px;
  border: 1px solid black;
  margin: 0 auto;
  border-radius: 15px;
}

.MainCatalogText {
  margin: 15px 0 0 15px;
}

button {
  margin-top: 10px;
}
.mainCatSlide {
  display: flex;
}
</style>
