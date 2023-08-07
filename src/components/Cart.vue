<template>
  <div>
    <h2>{{ $t('Cart.title') }}</h2>
    <ul v-if="cartItems.length > 0">
      <li v-for="(item, index) in cartItems" :key="index">
        <h3 v-if="item">{{ item.brand }}</h3>
        <p v-if="item">{{ item.value }}</p>
      </li>
    </ul>
    <p v-else>{{ $t('Cart.empty') }}</p>

    <button @click="openModal">{{ $t('Cart.orderStart') }}</button>

    <div v-if="isModalOpen" class="modal">
      <h3>{{ $t('Cart.ordering') }}</h3>
      <label for="name">{{ $t('Cart.name') }}</label>
      <input type="text" id="name" v-model="customerData.name" required />

      <label for="phone">{{ $t('Cart.number') }}</label>
      <input type="text" id="phone" v-model="customerData.phone" required />

      <label for="city">{{ $t('Cart.city') }}</label>
      <input type="text" id="city" v-model="customerData.city" required />

      <button @click="submitOrder">{{ $t('Cart.orderStart') }}</button>
      <button @click="closeModal">Close Order</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, doc, updateDoc, addDoc } from 'firebase/firestore'

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
      }
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

    openModal() {
      this.isModalOpen = true
    },

    closeModal() {
      this.isModalOpen = false
    },

    async submitOrder() {
      this.customerData.orderId = Math.floor(Math.random() * 10000)
      const orderData = {
        cartItems: this.cartItems,
        customerData: this.customerData
      }

      try {
        const db = getFirestore()
        const user = getAuth().currentUser
        if (user) {
          const userRef = doc(collection(db, 'users'), user.uid)

          await updateDoc(userRef, {
            order: orderData
          })
        }

        const botToken = '6524682564:AAHEo46Uim-eagPSyYijx_5s1uAK4P3qExI'
        const chatId = '-938605598'

        const message = this.constructMessage(orderData)

        const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`
        await axios.post(apiUrl, {
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'Взять заказ на обработку',
                  callback_data: 'take_order'
                }
              ]
            ]
          }
        })

        this.closeModal()
        this.customerData = {
          name: '',
          phone: '',
          city: '',
          orderId: ''
        }
      } catch (error) {
        console.error('Ошибка отправки заказа в Firestore:', error)
      }
    },

    constructMessage(orderData) {
      let message = `<b>Новый заказ</b>\n\n`
      message += `<b>Идентификатор заказа:</b> ${orderData.customerData.orderId}\n`
      message += `<b>Имя:</b> ${orderData.customerData.name}\n`
      message += `<b>Телефон:</b> ${orderData.customerData.phone}\n`
      message += `<b>Город:</b> ${orderData.customerData.city}\n\n`
      message += '<b>Список товаров:</b>\n'
      for (const item of orderData.cartItems) {
        message += `- ${item.brand}: ${item.value}\n`
      }
      return message
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
