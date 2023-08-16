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

        <div class="cartQuantity">
          <BasketBtn @click="addBasket(product, selectedQuantity)"></BasketBtn>
          <label>
    {{ $t('Product.quantity') }}
    <input type="number" v-model="selectedQuantity" min="1" >
  </label>
        
      </div>
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
import { notify } from '@kyvg/vue3-notification';


  
  export default {
    setup() {
      const route = useRoute();
      const products = ref(jsonArray);
      const course = ref(0);
      console.log(course);
      const { t, locale } = useI18n();
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      const selectedQuantity = 1

  
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
  
      const addBasket = (product, quantity) => {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  
  for (let i = 0; i < quantity; i++) {
    cartItems.push(product);
  }
  
  localStorage.setItem('cart', JSON.stringify(cartItems));
  
 

  notify({
      title: `${t('Product.addCart')}`,
      text: `${quantity} ${t('Product.addCartText')}`, product,
      type: 'success'
    })
};
  
      return {
        product,
        addBasket,
        locale,
        selectedQuantity
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
.cartQuantity{
  display: flex;
  align-items: center;
}

  </style>
  