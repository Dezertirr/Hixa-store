<template>
  <header class="header">
    <div class="sideBar">
      <ul class="headerMainNav">
        <li class="headerNavItem">
          <router-link to="#footer" class="headerNatItemBtn" @click="scrollToSection('footer')">
  {{ $t('ourAddress') }}
</router-link>
</li>
<li class="headerNavItem">
<router-link to="#footer" class="headerNatItemBtn" @click="scrollToSection('footer')">
  {{ $t('workingHours') }}
</router-link>
</li>
<li class="headerNavItem">
  <a  class="headerNatItemBtn" @click="goToInformation(1)">
    {{ $t('delivery') }}
  </a>
</li>
<li class="headerNavItem">
  <a  class="headerNatItemBtn" @click="goToInformation(2)">
    {{ $t('payment') }}
  </a>
</li>
      </ul>
      <ul class="headerNavSec">
        <li class="headerNavSecItem">
          <a class="langSelect">{{ $t('language') }}</a>
        </li>

        <li class="language" @click="changeLanguage('en')">{{ $t('languages.english') }}</li>
        <li class="language" @click="changeLanguage('pl')">{{ $t('languages.polish') }}</li>
        <li class="language" @click="changeLanguage('de')">{{ $t('languages.german') }}</li>
        <li class="language" @click="changeLanguage('hu')">{{ $t('languages.hungarian') }}</li>
        <li class="language" @click="changeLanguage('uk')">{{ $t('languages.ukrainian') }}</li>

        <li class="headerNavSecItem">
          <router-link v-if="isLoggedIn" class="personalArea" :to="{ name: 'personal-area' }">
            {{ $t('personalArea') }}
          </router-link>
          <button v-if="isLoggedIn" class="personalArea_logout" @click="logout">
            {{ $t('logout') }}
          </button>
          <div v-else>
            <button class="btnAuth" @click="goToLogin">{{ $t('login') }}</button>
            <button class="btnAuth" @click="goToRegistration">{{ $t('registration') }}</button>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <div class="SearchLine">
        <a @click="backMainPage" class="logo"><img class="logo" src="@/images/logo.svg" /></a>
        <form @submit.prevent="searchStart">
          <input v-model="searchValue" :placeholder="$t('searchPlaceholder')" class="searchInput" />
          <button type="submit" class="searchBtn">{{ $t('searchButton') }}</button>
        </form>
        <button @click="goToCart" class="cartBtn">
          <img src="@/images/shopping-basket.svg" />
        </button>
      </div>
      <Catalogs></Catalogs>
    </div>
  </header>
</template>

<script>
import { ref, onMounted, computed, watch, provide } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import Catalogs from './Catalogs.vue'
import { fetchProducts } from '@/services/ProductAPI'
import { useSearchStore } from '../stores/counter'
import { useRouter } from 'vue-router'

import { useI18n } from 'vue-i18n'
import { notify } from '@kyvg/vue3-notification'

export default {
  setup() {
    const search = ref('')
    const searchStore = useSearchStore()
    const router = useRouter()
    const searchValue = ref('')
    const isLoggedIn = ref(false)
    const userDisplayName = ref('')
    const { t, locale } = useI18n()

    const goToCart = () => {
      router.push('/cart')
    }

    const filteredData = computed(() => {
      const searchText = searchStore.getSearch().toLowerCase()
      return filteredData.value.filter((item) => item.name.toLowerCase().includes(searchText))
    })

    const goToLogin = () => {
      router.push('/login')
    }

    const goToRegistration = () => {
      router.push('/register')
    }

    const goToInformation = (index) => {
      router.push({ path: 'Info' });
      
    };

    const scrollToSection = (sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    };

    onMounted(() => {
      search.value = searchStore.getSearch()
    })

    const logout = async () => {
      try {
        await signOut(auth)

        isLoggedIn.value = false
        userDisplayName.value = ''

        router.push('/login')
        localStorage.removeItem('user')
        notify({
          title: `Goodbay`,
          text: `Logout succeful`,
          type: 'success'
        })
      } catch (error) {
        notify({
          title: `Error`,
          text: `Logout error! ${error}`,
          type: 'success'
        })
      }
    }

    watch(search, (newValue) => {
      searchStore.setSearch(newValue)
    })

    const searchStart = async () => {
  const query = searchValue.value;
  if (query === '') {
    notify({
      title: `Warning`,
      text: `Search engine cannot be empty`,
      type: 'warning'
    });
  } else {
    try {
      const products = await fetchProducts(); // Получаем список продуктов из API
      console.log(products); // Убедитесь, что данные загружены корректно

      const searchText = query.toLowerCase();
      const filteredProducts = products.filter(item => {
        if (typeof item.brand === 'string') {
          return item.brand.toLowerCase().includes(searchText);
        }
        return false;
      });

      if (filteredProducts.length === 0) {
        notify({
          title: `No results`,
          text: `No products found`,
          type: 'warning'
        });
      } else {
        // Переход на страницу Catalog с передачей параметра поиска
        router.push({ path: 'Catalog', query: { search: query } });
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      notify({
        title: `Error`,
        text: `Error fetching products`,
        type: 'error'
      });
    }
  }
};


    const backMainPage = () => {
      router.push('/')
    }

    const testClick = () => {
      console.log('hi')
    }

    const changeLanguage = (changeLang) => {
      locale.value = changeLang; 
      localStorage.setItem('lang', changeLang); 
    };

    provide('filteredData', filteredData)
    provide('isLoggedIn', isLoggedIn)
    provide('userDisplayName', userDisplayName)

    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      isLoggedIn.value = user !== null
      if (user) {
        userDisplayName.value = user.displayName
      } else {
        userDisplayName.value = ''
      }
    })

    const showLogin = () => {
      isLogined.value = true
    }

    const loginSuccess = () => {
      isLogined.value = false
    }

    return {
      search,
      searchStore,
      router,
      searchValue,
      isLoggedIn,
      userDisplayName,
      goToCart,
      filteredData,
      goToLogin,
      goToRegistration,
      logout,
      searchStart,
      backMainPage,
      testClick,
      changeLanguage,
      scrollToSection,
      goToInformation
    }
  },
  components: {
    Catalogs
  }
}
</script>
<style scoped>
.language {
  text-align: center;
  justify-content: center;
  cursor: pointer;
  padding: 8px 8px;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-size: 12px;
  color: #ffffff;
  transition: ease-in-out 0.4s;
}
@media only screen and (min-width: 1200px) {
  .language {
  text-align: center;
  justify-content: center;
  cursor: pointer;
  padding: 10px 10px;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  transition: ease-in-out 0.4s;
}
}
li {
  list-style: none;
}
.header {
}
.sideBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, #013f48 50%, #15575e 70%);
  color: #ffffff;
  height: 50px;
}
.headerMainNav {
  display: flex;
  height: 50px;
}

.headerNavItem {
  list-style: none;
  display: flex;
  align-items: center;
  border-right: 1px solid;
}

.headerNatItemBtn {
  padding: 12px 4px;
  background: inherit;
  border: 0;
  color: #ffffff;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-size: 12px;
  margin: 0;
  transition: ease-in-out 0.4s;
  cursor: pointer;
}
@media only screen and (min-width: 1200px) {
  .headerNatItemBtn{ 
    padding: 15px 10px;
    font-weight: 400;
    
  }
}

.headerNatItemBtn:hover,
.headerNatItemBtn:focus {
  background: #027081;
}

.headerNavSec {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: center;
  align-items: center;
}

.headerNavSecItem {
  list-style: none;

  color: #bdb9b9;

}

.langSelect {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 4px;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-size: 12px;
  color: #ffffff;
}

@media only screen and (min-width: 1200px) {
  .langSelect {
    padding: 5px 5px;
    font-weight: 400;
  font-size: 14px;
  }
}

.personalArea {
}
.btnAuth {
  background: #013f48;
  border: none;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-size:12px ;
  color: #ffffff;
  padding: 16px 8px;
  margin: 0 5px 0 0;
  cursor: pointer;
  transition: ease-in-out 0.4s;
}
@media only screen and (min-width: 1200px) {
  .btnAuth {
    font-weight: 400;
padding: 15px;
margin: 0 10px 0 10px;
    
  }
}

.btnAuth:hover,
.btnAuth:focus {
  background: #027081;
}

.logo {
  height: 50px;

  cursor: pointer;
}
@media only screen and (min-width: 1200px) {
   .logo {
    height: 72px;
  }
}

.SearchLine {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 15px;
}

.searchInput {
  width: 300px;
  height: 30px;
  border: 0;
  border-radius: 5px;
  padding-left: 10px;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
}

@media only screen and (min-width: 1200px) {
  .searchInput {
    width: 400px;
  height: 35px;
padding-left: 15px;
font-weight: 400;
  }
}
.searchInput:hover,
.searchInput:focus {
  outline: none;
}
.searchBtn {
  height: 32px;
  width: 58px;
  margin-left: -57px;
  border-radius: 0 5px 5px 0;
  background: #027081;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-size: 12px;
  color: #ffffff;
  border: 0;
  cursor: pointer;
  transition: ease-in-out 0.4s;
}
@media only screen and (min-width: 1200px) {
  .searchBtn {
    height: 37px;
width: 58px;
margin-left: -57px;
  font-weight: 300;
  }
}
.searchBtn:focus,
.searchBtn:hover {
  background: #0391a7;
}

.cartBtn {
  border: 0;
  background: none;
  cursor: pointer;
  transition: ease-in-out 0.4s;
  height: 30px;
}
@media only screen and (min-width: 1200px) {
  .cartBtn{
    height: 34px;
  }
}
.cartBtn:hover,
.cartBtn:focus {
  scale: 1.25;
}
.personalArea {
  text-decoration: none;
  color: white;
  cursor: pointer;
  font-size: 12px;
}
@media only screen and (min-width: 1200px) {
  .personalArea {
    font-size: 14px;
  }
}
.personalArea_logout {
  padding: 10px;
  color: white;
  cursor: pointer;
  background: #013f48;
  border-color: transparent;
  padding: 15px 8px;
  margin: 0 10px 0 10px;

}
@media only screen and (min-width: 1200px) {
.personalArea_logout{

  margin: 0 10px 0 10px;
  padding: 10px;
  }
}
.personalArea_logout:hover {
  background: #027081;
}
</style>
