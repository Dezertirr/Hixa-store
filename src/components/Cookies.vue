<template>
  <div class="cookie-control">
    <div class="cookie-message" v-if="showNotification">
      <div class="cookie-content">
        <p>Этот сайт использует куки. Принять?</p>
        <button @click="acceptCookies">Принять</button>
        <button @click="rejectCookies">Отменить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const showNotification = ref(true);

const acceptCookies = () => {
  showNotification.value = false;
  saveCookiesState(true);
};

const rejectCookies = () => {
  showNotification.value = false;
  saveCookiesState(false);
};

function getSavedCookiesState() {
  const savedState = localStorage.getItem('useCookies');
  return savedState !== null ? savedState === 'true' : true; // По умолчанию показываем уведомление
}

function saveCookiesState(state) {
  localStorage.setItem('useCookies', state.toString());
}

onMounted(() => {
  if (showNotification.value) {
    // Show the notification initially
    setTimeout(() => {
      showNotification.value = false;
    }, 20000);
  }
});
</script>

<style scoped>
.cookie-control {
  position: fixed;
  bottom: 20px;
  right: 20px;
  text-align: center;
  background: linear-gradient(to right, #013f48 50%, #15575e 70%);
  border: 1px solid #ccc;
  border-radius: 15px;
  z-index: 999;
}

.cookie-message {
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 10px;
}

.cookie-content {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
color: #ffffff;
}

.cookie-content p {
  margin: 0;
}

.cookie-content button {
  margin: 0 10px;
  padding: 10px ;
  background-color: #218590;
  border: 1px solid black;
  border-radius: 5px;
  font-family: 'Poppins', sans-serif;
}
.cookie-content button:hover,
.cookie-content button:focus {
  background-color: #2396a2;
}


</style>
