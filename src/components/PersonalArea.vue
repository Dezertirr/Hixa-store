<template>
  <div>
    <h2>Personal Area</h2>
    <div v-if="user">
      <h3>User Information</h3>
      <p>Name: {{ user.name }}</p>
      <p>Phone: {{ user.phone }}</p>
      <p>City: {{ user.city }}</p>
      <button @click="editUser">Edit User Info</button>
    </div>
    <div v-if="user && user.order && user.order.cartItems && user.order.cartItems.length > 0">
      <h3>Order History</h3>
      <ul>
        <li>
          <p>Order ID: {{ user.order.customerData.orderId }}</p>
          <p>Number of Items: {{ user.order.cartItems.length }}</p>
          <ul>
            <li v-for="item in user.order.cartItems" :key="item.id">
              <h4>{{ item.brand }} - {{ item.mark }} - {{ item.part }}</h4>
              <p>Code: {{ item.code }}</p>
              <p>Price: {{ item.price }}</p>
              <p>Value: {{ item.value }}</p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No order history available.</p>
    </div>
    <div v-if="editingUser">
      <h3>Edit User Info</h3>
      <input type="text" v-model="editedUser.name" />
      <input type="text" v-model="editedUser.phone" />
      <input type="text" v-model="editedUser.city" />
      <button @click="saveChanges">Save Changes</button>
      <button @click="cancelEdit">Cancel</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore'

export default {
  setup() {
    const user = ref(null)
    const editingUser = ref(false)
    const editedUser = ref({})

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
      cancelEdit
    }
  }
}
</script>
