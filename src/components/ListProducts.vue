<template>
  <div>
    <ul v-if="products && products.length > 0" class="productList">
      <li v-for="item in products" :key="item.id" class="productItem">
        <div @click="goToProduct(item)" class="productFlex">
          <h3 class="productItemTitle">{{ item.brand }}</h3>
          <img src="@/images/DSG-7.png" class="productItemPhoto"/>

          <p class="productItemText">{{ item.name[locale] }}</p>
        </div>
        <BasketBtn @click="addBusket(item)"></BasketBtn>
      </li>
    </ul>
    <p v-else>{{ $t('emptyCat') }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSearchStore } from '../stores/counter'
import { useRouter } from 'vue-router'
import BasketBtn from '@/components/BasketBtn.vue'


const searchStore = useSearchStore()
const router = useRouter()

const products = ref([])

const fetchProducts = async () => {
  try {
    const response = await searchStore.fetchProducts();
    console.log("Fetched products:", response); // Добавьте эту строку для отладки
    return response;
  } catch (error) {
    console.error('Ошибка при загрузке данных с бекенда:', error);
  }
};


const goToProduct = (item) => {
  router.push({ path: '/Product', query: { id: item.id } })
}

const addBusket = (item) => {
  router.push({ path: '/cart', query: { id: item.id } })
  const cartItems = JSON.parse(localStorage.getItem('cart')) || []
  cartItems.push(item)
  localStorage.setItem('cart', JSON.stringify(cartItems))
  console.log('Товар добавлен в корзину', item)
}

onMounted(async () => {
  const fetchedProducts = await fetchProducts();
  products.value = fetchedProducts;
  console.log(products);
});



</script>
<style scoped>
.productList {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: space-around;
  list-style: none;
  margin: 15px 40px;
}

.productItem {
  width: 250px;
  height: 400px;
  border: 1px solid #b0b0b0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  background: linear-gradient(167deg, rgba(0, 151, 157, 1) 22%, rgba(0, 97, 102, 1) 78%);
  border-radius: 10px;
  margin: 0 auto;
}

.productFlex {
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.productItemTitle {
  margin: 15px 0;
}

.productItemPhoto {
  width: 225px;
  height: 200px;
  border-radius: 10px;
  margin: 0 auto;
  object-fit: contain;
}

.productItemText {
  margin: 0 15px;
}

.productItemBtn {
  height: 35px;
  width: 120px;
  margin: 15px;
  border-radius: 10px;
  box-shadow: none;
  border: 1px solid #b0b0b0;
}
</style>
