<template>
    <div>
      <h1>Product Details</h1>
      <div v-if="product">
        <h2>{{ product.brand }}</h2>
        <p>{{ product.value }}</p>
        <!-- Другие поля товара -->
      </div>
      <div v-else>
        <p>Товар не найден</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import jsonArray from '../services/Catalog.json';
  
  export default {
    setup() {
      const route = useRoute();
      const products = ref(jsonArray);
  
      const getProductById = (id) => {
        return products.value.find((product) => product.id === id);
      };
  
      const product = computed(() => {
        const id = Number(route.query.id);
        return getProductById(id);
      });
  
      return {
        product
      };
    }
  };
  </script>
  
  <style scoped>
  /* Стили остаются без изменений */
  </style>
  