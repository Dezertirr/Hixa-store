<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
      <button @click="loginWithGoogle">Login with Google</button>
      <button @click="loginWithFacebook">Login with Facebook</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider
} from 'firebase/auth'
import { getAuth } from 'firebase/auth'
import { notify } from "@kyvg/vue3-notification";

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        const auth = getAuth()
        await signInWithEmailAndPassword(auth, this.email, this.password)
        alert('Login successful!')
        localStorage.setItem('isLoggedIn', 'true') // Сохраняем статус логина в localStorage
        this.$router.push('/')
        notify ({
          title: 'Login succesful',
          type: 'success'
        })
      } catch (error) {
        
        notify({
          title: 'Error!',
          text: `${error.message}`
        })
      }
    },
    async loginWithGoogle() {
      try {
        const auth = getAuth()
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        const user = result.user
        alert('Google login successful!')
        localStorage.setItem('isLoggedIn', 'true')

        const userData = {
          name: user.displayName,
          email: user.email
        }
        localStorage.setItem('user', JSON.stringify(userData))

        this.$router.push('/')
        notify ({
          title: 'Login succesful',
          type: 'success'
        })
        
      } catch (error) {
        notify({
          title: 'Error!',
          text: `${error.message}`
        })
      }
    },
    async loginWithFacebook() {
      try {
        const auth = getAuth()
        const provider = new FacebookAuthProvider()
        await signInWithPopup(auth, provider)
        alert('Facebook login successful!')
        localStorage.setItem('isLoggedIn', 'true')
        this.$router.push('/')
        notify ({
          title: 'Login succesful',
          type: 'success'
        })
      } catch (error) {
        notify({
          title: 'Error!',
          text: `${error.message}`
        })
      }
    }
  }
}
</script>
