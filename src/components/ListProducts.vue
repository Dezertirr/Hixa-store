<template>
    <div>
      <input v-model="search" placeholder="Search">
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
      const search = ref('');
      const jsonData = jsonArray;
      const searchStore = useSearchStore();
  
      const filteredData = computed(() => {
        const searchText = search.value.toLowerCase();
        return jsonData.filter(item => item.name.toLowerCase().includes(searchText));
      });
  
      onMounted(() => {
        search.value = searchStore.getSearch();
      });
  
      watch(search, (newValue) => {
        searchStore.setSearch(newValue);
      });
  
      return {
        search,
        filteredData
      };
    }
  };
  </script>
  
  <style scoped>
  /* Стили компонента */
  </style>
  