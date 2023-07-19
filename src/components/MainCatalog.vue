<template>
    <div class="MainCatalogSection">
      <button @click="previousPage" :disabled="currentPage === 1">Назад</button>
      <ul class="MainCatalogList">
        <li v-for="(product, index) in displayedProducts" :key="product.id" @click="goToProduct(product)" :class="['MainCatalogItem', {'fade-out': product.fadeOut, 'fade-in': product.fadeIn}]">
          <p class="MainCatalogText MainCatalogTitle">{{ product.brand }}</p>
          <div class="MainCatalogPhoto">Тут має бути фото</div>
          <p class="MainCatalogText">{{ product.name }}</p>
          <p class="MainCatalogText">{{ product.smallcontent }}</p>
        </li>
      </ul>
      <button @click="nextPage" :disabled="currentPage === totalPages">Далі</button>
    </div>
  </template>
  
  <script>
  import jsonArray from '@/services/MainCatalog.json';
  import { ref, computed, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  export default {
    setup() {
      const route = useRoute();
      const router = useRouter();
      const products = ref(jsonArray.map(product => ({
        ...product,
        fadeOut: false,
        fadeIn: false
      })));
      const itemsPerPage = 6;
      const currentPage = ref(1);
  
      const goToProduct = (product) => {
        router.push({ path: '/Product', query: { id: product.id } });
      };
  
      const nextPage = () => {
        if (currentPage.value < totalPages.value) {
          animateTransition(currentPage.value, currentPage.value + 1);
          currentPage.value++;
        }
      };
  
      const previousPage = () => {
        if (currentPage.value > 1) {
          animateTransition(currentPage.value, currentPage.value - 1);
          currentPage.value--;
        }
      };
  
      const animateTransition = (currentPage, nextPage) => {
        const currentItemIndex = (currentPage - 1) * itemsPerPage;
        const nextItemIndex = (nextPage - 1) * itemsPerPage;
  
        products.value.forEach((product, index) => {
          if (index >= nextItemIndex && index < nextItemIndex + itemsPerPage) {
            product.fadeOut = false;
            product.fadeIn = true;
          } else if (index >= currentItemIndex && index < currentItemIndex + itemsPerPage) {
            product.fadeOut = true;
            product.fadeIn = false;
          } else {
            product.fadeOut = false;
            product.fadeIn = false;
          }
        });
      };
  
      const totalPages = computed(() => {
        return Math.ceil(products.value.length / itemsPerPage);
      });
  
      const displayedProducts = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return products.value.slice(start, end);
      });
  
      watch(() => route.query, (query) => {
        if (query.page) {
          currentPage.value = parseInt(query.page);
        } else {
          currentPage.value = 1;
        }
      }, { immediate: true });
  
      return {
        displayedProducts,
        previousPage,
        nextPage,
        goToProduct,
        currentPage,
        totalPages,
      };
    },
  };
  </script>
  
  <style>
  .MainCatalogSection {
    display: flex;
  }
  
  .MainCatalogList {
    display: flex;
    justify-content: center;
    list-style: none;
    gap: 25px;
    flex-wrap: wrap;
    margin: 25px auto;
  }
  
  .MainCatalogItem {
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 300px;
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
  }
  
  .fade-out {
    opacity: 0;
    pointer-events: none;
  }
  
  .fade-in {
    opacity: 1;
    pointer-events: auto;
  }
  
  button {
    margin-top: 10px;
  }
  </style>
  