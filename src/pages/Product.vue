<template>
  <div v-if="product">
      <h1>{{product.part[locale]}}</h1>
      
      <div class="productCard">
        <img class="productImg" src="@/images/DSG-7.png"/>

        <div class="proudctInfo">
          <div class="productHeader">
            <p class="productBrand">{{  $t('Product.Producer') }}: {{ product.brand }}</p>
            
        <p class="productPrice"> {{  $t('Product.Price') }}:${{ product.price }}</p>
      </div>
      <p>
        {{  $t('Product.Detail') }}</p>
        <p>{{ product.value[locale] }}</p>
        <p>{{  $t('Product.PartNum') }}: {{ product.numPart }}</p>
        <div class="productCart">
        
        <h5>{{  $t('Product.Warning') }}</h5>

            <h5>{{  $t('Product.Exchange') }}</h5>
              <p class="productCode">{{  $t('Product.ProdCode') }}: {{ product.code }}</p>


        <BasketBtn @click="addBusket(product)"></BasketBtn>
      </div>
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
  import BasketBtn from '@/components/BasketBtn.vue';
  import { useI18n } from 'vue-i18n';


  
  export default {
    setup() {
      const route = useRoute();
      const products = ref(jsonArray);
      const course = ref(0);
      console.log(course);
      const { t, locale } = useI18n();

  
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
  
      const addBusket = (product) => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems.push(product);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        console.log('Товар добавлен в корзину', product);
        console.log(product.id);
        console.log(product.name);
        console.log(product.brand);
      };
  
      return {
        product,
        addBusket,
        locale
      };
    },
    components: {
      BasketBtn
    }
  };
  </script>
  
  
  <style scoped>
  .productCard {
   margin: 30px auto;
   max-width: 1200px;
   border: 1px solid black;
   display: flex;
  }

.productImg {
margin:15px;
width: 450px;
height: 450px;
object-fit: contain ;
}

.proudctInfo {
  width: 720px;
}

.productHeader {
  display: flex;
    justify-content: space-between;
    margin: 0 30px;
    margin-bottom: 80px;
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
.productCart {
  display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-top: 80px;
}

  </style>
  