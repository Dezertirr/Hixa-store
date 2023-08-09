<template>
  <div>
    <h2>Registration</h2>
    <form @submit.prevent="register">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div>
        <label for="phone">Phone Number:</label>
        <input type="tel" id="phone" v-model="phone" required />
      </div>
      <div>
        <label for="city">City:</label>
        <input type="text" id="city" v-model="city" required />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { createUserWithEmailAndPassword, sendEmailVerification, getAuth } from 'firebase/auth'
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore'
import { notify } from "@kyvg/vue3-notification";

export default {
  data() {
    return {
      email: '',
      password: '',
      name: '',
      phone: '',
      city: ''
    }
  },
  methods: {
    async register() {
      try {
        const auth = getAuth()
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        )
        const user = userCredentials.user

        await sendEmailVerification(user)

        await this.saveUserData(user)
        notify({
    title: 'Succeful',
    text: 'Registration successful! Please check your email for verification.',
    type: 'success'
  });
      } catch (error) {
        notify({
    title: 'Error',
    text: `An error has occurred!
    ${error.message}`,
    type: 'error'
  });
      }
    },
    async saveUserData(user) {
      const db = getFirestore()
      const userRef = doc(collection(db, 'users'), user.uid)

      const userData = {
        name: this.name,
        phone: this.phone,
        city: this.city
      }

      await setDoc(userRef, userData)
    }
  }
}
</script>
