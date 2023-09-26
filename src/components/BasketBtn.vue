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
  padding: 10px;
  margin: 10px;
  border-radius: 7px;
background: #FF8049;
  text-transform: capitalize;
  display: flex;
    justify-content: center;
    align-items: center;
  color: white;
  border: none;
  cursor: pointer;
  transition: ease-in-out 0.4s;
  width: 105px;
height: 35px;
}
@media only screen and (min-width: 1200px) {
  .basketBtn  {
    padding: 15px;
  margin: 15px;
  width: 120px;
  }
}
.basketBtn:focus,
.basketBtn:hover{
  background-color: #259eac;
}
</style>
