<template>
  <div class="cart_container">
    <h2>{{ $t('Cart.title') }}</h2>
    <table v-if="cartItems.length > 0" class="items">
      <thead>
        <tr>
          <th>{{ $t('Cart.brand') }}</th>
          <th>{{ $t('Cart.value') }}</th>
          <th>{{ $t('Cart.quantity') }}</th>
          <th>{{ $t('Cart.price') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cartItemsWithQuantity" :key="index">
          <td class="cartTableItem">{{ item.brand }}</td>
          <td class="cartTableItem">{{ item.value[locale] }}</td>
          <td class="cartTableItem">{{ item.quantity }}</td>
          <td class="cartTableItem">{{ item.price }}</td>

          <button @click="removeItem(index)" class="submit_order">{{ $t('Cart.remove') }}</button>
        </tr>
      </tbody>
    </table>
    <p v-else>{{ $t('Cart.empty') }}</p>

    <p v-if="cartItems.length > 0" class="total_price">
      <span>{{ $t('Cart.totalPrice') }}:</span> {{ totalPrice }}
    </p>
    <div class="btnPlace">
      <button class="submit_order" @click="clearCart">{{ $t('Cart.orderEnd') }}</button>
      <button class="submit_order" @click="openModal">{{ $t('Cart.orderStart') }}</button>
    </div>

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
import { ref, computed, onMounted } from 'vue'
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
const totalPrice = ref(0) // Шаг 1: Определение ref для общей стоимости

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

function groupItemsByBrand(items) {
  const groupedItems = {}
  for (const item of items) {
    if (!groupedItems[item.brand]) {
      groupedItems[item.brand] = []
    }
    groupedItems[item.brand].push(item)
  }
  return groupedItems
}

const cartItemsWithQuantity = computed(() => {
  const itemsWithQuantity = []
  const groupedItems = groupItemsByBrand(cartItems.value)
  let total = 0 // Инициализация общей стоимости

  for (const brand in groupedItems) {
    const items = groupedItems[brand]
    if (items.length > 1) {
      const totalQuantity = items.reduce((total, item) => total + 1, 0)
      const price = items[0].price * totalQuantity // Расчет общей стоимости для этого бренда
      total += price // Добавление к общей стоимости
      itemsWithQuantity.push({
        brand,
        value: items[0].value,
        quantity: totalQuantity,
        price: price
      })
    } else {
      total += items[0].price // Добавление к общей стоимости
      itemsWithQuantity.push({
        brand,
        value: items[0].value,
        quantity: 1,
        price: items[0].price
      })
    }
  }

  totalPrice.value = total // Обновление ref общей стоимости
  return itemsWithQuantity
})

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

    const botToken = '6524682564:AAGeWt9agggxSVVyUC9VD_IHAZKLSV52Ekg'
    const chatId = '-938605598'

    const message = constructMessage(orderData)

    const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`

    ;(async () => {
      try {
        const response = await axios.post(apiUrl, {
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

        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    })()

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
function clearCart() {
  cartItems.value = [] // Очищаем массив корзины
  totalPrice.value = 0 // Сбрасываем общую стоимость
  localStorage.removeItem('cart') // Удаляем корзину из локального хранилища
}
function removeItem(index) {
  const removedItem = cartItems.value.splice(index, 1)[0] // Удаляем продукт из корзины и получаем его
  const itemPrice = removedItem.price * removedItem.quantity // Рассчитываем стоимость удаленного продукта
  totalPrice.value -= itemPrice // Вычитаем стоимость удаленного продукта из общей стоимости
  updateLocalStorage() // Обновляем локальное хранилище
}

function updateLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cartItems.value)) // Обновляем данные в локальном хранилище
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
  border-collapse: collapse;
  align-items: center;
}

.cartTableItem {
  border: 1px solid black;
  border-collapse: collapse;
  padding: 0 0 0 10px;
  min-width: 60px;
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
  margin: 10px 0 0 10px;
}
.submit_order:hover {
  background-color: #259eac;
}
.modal button.close {
  background-color: #dc3545;
}
.total_price {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.total_price span {
  font-weight: bold;
  margin-right: 5px;
}

.btnPlace {
  display: flex;
  justify-content: center;
  gap: 15px;
}
</style>
