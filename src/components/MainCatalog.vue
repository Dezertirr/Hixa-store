<template>
  <div class="MainCatalogSection">
    <button class="prev_slide" @click="swiper.slidePrev()">
      <svg
        width="30px"
        height="30px"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clip-rule="evenodd"
          d="M0 8C-1.93129e-07 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 1.93129e-07 8 0C3.58172 -1.93129e-07 1.93129e-07 3.58172 0 8ZM8 12V9H13V7L8 7V4H7L3 8L7 12H8Z"
          fill="#15575e"
          fill-rule="evenodd"
        />
      </svg>
    </button>
    <swiper
      :slidesPerView="6"
      :grid="{ rows: 2 }"
      :spaceBetween="20"
      :modules="modules"
      :direction="'horizontal'"
      class="mySwiper"
      @swiper="onSwiper"
    >
      <swiper-slide
        class="swiper-slide cat"
        v-for="(product, index) in displayedProducts"
        :key="product.id"
        @click="goToProduct(product)"
      >
        <p class="MainCatalogText MainCatalogTitle">{{ product.brand }}</p>
        <div class="MainCatalogPhoto">Тут має бути фото</div>
        <p class="MainCatalogText">{{ product.name }}</p>
        <p class="MainCatalogText">{{ product.smallcontent }}</p>
      </swiper-slide>
    </swiper>
    <button class="next_slide" @click="swiper.slideNext()">
      <svg
        width="30px"
        height="30px"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clip-rule="evenodd"
          d="M16 8C16 3.58172 12.4183 -1.93129e-07 8 0C3.58172 1.93129e-07 -1.93129e-07 3.58172 0 8C1.93129e-07 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8ZM8 4V7H3V9H8V12H9L13 8L9 4H8Z"
          fill="#15575e"
          fill-rule="evenodd"
        />
      </svg>
    </button>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/grid'

import jsonArray from '@/services/MainCatalog.json'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { Grid } from 'swiper/modules'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const products = ref(jsonArray.map((product) => ({ ...product })))
    const displayedProducts = computed(() => products.value)
    const onSwiper = (swiperInstance) => {
      swiper.value = swiperInstance
    }
    const goToProduct = (product) => {
      router.push({ path: '/Product', query: { id: product.id } })
    }

    const swiper = ref(null)
    const modules = [Grid]

    return {
      displayedProducts,
      goToProduct,
      swiper,
      modules,
      onSwiper
    }
  }
}
</script>

<style>
.MainCatalogSection {
  display: flex;
  flex-direction: row;
  margin: 15px;
}

.mySwiper {
  width: 100%;
  height: 630px;
  overflow: hidden;
}

.swiper-slide.cat {
  /* flex-shrink: 0; */
  width: auto;
  height: 300px;
  border: 1px solid black;
  opacity: 1;
  max-width: 370px;
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
  font-weight: 400;
  font-size: small;
}

button {
  margin-top: 10px;
}

.prev_slide {
  background-color: transparent;
  border-color: transparent;
  transition: ease-in-out 0.5s;
}
.next_slide {
  background-color: transparent;
  border-color: transparent;
  transition: ease-in-out 0.5s;
}
.next_slide:hover {
  scale: 1.2;
}
.prev_slide:hover {
  scale: 1.2;
}
</style>
