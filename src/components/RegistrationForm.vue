<template>
  <h2>Registration</h2>
  <div class="auth_container">
    <form class="auth_form" @submit.prevent="register">
      <div class="input_container">
        <input
          class="input_field"
          type="email"
          id="email"
          v-model="email"
          required
          placeholder=" "
        />
        <label for="email">Email</label>
      </div>
      <div class="input_container">
        <input
          class="input_field"
          type="password"
          id="password"
          v-model="password"
          required
          placeholder=" "
        />
        <label for="password">Password</label>
      </div>
      <div class="input_container">
        <input class="input_field" type="text" id="name" v-model="name" required placeholder=" " />
        <label for="name">Name</label>
      </div>
      <div class="input_container">
        <input class="input_field" type="tel" id="phone" v-model="phone" required placeholder=" " />
        <label for="phone">Phone Number</label>
      </div>
      <div class="input_container">
        <input class="input_field" type="text" id="city" v-model="city" required placeholder=" " />
        <label for="city">City</label>
      </div>
      <button type="submit" class="button_auth">Register</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { createUserWithEmailAndPassword, sendEmailVerification, getAuth } from 'firebase/auth'
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore'
import { notify } from '@kyvg/vue3-notification'

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
        })
      } catch (error) {
        notify({
          title: 'Error',
          text: `An error has occurred!
    ${error.message}`,
          type: 'error'
        })
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
<style>
body {
  font-family: poppins;
}
h2 {
  text-align: center;
}
.auth_form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.auth_container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.input_field {
  width: 80%;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 5px;
  outline: none;
}
.input_container {
  position: relative;
  margin-bottom: 20px;
}
.input_container {
  position: relative;
  margin-bottom: 20px;
}

.input_field {
  font-size: 16px;
  width: 80%;
  padding: 10px;
  border: 1px solid #212b42;
  border-radius: 4px;
  transition: 0.3s;
}

.input_field + label {
  position: absolute;
  top: 10px;
  left: 10px;
  transition: 0.3s;
  pointer-events: none;
  color: #2d2d2d;
}

.input_field:focus + label,
.input_field:not(:placeholder-shown) + label {
  transform: translateY(-10px) translateX(-10px) scale(0.8);
  color: #15575e;
}

.input_field:focus {
  border-color: #15575e;
}
.button_auth {
  width: 100%;
  padding: 20px;
  color: white;
  background: #15575e;
  border-radius: 15px;
  border: transparent;
  transition: ease-in-out 0.3s;
}
.button_auth:hover,
.button_auth:focus {
  background: #259fac;
}
</style>
