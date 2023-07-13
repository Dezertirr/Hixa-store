<template>
    <div>
      <h1>This main Page</h1>
      <p>Please <router-link to="/register">register</router-link> to continue.</p>
    </div>
    <Slider></Slider>
  </template>
  
  <script>
 import Slider from '../components/Slider.vue';

export default {
  components: {
    Slider
  }
}
  </script>
  
  <style>

  </style>
  