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
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { getAuth } from 'firebase/auth'

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
        this.$router.push('/') // Перенаправляем на главную страницу после успешной аутентификации
      } catch (error) {
        alert(`Login failed: ${error.message}`)
      }
    }
  }
}
</script>
