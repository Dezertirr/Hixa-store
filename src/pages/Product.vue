<template>
   <div v-if="producte">
      <h1 class="titleProd">{{producte.name[locale]}}</h1>
      
      <div class="productCard">
        <img class="productImg" src="@/images/DSG-7.png"/>

        <div class="proudctInfo">
          <div class="productHeader">
            <p class="productBrand">{{  $t('Product.Producer') }}: {{ producte.brand }}</p>
            
        <p class="productPrice"> {{  $t('Product.Price') }}:${{ producte.price }}</p>
      </div>
      <p class="productText">{{  $t('Product.Detail') }}</p>
        <p class="productText">{{ producte.description[locale] }}</p>
        <p class="productText">{{  $t('Product.PartNum') }}: {{ producte.numPart }}</p>
        <div class="productCart">
        
        <h5>{{  $t('Product.Warning') }}</h5>

            <h5>{{  $t('Product.Exchange') }}</h5>
              <p class="productCode">{{  $t('Product.ProdCode') }}: {{ producte.code }}</p>

        <div class="cartQuantity">
          <BasketBtn @click="addBasket(producte, selectedQuantity)"></BasketBtn>
          <label>
    {{ $t('Product.quantity') }}
    <input type="number" v-model="selectedQuantity" min="1" class="cartQuantityInput">
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
  import { useSearchStore } from '../stores/counter'
  import exchangeCourse from '../services/exchangeCourse';
  import BasketBtn from '@/components/BasketBtn.vue';
  import { useI18n } from 'vue-i18n';
import { notify } from '@kyvg/vue3-notification';
import axios from 'axios';


  
  export default {
    setup() {
    const route = useRoute();
    const products = ref(null);
      const course = ref(0);
      let producte = ref (null);
      const { t, locale } = useI18n()

      const selectedQuantity = 1;



  
      onMounted(async () => {
      const id = Number(route.query.id);
      const fetchedProduct = await fetchProductById(id);
      if (fetchedProduct) {
        producte.value = fetchedProduct;
      } else {
        // Обработка ситуации, когда продукт не найден
      }
    });
const fetchProductById = async (id) => {
  const api = axios.create({

})
  console.log('Fetching product with ID:', id);
  try {
    const response = await axios.get(`https://adminhixanew-5212f266e6b8.herokuapp.com/api/products/${id}`);
    console.log('Response data:', response.data);
    let producte = response.data
    console.log(producte.name, producte.brand);
    return producte;
  } catch (error) {
    console.error('Ошибка при загрузке продукта с бэкенда:', error);
    return null;
  }
};

  
      const product = computed(() => {
  const id = Number(route.query.id);
  const foundProduct = fetchProductById(id);
  console.log("Found product in Product component:", foundProduct); // Добавьте эту строку для отладки
  return foundProduct;
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
        products,
        addBasket,
        locale,
        selectedQuantity,
        producte,

      };
    },
    components: {
      BasketBtn
    }
  };
  </script>
  
  
  <style scoped>
  .titleProd {
    font-size: 22px;
  }
  .productCard {
   margin: 30px auto;
   max-width: 1200px;
   border: 1px solid black;
   display: inline-block;
  }
  @media only screen and (min-width: 1200px) {
    .productCard {
      display: flex;
    }
  }

.productImg {
  display: flex;
margin:15px auto ;
width: 400px;
height: 400px;
object-fit: contain ;
}
@media only screen and (min-width: 1200px) {
  .productImg {
    margin:15px ;
    width: 450px;
height: 450px;
  }
}

.proudctInfo {
  width: 720px;
}

.productHeader {
  display: flex;
    justify-content: space-between;
    margin: 0 45px;
    margin-bottom: 40px;
}
@media only screen and (min-width: 1200px) {
  .productHeader {
    margin-bottom: 80px;
  }
}


.productBrand {

}

.productPrice {

}
.productText {
  margin: 0 45px 25px 15px;
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
    margin: 0 45px 0 15px;
}

@media only screen and (min-width: 1200px) {
  .productCart {
    
  }
}
.cartQuantity{
  display: flex;
  align-items: center;

}

.cartQuantityInput{
  height: 25px;
  border-radius: 15px;
}

  </style>
  