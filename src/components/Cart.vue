<template>
  <div class="cart_container">
    <h2>{{ $t('Cart.title') }}</h2>
    <ul v-if="cartItems.length > 0" class="items">
      <li v-for="(item, index) in cartItems" :key="index">
        <h3 v-if="item">{{ item.brand }}</h3>
        <p v-if="item">{{ item.value }}</p>
      </li>
    </ul>
    <p v-else>{{ $t('Cart.empty') }}</p>

    <button class="submit_order" @click="openModal">{{ $t('Cart.orderStart') }}</button>

    <div v-if="isModalOpen" class="modal">
      <h3>{{ $t('Cart.ordering') }}</h3>
      <label for="name">{{ $t('Cart.name') }}</label>
      <input type="text" id="name" v-model="customerData.name" required />

      <label for="phone">{{ $t('Cart.number') }}</label>
      <input type="text" id="phone" v-model="customerData.phone" required />

      <label for="city">{{ $t('Cart.city') }}</label>
      <input type="text" id="city" v-model="customerData.city" required />

      <button @click="submitOrder">{{ $t('Cart.orderStart') }}</button>
      <button class="close" @click="closeModal">Close Order</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, doc, updateDoc, addDoc } from 'firebase/firestore'
import { useI18n } from 'vue-i18n'
import { notify } from '@kyvg/vue3-notification'

const cartItems = ref([])
const isModalOpen = ref(false)
const customerData = ref({
  name: '',
  phone: '',
  city: '',
  orderId: ''
})

const { locale } = useI18n()

onMounted(() => {
  loadCartItems()
})

function loadCartItems() {
  const storedItems = JSON.parse(localStorage.getItem('cart')) || []
  cartItems.value = storedItems
}

function openModal() {
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

async function submitOrder() {
  customerData.value.orderId = Math.floor(Math.random() * 10000)
  const orderData = {
    cartItems: cartItems.value,
    customerData: customerData.value
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

    const botToken = '6524682564:AAFkKRbE_63m9PtEqLMvNC592VXeCY23EZM'
    const chatId = '-938605598'

    const message = constructMessage(orderData)

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

    notify({
      title: 'Successful',
      text: 'Order submitted successfully!',
      type: 'success'
    })

    closeModal()
    customerData.value = {
      name: '',
      phone: '',
      city: '',
      orderId: ''
    }
  } catch (error) {
    notify({
      title: 'Error',
      text: `Error! ${error.message}`
    })
  }
}

function constructMessage(orderData) {
  let message = `<b>Новый заказ</b>\n\n`
  message += `<b>Идентификатор заказа:</b> ${orderData.customerData.orderId}\n`
  message += `<b>Имя:</b> ${orderData.customerData.name}\n`
  message += `<b>Телефон:</b> ${orderData.customerData.phone}\n`
  message += `<b>Город:</b> ${orderData.customerData.city}\n\n`
  message += '<b>Список товаров:</b>\n'
  for (const item of orderData.cartItems) {
    message += `- ${item.brand}: ${item.value[locale.value]}\n`
  }
  return message
}
</script>

<style>
.cart_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%;
}
.items {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 70%;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
}

.modal h3 {
  margin-bottom: 10px;
}

.modal label {
  display: block;
  margin-bottom: 5px;
}

.modal input {
  font-size: 16px;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 10px;
}

.modal button {
  width: 200px;
  padding: 8px 15px;
  background-color: #1d7d87;
  color: white;
  padding: 15px;
  border-radius: 10px;
  gap: 20px;
  border: none;
  cursor: pointer;
}

.modal button:hover {
  background-color: #259eac;
}
.submit_order {
  padding: 15px;
  border-radius: 10px;
  text-transform: capitalize;
  background-color: #1d7d87;
  color: white;
  border: none;
  cursor: pointer;
  transition: ease-in-out 0.3s;
}
.submit_order:hover {
  background-color: #259eac;
}
.modal button.close {
  background-color: #dc3545;
}
</style>
