<template>
  <div>
    <ul v-if="filteredData.length > 0" class="productList">
      <li v-for="item in filteredData" :key="item.id" class="productItem">
        <div @click="goToProduct(item)">
          <h3 class="productItemTitle">{{ item.brand }}</h3>
          <p class="productItemPhoto">Тут має бути фото</p>
          <p class="productItemText">{{ item.value }}</p>
        </div>
        <BasketBtn @click="addBusket(item)"></BasketBtn>
      </li>
    </ul>
    <p v-else>Вибачте, такого товару в нас немає</p>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import jsonArray from '../services/Catalog.json'
import { useSearchStore } from '../stores/counter'
import { useRouter } from 'vue-router'
import BasketBtn from '@/components/BasketBtn.vue'

export default {
  setup() {
    const searchStore = useSearchStore()
    const router = useRouter()

    const filteredData = computed(() => {
      const searchText = searchStore.getSearch().toLowerCase()

      return jsonArray.filter((item) => item.name.toLowerCase().includes(searchText))
    })

    const goToProduct = (item) => {
      router.push({ path: '/Product', query: { id: item.id } })
      console.log(item.id)
      console.log(item.name)
      console.log(item.brand)
    }
    const addBusket = (item) => {
      router.push({ path: '/cart', query: { id: item.id } })
      const cartItems = JSON.parse(localStorage.getItem('cart')) || []
      cartItems.push(item)
      localStorage.setItem('cart', JSON.stringify(cartItems))
      console.log('Товар добавлен в корзину', item)
      console.log(item.id)
      console.log(item.name)
      console.log(item.brand)
    }
    return {
      filteredData,
      goToProduct,
      addBusket
    }
  },
  components: {
    BasketBtn
  }
}
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
  background: rgb(105, 105, 105);
  background: linear-gradient(126deg, rgba(105, 105, 105, 1) 0%, rgba(144, 144, 144, 1) 88%);
  border-radius: 10px;
  margin: 0 auto;
}

.productItemTitle {
  margin: 15px 105px;
}

.productItemPhoto {
  width: 225px;
  height: 200px;
  border: 1px solid #b0b0b0;
  border-radius: 10px;
  margin: 0 auto;
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
