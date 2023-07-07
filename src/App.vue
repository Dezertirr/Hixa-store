<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'





</script>

<template>
<header>
  <ul>
        <li>Наша адреса</li>
        <li>Час роботи</li>
        <li>Доставка</li>
        <li>Оплата</li>
        <li>Відгуки</li>
    </ul>
    <ul>
        <li>Мова</li>
        <li>Валюта</li>
        <li>Особистий кабінет</li>
    </ul>
    <div>
        <div>logo</div>
        <div><form><input
        v-bind:value="searchElem" type="text" placeholder="Instrument"/>
      <button>Search</button>
    </form>
  </div>
        
        <div>basket logo</div>
    </div>
    <ul>
    <select name='Каталог'>
        <option>Audi</option>
        <option>BMW</option>
        <option>Ser</option>
    </select>
    <select name='Каталог'>
        <option>Audi</option>
        <option>BMW</option>
        <option>Ser</option>
    </select>
    <select name='Каталог'>
        <option>Audi</option>
        <option>BMW</option>
        <option>Ser</option>
    </select>
    <select name='Каталог'>
        <option>Audi</option>
        <option>BMW</option>
        <option>Ser</option>
    </select>
    <select name='Каталог'>
        <option>Audi</option>
        <option>BMW</option>
        <option>Ser</option>
    </select>
    <select name='Каталог'>
        <option>Audi</option>
        <option>BMW</option>
        <option>Ser</option>
    </select>
    <li>Курс $</li>
    </ul>
</header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
