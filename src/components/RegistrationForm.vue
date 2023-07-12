<template>
    <div>
      <h2>Registration</h2>
      <form @submit.prevent="register">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { createUserWithEmailAndPassword } from 'firebase/auth';
  import { getAuth } from 'firebase/auth';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      async register() {
        try {
          const auth = getAuth();
          await createUserWithEmailAndPassword(auth, this.email, this.password);
          alert('Registration successful!');
        } catch (error) {
          alert(`Registration failed: ${error.message}`);
        }
      },
    },
  };
  </script>
  