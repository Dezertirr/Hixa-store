<template>
    <div>
      <ul>
        <li v-for="(item, index) in filteredData" :key="index">
          <p>{{ item.name}}</p>
          <p>{{item.value}}</p>
        </li>
      </ul>
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
  