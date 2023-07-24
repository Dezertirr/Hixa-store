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

    <button @click="openModal">Отправить заказ</button>

    <div v-if="isModalOpen" class="modal">
      <h3>Оформление заказа</h3>
      <label for="name">Имя:</label>
      <input type="text" id="name" v-model="customerData.name" required />

      <label for="phone">Телефон:</label>
      <input type="text" id="phone" v-model="customerData.phone" required />

      <label for="city">Город:</label>
      <input type="text" id="city" v-model="customerData.city" required />

      <button @click="submitOrder">Отправить заказ</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      cartItems: [],
      isModalOpen: false,
      customerData: {
        name: '',
        phone: '',
        city: '',
        orderId: ''
      },
      buttonText: 'Взять заказ на обработку',
      isOrderProcessed: false
    }
  },
  mounted() {
    this.loadCartItems()
  },
  methods: {
    loadCartItems() {
      const storedItems = JSON.parse(localStorage.getItem('cart')) || []
      this.cartItems = storedItems
    },

    takeOrder() {
      this.openModal()
    },

    openModal() {
      this.isModalOpen = true
    },

    closeModal() {
      this.isModalOpen = false
    },

    async submitOrder() {
      // Генерируем идентификатор заказа
      this.customerData.orderId = Math.floor(Math.random() * 10000)

      // Здесь вы можете отправить заказ в ваше приложение или обработать его как вам нужно

      // Обновляем текст кнопки на "Обработано"
      this.buttonText = 'Обработано'

      // Помечаем заказ как обработанный
      this.isOrderProcessed = true

      this.closeModal()
      this.customerData = {
        name: '',
        phone: '',
        city: '',
        orderId: ''
      }
    }
  }
}
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.modal h3 {
  margin-bottom: 10px;
}

.modal label {
  display: block;
  margin-bottom: 5px;
}

.modal input {
  margin-bottom: 10px;
  padding: 5px;
}

.modal button {
  padding: 8px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.modal button:hover {
  background-color: #0056b3;
}
</style>
