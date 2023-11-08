<template>
  <div class="topslider_categories"><swiper
      ref="{swiperRef}"
      :slidesPerView="slidesPerView"
      :centeredSlides="true"
      :spaceBetween="80"
      :initialSlide="1"


      :modules="modules"
      class="mySwipersecond"
  >

    <swiper-slide class="second" :style="{ 'backgroundImage': 'linear-gradient(196deg, rgba(74, 74, 74, 0.00) 0.9%, rgba(0, 0, 0, 0.00) 11.04%, rgba(22, 22, 22, 0.56) 46.99%, #2C2D36 105.41%), url(' + sliderPhotoMain1 + ')', 'background-repeat': 'no-repeat', 'background-size': '140% 140%', 'background-position': 'center', 'width': '235px', 'height': '215px' }">

      <button class="butter-button">More</button>

    </swiper-slide>


    <swiper-slide class="second" :style="{ 'backgroundImage': 'linear-gradient(196deg, rgba(74, 74, 74, 0.00) 0.9%, rgba(0, 0, 0, 0.00) 11.04%, rgba(22, 22, 22, 0.56) 46.99%, #2C2D36 105.41%), url(' + sliderPhotoMain2 + ')', 'background-repeat': 'no-repeat', 'background-size': '140% 140%', 'background-position': 'center', 'width': '235px', 'height': '215px' }">

      <button class="butter-button">More</button>
    </swiper-slide>

    <swiper-slide class="second" :style="{ 'backgroundImage': 'linear-gradient(196deg, rgba(74, 74, 74, 0.00) 0.9%, rgba(0, 0, 0, 0.00) 11.04%, rgba(22, 22, 22, 0.56) 46.99%, #2C2D36 105.41%), url(' + sliderPhotoMain3 + ')', 'background-repeat': 'no-repeat', 'background-size': '140% 140%', 'background-position': 'center', 'width': '235px', 'height': '215px' }">
      <button class="butter-button">More</button>
    </swiper-slide>

    <swiper-slide class="second" :style="{ 'backgroundImage': 'linear-gradient(196deg, rgba(74, 74, 74, 0.00) 0.9%, rgba(0, 0, 0, 0.00) 11.04%, rgba(22, 22, 22, 0.56) 46.99%, #2C2D36 105.41%), url(' + sliderPhotoMain4 + ')', 'background-repeat': 'no-repeat', 'background-size': '140% 140%', 'background-position': 'center', 'width': '235px', 'height': '215px' }">
      <button class="butter-button">More</button>
    </swiper-slide>
    <swiper-slide class="second" :style="{ 'backgroundImage': 'linear-gradient(196deg, rgba(74, 74, 74, 0.00) 0.9%, rgba(0, 0, 0, 0.00) 11.04%, rgba(22, 22, 22, 0.56) 46.99%, #2C2D36 105.41%), url(' + sliderPhotoMain5 + ')', 'background-repeat': 'no-repeat', 'background-size': '140% 140%', 'background-position': 'center', 'width': '235px', 'height': '215px' }">
      <button class="butter-button">More</button>
    </swiper-slide>



  </swiper></div>

<!--  <div class="MainCatalogSection">-->
<!--    <button class="prev_slide" @click="swiper.slidePrev()">-->
<!--      <svg-->
<!--        width="30px"-->
<!--        height="30px"-->
<!--        viewBox="0 0 16 16"-->
<!--        fill="none"-->
<!--        xmlns="http://www.w3.org/2000/svg"-->
<!--      >-->
<!--        <path-->
<!--          clip-rule="evenodd"-->
<!--          d="M0 8C-1.93129e-07 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 1.93129e-07 8 0C3.58172 -1.93129e-07 1.93129e-07 3.58172 0 8ZM8 12V9H13V7L8 7V4H7L3 8L7 12H8Z"-->
<!--          fill="#15575e"-->
<!--          fill-rule="evenodd"-->
<!--        />-->
<!--      </svg>-->
<!--    </button>-->


    <swiper
        :slidesPerView="slidesPerView"
        :spaceBetween=0
        :slidesPewView="4"
        :grid="{
      rows: 3,
    }"
        :pagination="{ clickable: true }"
        :modules="modules"
        class="mySwiper"

    >
      <swiper-slide v-for="(product, index) in displayedProducts" :key="index" class="swiper-card-wrapper"  style="margin-right: 0 !important; margin-top: 0!important;">
        <!-- Здесь вы можете вставить информацию о продукте -->
        <div class="card_product" @click="goToProductSlide(product.id)">
          <h3 class="product_name">{{ product.brand }}</h3>
          <img  :src="product.photo"  class="photo-product " alt="Product Image" width="235" style="object-fit: cover !important;" />
        </div>
      </swiper-slide>
    </swiper>





<!--    <button class="next_slide" @click="swiper.slideNext()">-->
<!--      <svg-->
<!--        width="30px"-->
<!--        height="30px"-->
<!--        viewBox="0 0 16 16"-->
<!--        fill="none"-->
<!--        xmlns="http://www.w3.org/2000/svg"-->
<!--      >-->
<!--        <path-->
<!--          clip-rule="evenodd"-->
<!--          d="M16 8C16 3.58172 12.4183 -1.93129e-07 8 0C3.58172 1.93129e-07 -1.93129e-07 3.58172 0 8C1.93129e-07 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8ZM8 4V7H3V9H8V12H9L13 8L9 4H8Z"-->
<!--          fill="#15575e"-->
<!--          fill-rule="evenodd"-->
<!--        />-->
<!--      </svg>-->
<!--    </button>-->
<!--  </div>-->






  <p class="append-buttons"></p>





</template>

<script>
import {useSearchStore}  from "@/stores/counter";
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/navigation'
import axios from 'axios' // Подключаем библиотеку для HTTP-запросов

import jsonArray from '@/services/MainCatalog.json'
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Grid, Navigation, Pagination } from 'swiper/modules'
import photosForSlide1 from '../images/main-page-categoriesslider/SliderCat1.png'
import photosForSlide2 from '../images/main-page-categoriesslider/SliderCat2.png'
import photosForSlide3 from '../images/main-page-categoriesslider/SliderCat3.png'
import photosForSlide4 from '../images/main-page-categoriesslider/SliderCat4.png'
import photosForSlide5 from '../images/main-page-categoriesslider/SliderCat5.png'
import product from "@/pages/Product.vue";

const sliderPhotoMain1 = photosForSlide1
const sliderPhotoMain2 = photosForSlide2
const sliderPhotoMain3 = photosForSlide3
const sliderPhotoMain4 = photosForSlide4
const sliderPhotoMain5 = photosForSlide5
const fetchAllProducts = async () => {
  const api = axios.create({

  })
  console.log('Fetching product with ID:', );
  try {
    const response = await axios.get(`https://hixanew.onrender.com/api/products/`);
    console.log('Response data:', response.data);
    let product = response.data
    console.log(product);
    return product;
  } catch (error) {
    console.error('Ошибка при загрузке продукта с бэкенда:', error);
    return null;
  }
};

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    const searchStore = useSearchStore();

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
      const screenWidth = window.innerWidth;
      if (screenWidth < 700) {
        return 1;
      } else if (screenWidth < 992) {
        return 2;
      } else if (screenWidth < 1200) {
        return 3;
      } else {
        return 4;
      }
    }


    function handleResize() {
      slidesPerView.value = getSlidesPerView();
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

    // Функция для загрузки продуктов с бекенда
    async function fetchProducts() {
      try {
        const response = await searchStore.fetchProducts();
        displayedProducts.value = response;
      } catch (error) {
        console.error('Ошибка при загрузке данных с бекенда:', error);
      }
    }
/////
    ////
    ////
    ///

    function goToProductSlide(productId) {
      router.push({ path: '/Product', query: { id: productId } });
    }

    watch(slidesPerView, () => {
      if (swiper.value) {
        swiper.value.update();
      }
    });

    onMounted(async () => {
      try {
        slidesPerView.value = getSlidesPerView(); // Добавьте эту строку
        const response = await fetchAllProducts();
        displayedProducts.value = response; // Присваиваете данные переменной displayedProducts
        console.log(displayedProducts)
      } catch (error) {
        console.error('Ошибка при загрузке данных с бекенда:', error)
      }
    })
/////
    ////



    ////
    ////

    ////





    return {
      displayedProducts,
      goToProduct,
      swiper,
      modules,
      onSwiper,
      slidesPerView,
      sliderPhotoMain1,
      sliderPhotoMain2,
      sliderPhotoMain3,
      sliderPhotoMain4,
      sliderPhotoMain5,
      fetchProducts,
      fetchAllProducts,
      products,
      goToProductSlide

    }
  }
}

</script>

<style>
.swiper-grid-column > .swiper-wrapper {
  flex-wrap: wrap;
  flex-direction: row;
}
.photo-product{
  border-radius: 23px;

    width: 335px;
    height: 215px;
    object-fit: cover;

}
.swiper-slide.swiper-slide-prev.swiper-card-wrapper{
  width: 440px;
  margin-right: 0!important;
}
.product_name{
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}
.mySwiper{
  padding-top: 40px;
  margin-top: 58px;

  justify-content: space-between;
  align-content: center;
  flex-wrap: wrap;
  overflow: hidden;
}
.topslider_categories{
  background-color: #CCCCCC;
}
.swiper-wrapper.mySwiper{
  height: 800px;
}
.mySwipersecond {
  display: flex;
  flex-direction: row;
  justify-content: center;

  align-content: center;
  margin-left: 20px;
}

.card_product{
  border-radius: 23px;
  text-align: center;
  position: relative;

  width:335px ;
  height: 215px;
  border:black 1px solid;
  margin-left: 20px;

}

.butter-button{

  flex-direction: row;
  width: 105px;
  height: 35px;
  background-color: #FF8049;
  border-color: transparent;
  border-radius: 7px;
  color: white;
  justify-content: center;
  align-content: center;
  margin-top: 70%;
  margin-left: 30%;

}

.swiper-slide.second{
margin-right: 0;
  border:1px solid black;
  border-radius:36px ;
  background: rgb(2,0,36);
background: linear-gradient(196deg, rgba(2,0,36,0) 0%, rgba(0,0,0,0.8072478991596639) 100%);

}
.MainCatalogSection {
  display: flex;
  flex-direction: row;

  padding: 15px 20px;
  background-color: white;
}

.mySwiper {
  width: 100%;
  height: 900px;
  padding-left: 40px;



}

.swiper-slide.cat {
  /* flex-shrink: 0; */
 
  border: 1px solid black;
  opacity: 1;

  transition: opacity 1s ease-in-out;
  border-radius: 15px;

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
 max-width: 235px;
  height: 215px;
  background: rgb(2,0,36);
background: linear-gradient(196deg, rgba(2,0,36,0) 0%, rgba(0,0,0,0.8072478991596639) 100%);
  display: flex;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;


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
