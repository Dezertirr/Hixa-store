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
          <td class="cartTableItem">{{ item.value }}</td>
          <td class="cartTableItem">{{ item.quantity }}</td>
          <td class="cartTableItem">{{ item.price }}</td>

          <button @click="removeItem(item.brand)" class="submit_order">
            <img src="../images/bucket.svg" alt="" width="20">
          </button>
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
      <label for="city">Country </label>
      <input type="text" id="city" v-model="customerData.country" required />

      <button @click="submitOrder">{{ $t('Cart.orderStart') }}</button>
      <button class="close" @click="closeModal">Close Order</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, doc, updateDoc, addDoc, getDoc } from 'firebase/firestore'
import { useI18n } from 'vue-i18n'
import { notify } from '@kyvg/vue3-notification'

const cartItems = ref([])
const isModalOpen = ref(false)
const customerData = ref({
  name: '',
  phone: '',
  city: '',
  orderId: '',
  country:''
})

const { locale } = useI18n()
const totalPrice = ref(0)

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
      total += Number(price) // Добавление к общей стоимости
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
  let historyOrders = []

  try {
    const db = getFirestore()
    const user = getAuth().currentUser
    if (user) {
      const userRef = doc(collection(db, 'users'), user.uid)
      const userDoc = await getDoc(userRef)

      if (userDoc.exists()) {
        const userData = userDoc.data()

        if (userData.history) {
          userData.history.push(orderData)
        } else {
          userData.history = [orderData]
        }

        await updateDoc(userRef, {
          history: userData.history
        })
      }
    }
console.log(customerData.value)
    const botToken = '6524682564:AAGeWt9agggxSVVyUC9VD_IHAZKLSV52Ekg'
    const chatId = '-938605598'

    const message = constructMessage(orderData)


    const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    (async () => {
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
  cartItems.value = []
  totalPrice.value = 0
  localStorage.removeItem('cart')

}
function removeItem(brand) {
  // Отфильтровать элементы с другим brand
  cartItems.value = cartItems.value.filter((item) => item.brand !== brand)

  updateLocalStorage() // Обновить локальное хранилище после удаления элементов
}

function updateLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cartItems.value))
}

function constructMessage(orderData) {
  let message = `<b>Новый заказ</b>\n\n`
  message += `<b>Идентификатор заказа:</b> ${orderData.customerData.orderId}\n`
  message += `<b>Имя:</b> ${orderData.customerData.name}\n`
  message += `<b>Телефон:</b> ${orderData.customerData.phone}\n`
  message += `<b>Город:</b> ${orderData.customerData.city}\n\n`
  message += `<b>Cтрана:</b> ${orderData.customerData.country}\n\n`
  message += '<b>Список товаров:</b>\n'
  for (const item of orderData.cartItems) {
    message += `- ${item.brand}: ${item.value}\n`
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
  border-radius: 10px;
}
@media screen and (max-width: 600px) {
  .cart_container{
    width: 85%;
  }
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
  transition: ease-in-out 0.4s;
  margin: 10px 0 0 10px;
}
.submit_order:hover,
.submit_order:focus {
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



.cart_container {
  margin: 20px;
}

/* Style the table header */
.items th {
  background-color: #1d7d87;
  color: white;
  padding: 10px;
  text-align: left;
  border-radius: 0px 0px 0px 0px;
}

/* Style the table rows */



/* Style the table cells */
.items td {
  padding: 10px;

}

/* Style the remove button */
.submit_order {
  padding: 8px 15px;
  border-radius: 10px;
  text-transform: capitalize;
  background-color: #1d7d87; /* Change button color */
  color: white;
  border: none;
  cursor: pointer;
  transition: ease-in-out 0.4s;
  margin-left: 10px; /* Add some margin to separate buttons */
}

/* Add hover effect to remove button */
.submit_order:hover,
.submit_order:focus {
  background-color: #dc3545; /* Darker red */
}

/* Add some spacing between buttons */
.btnPlace button {
  margin-right: 10px;
}

/* Style the modal background */
.modal {
  background-color: rgba(0, 0, 0, 0.8);
}

/* Style the modal content */
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

/* Style the modal buttons */
.modal button {
  margin-top: 10px;
}


</style>
