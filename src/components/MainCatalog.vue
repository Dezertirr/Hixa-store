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
      :slides-per-view="slidesPerView"
      :grid="{ rows: 1 }"
      :space-between="0"
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




  <swiper
      ref="{swiperRef}"
      :slidesPerView="8"
      :centeredSlides="false"
      :spaceBetween="30"
      :pagination="{
      type: 'fraction',
    }"
      :navigation="true"
      :modules="modules"
      class="mySwipersecond"
  >
    
  <swiper-slide class="second" :style="{ 'backgroundImage': 'linear-gradient(196deg, rgba(74, 74, 74, 0.00) 0.9%, rgba(0, 0, 0, 0.00) 11.04%, rgba(22, 22, 22, 0.56) 46.99%, #2C2D36 105.41%), url(' + sliderPhotoMain + ')', 'background-repeat': 'no-repeat', 'background-size': 'cover', 'background-position': 'center', 'width': '235px', 'height': '215px' }">
  <p class="secondText">Getriebesteuergerät S-Tronik DSG 7 Gang DL501 0B5 J/K/F/E</p>
</swiper-slide>


<swiper-slide class="second" :style="{ 'backgroundImage': 'linear-gradient(196deg, rgba(74, 74, 74, 0.00) 0.9%, rgba(0, 0, 0, 0.00) 11.04%, rgba(22, 22, 22, 0.56) 46.99%, #2C2D36 105.41%), url(' + sliderPhotoMain + ')', 'background-repeat': 'no-repeat', 'background-size': 'cover', 'background-position': 'center', 'width': '235px', 'height': '215px' }">
  <p class="secondText">Getriebesteuergerät S-Tronik DSG 7 Gang DL501 0B5 J/K/F/E</p>
</swiper-slide>

<swiper-slide class="second" :style="{ 'backgroundImage': 'linear-gradient(196deg, rgba(74, 74, 74, 0.00) 0.9%, rgba(0, 0, 0, 0.00) 11.04%, rgba(22, 22, 22, 0.56) 46.99%, #2C2D36 105.41%), url(' + sliderPhotoMain + ')', 'background-repeat': 'no-repeat', 'background-size': 'cover', 'background-position': 'center', 'width': '235px', 'height': '215px' }">
  <p class="secondText">Getriebesteuergerät S-Tronik DSG 7 Gang DL501 0B5 J/K/F/E</p>
</swiper-slide>

<swiper-slide class="second" :style="{ 'backgroundImage': 'linear-gradient(196deg, rgba(74, 74, 74, 0.00) 0.9%, rgba(0, 0, 0, 0.00) 11.04%, rgba(22, 22, 22, 0.56) 46.99%, #2C2D36 105.41%), url(' + sliderPhotoMain + ')', 'background-repeat': 'no-repeat', 'background-size': 'cover', 'background-position': 'center', 'width': '235px', 'height': '215px' }">
  <p class="secondText" @click="">Getriebesteuergerät S-Tronik DSG 7 Gang DL501 0B5 J/K/F/E</p>
</swiper-slide>



  </swiper>

  <p class="append-buttons"></p>





</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/navigation'

import jsonArray from '@/services/MainCatalog.json'
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {Grid, Navigation, Pagination} from 'swiper/modules'
import photosForSlide from '../images/SliderCat1.jpg'

const sliderPhotoMain = [
  photosForSlide



]


export default {
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const products = jsonArray.map((product) => ({ ...product }))
    const displayedProducts = ref(products)
    const onSwiper = (swiperInstance) => {
      swiper.value = swiperInstance
    }
    const goToProduct = (product) => {
      router.push({ path: '/Product', query: { id: product.id } })
    }

    const swiper = ref(null)
    const modules = [Grid, Navigation]
    const slidesPerView = ref(getSlidesPerView())

    function getSlidesPerView() {
      const screenWidth = window.innerWidth
      if (screenWidth < 700) {
        return 1
      } else if (screenWidth < 1200) {
        return 2
      } else {
        return 6
      }
    }

    function handleResize() {
      slidesPerView.value = getSlidesPerView()
    }

    onMounted(() => {
      window.addEventListener('resize', handleResize)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize)
    })

    watch(slidesPerView, () => {
      if (swiper.value) {
        swiper.value.update()
      }
    })

    return {
      displayedProducts,
      goToProduct,
      swiper,
      modules,
      onSwiper,
      slidesPerView,
      sliderPhotoMain
    }
  }
}
</script>
<style>

.mySwipersecond{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: start;
  margin-left: 20px;


}


.swiper-slide.second{
  margin-top: 20px;
  border:1px solid black;
  border-radius:36px ;
  background: rgb(2,0,36);
background: linear-gradient(196deg, rgba(2,0,36,0) 0%, rgba(0,0,0,0.8072478991596639) 100%);

}
.MainCatalogSection {
  display: flex;
  flex-direction: row;

  padding: 15px 20px;
  background-color: #CCCCCC;
}

.mySwiper {
  width: 100%;
  height: 240px;
  overflow: hidden;


}

.swiper-slide.cat {
  /* flex-shrink: 0; */
 
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
  display: flex;
  flex-direction: column;
  justify-content: center;
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
.swiper-wrapper{
  height: 300px;
}

.second {
 width: 235px;
  height: 215px;
  background: rgb(2,0,36);
background: linear-gradient(196deg, rgba(2,0,36,0) 0%, rgba(0,0,0,0.8072478991596639) 100%);


}

.cat {
  width: 193px;
height: 187px;
}
.secondText {
  display: flex;
  color: white;
  font-family: Inter;
font-size: 15px;
font-weight: 700;
text-transform: uppercase;
padding: 110px 10px 0 10px;

}
</style>
