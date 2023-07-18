<template>
  <button class="basketBtn" @click="addToCart">До корзини</button>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style>
.basketBtn {
  height: 35px;
  width: 120px;
  margin: 15px;
  border-radius: 10px;
  box-shadow: none;
  border: 1px solid #b0b0b0;
}
</style>
