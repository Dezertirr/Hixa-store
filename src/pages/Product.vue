<template>
  <div v-if="product">
      <h1>{{product.part}}</h1>
      
      <div class="productCard">
        <div class="productImg"></div>
        <div class="productHeader">
            <p class="productBrand">Виробник: {{ product.brand }}</p>
        <p class="productPrice"> Ціна:${{ product.price }}</p>
      </div>
        <div class="proudctInfo">

        <p class="productFor">{{ product.mark }}</p>
        <p class="productValue">{{ product.value }}</p>
        <p class="productCode">{{ product.code }}</p>
      </div>
      </div>
      </div>
      <div v-else>
        <p>Товар не найден</p>
      </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import jsonArray from '../services/Catalog.json';
  import exchangeCourse from '../services/exchangeCourse';
  
  export default {
    setup() {
      const route = useRoute();
      const products = ref(jsonArray);
      const course = ref(0);
console.log(course);

      onMounted(async () => {
  try {
    const data = await exchangeCourse();
    course.value = data;
  } catch (error) {
    console.error(error);
  }
});
  
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
  .productCard {
   margin: 0 auto;
   max-width: 1200px;
   border: 1px solid black;
   display: flex;
  }

.productImg {
margin:15px;
width: 450px;
height: 450px;
border: 1px solid black;
}

.proudctInfo {

}

.productHeader {
display: flex;
}


.productBrand {

}

.productPrice {

}

.productFor {

}

.productValue {

}

.productCode {

}

  </style>
  