<template>
  <button class="basketBtn" @click="addToCart">{{ $t('Buttons.Cart') }}</button>
  
</template>

<script>
export default {
  props: ['item']
}
</script>

<style>
.basketBtn {
  padding: 15px;
  margin: 15px;
  border-radius: 10px;
  text-transform: capitalize;
  background-color: #1d7d87;
  color: white;
  border: none;
  cursor: pointer;
  transition: ease-in-out 0.4s;
  width: 120px;
}
.basketBtn:focus,
.basketBtn:hover{
  background-color: #259eac;
}
</style>
