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
    <div v-if="user && user.order && user.order.cartItems && user.order.cartItems.length > 0">
      <h3>{{ $t('PersonalArea.titleOrderHis') }}</h3>
      <ul>
        <li>
          <p>{{ $t('PersonalArea.orderID') }}: {{ user.order.customerData.orderId }}</p>
          <p>{{ $t('PersonalArea.numItem') }}: {{ user.order.cartItems.length }}</p>
          <ul>
            <li v-for="item in user.order.cartItems" :key="item.id">
              <h4>{{ item.brand }} - {{ item.mark }} - {{ item.part }}</h4>
              <p>{{ $t('PersonalArea.code') }}: {{ item.code }}</p>
              <p>{{ $t('PersonalArea.price') }}: {{ item.price }}</p>
              <p>{{ $t('PersonalArea.value') }}: {{ item.value[locale] }}</p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div v-if="editingUser">
      <h3>{{ $t('PersonalArea.edit') }}</h3>
      <input class="edit_info_field" placeholder="Name" type="text" v-model="editedUser.name" />
      <input class="edit_info_field" placeholder="Phone" type="text" v-model="editedUser.phone" />
      <input class="edit_info_field" placeholder="City" type="text" v-model="editedUser.city" />
      <button class="save_changes" @click="saveChanges">{{ $t('PersonalArea.save') }}</button>
      <button class="cancel_changes" @click="cancelEdit">{{ $t('PersonalArea.cancel') }}</button>
    </div>
    <div v-else>
      <p>{{ $t('PersonalArea.hisEmpty') }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
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
      t
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
  align-items: start;
  margin-left: 14px;
  font-size: 20px;
}
.button_edit {
  margin-top: 10px;
  width: 100px;
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
  width: 100px;
  height: 30px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.cancel_changes {
  margin: 5px;
  width: 100px;
  height: 30px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
