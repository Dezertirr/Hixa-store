<template>
  <div>
    <h1>{{ $t("ThisMainPage") }}</h1>
    <router-view></router-view>

    <Slider></Slider>
    <MainCatalog></MainCatalog>
  </div>
</template>

<script>
import { ref } from 'vue'
import Slider from '../components/Slider.vue'
import MainCatalog from '../components/MainCatalog.vue'





export default {
  components: {
    Slider,
    MainCatalog
  },
  data() {
    return {
      isLoggedIn: false // Статус логина
    }
  },
  created() {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    this.isLoggedIn = isLoggedIn === 'true' // Проверяем статус логина из localStorage
  },
  methods: {
    goToLogin() {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style></style>
