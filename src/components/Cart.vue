<template>
  <div>
    <h2>Корзина</h2>
    <ul v-if="cartItems.length > 0">
      <li v-for="(item, index) in cartItems" :key="index">
        <h3 v-if="item">{{ item.brand }}</h3>
        <p v-if="item">{{ item.value }}</p>
      </li>
    </ul>
    <p v-else>Корзина пуста</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: []
    }
  },
  mounted() {
    this.loadCartItems()
  },
  methods: {
    loadCartItems() {
      const storedItems = JSON.parse(localStorage.getItem('cart')) || []
      this.cartItems = storedItems
    }
  }
}
</script>

<style>
/* Стили для отображения товаров в корзине */
</style>
