<template>
  <div>
    <ul v-if="filteredData.length > 0" class="productList">
      <li v-for="(item) in filteredData" :key="item.id" class="productItem">
        <div @click="goToProduct(item)" class="productItem">
          <h3 class="productItemTitle">{{ item.brand }}</h3>
          <p class="productItemPhoto">Тут має бути фото</p>
          <p class="productItemText">{{ item.value }}</p>
          <BasketBtn></BasketBtn>
        </div>
      </li>
    </ul>
    <p v-else>Вибачте, такого товару в нас немає</p>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import jsonArray from '../services/Catalog.json';
import { useSearchStore } from '../stores/counter';
import { useRouter } from 'vue-router';
import BasketBtn from '@/components/BasketBtn.vue' 

export default {
  setup() {
    const searchStore = useSearchStore();
    const router = useRouter();

    const filteredData = computed(() => {
      const searchText = searchStore.getSearch().toLowerCase();
      return jsonArray.filter(item => item.name.toLowerCase().includes(searchText));
    });

const goToProduct = (item) => {
  router.push({ path: '/Product', query: { id: item.id } });
};
return {
      filteredData,
      goToProduct,
    };
  },
  components: {
    BasketBtn
  },
};

</script>


  
  <style scoped>
.productList{
  display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: space-around;
    list-style: none;
    margin: 15px 40px
}

.productItem{
  width: 250px;
    height: 400px;
    border: 1px solid #b0b0b0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: rgb(105,105,105);
background: linear-gradient(126deg, rgba(105,105,105,1) 0%, rgba(144,144,144,1) 88%);
    border-radius: 10px;
}

.productItemTitle{

}

.productItemPhoto {
  width: 225px;
  height: 200px;
  border: 1px solid #b0b0b0;
  border-radius: 10px;
}

.productItemText{
  margin: 0 15px;
}

.productItemBtn{
 height: 35px;
 width: 120px;
 margin: 15px;
 border-radius: 10px;
 box-shadow: none;
 border: 1px solid #b0b0b0;

}

  </style>
  