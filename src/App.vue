<template>
  <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  
</template>

<script setup>
import { createApp, provide, onBeforeMount } from 'vue';
import { createPinia } from 'pinia';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import ListProducts from '@/components/ListProducts.vue';
import { RouterView } from 'vue-router';

// Create the Pinia instance
const pinia = createPinia();
provide('pinia', pinia);

// Import and use the store
import { useSearchStore } from '@/stores/counter';
const searchStore = useSearchStore();

// Set an initial search query
onBeforeMount(() => {
  searchStore.setSearch('Initial search query');
});

// Mount the app
const app = createApp({
  components: {
    Header,
    ListProducts,
  },
});
app.use(pinia);
app.mount('#app');
</script>

<style>
/* Your styles here */
</style>
