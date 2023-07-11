<template>
  <div>
    <h1>This Catalog:{{ search }}</h1>
    <ul v-if="filteredData.length > 0">
      <li v-for="(item, index) in filteredData" :key="index">
        <p>{{ item.brand }}</p>
        <p>{{ item.value }}</p>
      </li>
    </ul>
    <p v-else>Вибачте такого товару в нас нема(</p>
  </div>
</template>
  
  <script>
import { ref, onMounted, watch, computed } from 'vue';
import jsonArray from '../services/Catalog.json';
import { useSearchStore } from '../stores/counter';

export default {
  setup() {
    const searchStore = useSearchStore();

    const filteredData = computed(() => {
      const searchText = searchStore.getSearch().toLowerCase();
      return jsonArray.filter(item => item.name.toLowerCase().includes(searchText));
    });

    return {
      filteredData
    };
  }
};
</script>


  
  <style scoped>
  /* Стили компонента */
  </style>
  