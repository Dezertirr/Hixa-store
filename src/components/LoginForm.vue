<template>
  <h2>Login</h2>
  <div class="auth_container">
    <form class="auth_form" @submit.prevent="login">
      <div class="input_container">
        <input
          class="input_field"
          type="email"
          id="email"
          v-model="email"
          required
          placeholder=" "
        />
        <label for="email">Email:</label>
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
        <label for="password">Password:</label>
      </div>
      <div class="button_login">
        <button type="submit" class="button_auth">Login</button>
        <button @click="loginWithGoogle" class="button_auth soc">Login with Google</button>
        <button @click="loginWithFacebook" class="button_auth soc">Login with Facebook</button>
      </div>
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
import { notify } from '@kyvg/vue3-notification'

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
        notify({
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
        notify({
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
        notify({
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
  align-items: center;
}
.auth_container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.input_field {
  font-size: 16px;
  width: 90%;
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
  padding: 20px;
  color: white;
  background: #15575e;
  border-radius: 15px;
  border: transparent;
  transition: ease-in-out 0.3s;
}
.button_auth.soc {
  background: #778183;
}
.button_auth:hover,
.button_auth:focus {
  background: #1d7d87;
  cursor: pointer;
}
.button_login {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
