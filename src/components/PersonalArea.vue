<template>
  <div>
    <h2>{{ $t('PersonalArea.title') }}</h2>
    <div v-if="user" class="info_user">
      <h3 class="">{{ $t('PersonalArea.userInfo') }}</h3>
      <p>{{ $t('PersonalArea.name') }}: {{ user.name }}</p>
      <p>{{ $t('PersonalArea.phone') }}: {{ user.phone }}</p>
      <p>{{ $t('PersonalArea.city') }}: {{ user.city }}</p>
      <button class="button_edit" @click="editUser">{{ $t('PersonalArea.edit') }}</button>
    </div>
    <div v-if="user && user.history">
      <h3 class="historyTitle">{{ $t('PersonalArea.titleOrderHis') }}</h3>
      <ul class="historyList">
        <!-- Перебираем истории заказов -->
        <li v-for="(historyItem, index) in user.history" :key="'history-' + index">
          <div class="historyInfo">
            <p>{{ $t('PersonalArea.orderID') }}: {{ historyItem.customerData.orderId }}</p>
          </div>

        </li>
      </ul>
    </div>
    <div v-else class="history_cart">
      <p>{{ $t('PersonalArea.hisEmpty') }}</p>
    </div>

    <div v-if="editingUser" class="edit_data_user">
      <h3>{{ $t('PersonalArea.edit') }}</h3>
      <input class="edit_info_field" placeholder="Name" type="text" v-model="editedUser.name" />
      <input class="edit_info_field" placeholder="Phone" type="text" v-model="editedUser.phone" />
      <input class="edit_info_field" placeholder="City" type="text" v-model="editedUser.city" />
      <button class="save_changes" @click="saveChanges">{{ $t('PersonalArea.save') }}</button>
      <button class="cancel_changes" @click="cancelEdit">{{ $t('PersonalArea.cancel') }}</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore'
import { useI18n } from 'vue-i18n'
import { notify } from '@kyvg/vue3-notification'

export default {
  setup() {
    const user = ref(null)
    const editingUser = ref(false)
    const editedUser = ref({})
    const { t, locale } = useI18n()
    onMounted(async () => {
      await fetchUserData()
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        user.value = JSON.parse(savedUser)
      }
    })

    const getQuantityByCode = (cartItems, code) => {
    const itemsWithSameCode = cartItems.filter(item => item.code === code);
    return itemsWithSameCode.length;
  };
  const shouldShowItem = (cartItems, currentItem, currentIndex) => {
  if (!currentItem) {
    return false; // Если currentItem не существует, скрываем элемент
  }
  for (let i = 0; i < currentIndex; i++) {
    if (cartItems[i].code === currentItem.code) {
      return false; // Скрыть повторяющийся товар в пределах данной записи
    }
  }
  return true; // Показать уникальный товар в пределах данной записи
};

    const processedCartItems = computed(() => {
      if (!user.value || !user.value.order || !user.value.order.cartItems) {
        return []
      }

      const cartItems = user.value.order.cartItems
      const groupedItems = {}

      cartItems.forEach((item) => {
        const key = item.code
        if (!groupedItems[key]) {
          groupedItems[key] = {
            ...item,
            quantity: 1,
            total: item.price
          }
        } else {
          groupedItems[key].quantity += 1
          groupedItems[key].total += item.price
        }
      })

      return Object.values(groupedItems)
    })

    const totalPrice = computed(() => {
      if (!processedCartItems.value) {
        return 0
      }

      return processedCartItems.value.reduce((total, item) => total + item.total, 0)
    })

    const fetchUserData = async () => {
      const auth = getAuth()
      const db = getFirestore()
      const currentUser = auth.currentUser
      if (currentUser) {
        const userRef = doc(collection(db, 'users'), currentUser.uid)
        const userDoc = await getDoc(userRef)

        if (userDoc.exists()) {
          localStorage.setItem('user', JSON.stringify(userDoc.data()))
        } else {
          console.log('User data not found in Firestore')
        }
      }
    }

    const editUser = () => {
      editingUser.value = true
      editedUser.value = { ...user.value }
    }

    const saveChanges = () => {
      user.value = { ...editedUser.value }
      localStorage.setItem('user', JSON.stringify(editedUser.value))
      editingUser.value = false
      notify({
        title: 'Edit succesful',
        type: 'success'
      })
    }

    const cancelEdit = () => {
      editingUser.value = false
    }

    return {
      user,
      editingUser,
      editedUser,
      editUser,
      saveChanges,
      cancelEdit,
      locale,
      t,
      processedCartItems,
      totalPrice,
      getQuantityByCode,
      shouldShowItem
    }
  }
}
</script>
<style>
body {
  min-height: 100vh;
  flex: 1;
}
.info_user {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 14px;
  font-size: 20px;
}
.button_edit {
  margin-top: 10px;
  min-width: 100px;
  height: 30px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.edit_info_field {
  margin: 5px;
  width: 200px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 5px;
  font-size: 16px;
}
.save_changes {
  margin: 5px;
  min-width: 100px;
  height: 30px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.cancel_changes {
  margin: 5px;
  min-width: 100px;
  height: 30px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.history_cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 14px;
  font-size: 20px;
}

.historyTitle {
  display: flex;
  justify-content: center;
  margin: 50px 0 0 0;
}

.historyList {
  display: flex;
  list-style: none;
  justify-content: space-around;
      flex-direction: column;
    align-items: center;
}

.historyInfo {
  display: flex;
  justify-content: space-between;
}
.historyTR {
}

.historyTD {
  border: 1px solid black;
}

.edit_data_user {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
