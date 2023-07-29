<template>
  <header class="header">
    <div class="sideBar">
      <ul class="headerMainNav">
        <li class="headerNavItem">
          <button type="button" @click="testClick" class="headerNatItemBtn">{{ $t('ourAddress') }}</button>
        </li>
        <li class="headerNavItem">
          <button type="button" @click="testClick" class="headerNatItemBtn">{{ $t('workingHours') }}</button>
        </li>
        <li class="headerNavItem">
          <button type="button" @click="testClick" class="headerNatItemBtn">{{ $t('delivery') }}</button>
        </li>
        <li class="headerNavItem">
          <button type="button" @click="testClick" class="headerNatItemBtn">{{ $t('payment') }}</button>
        </li>
        <li class="headerNavItem">
          <button type="button" @click="testClick" class="headerNatItemBtn">{{ $t('reviews') }}</button>
        </li>
      </ul>
      <ul class="headerNavSec">
        <li class="headerNavSecItem"><a class="langSelect">{{ $t('language') }}</a></li>
        <li @click="changeLanguage('en')">{{ $t('languages.english') }}</li>
        <li @click="changeLanguage('pl')">{{ $t('languages.polish') }}</li>
        <li @click="changeLanguage('de')">{{ $t('languages.german') }}</li>
        <li @click="changeLanguage('hu')">{{ $t('languages.hungarian') }}</li>
        <li @click="changeLanguage('uk')">{{ $t('languages.ukrainian') }}</li>
        <li class="headerNavSecItem"><a>{{ $t('theme') }}</a></li>
        <li class="headerNavSecItem">
          <a v-if="isLoggedIn" class="personalArea" @click="goToPersonalArea">{{ $t('personalArea') }}</a>
          <button v-if="isLoggedIn" class="personalArea" @click="logout">{{ $t('logout') }}</button>
          <div v-else>
            <button @click="goToLogin">{{ $t('login') }}</button>
            <button @click="goToRegistration">{{ $t('registration') }}</button>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <div class="SearchLine">
        <a @click="backMainPage"><img src="@/images/logo.svg" /></a>
        <form @submit.prevent="searchStart">
          <input v-model="searchValue" :placeholder="$t('searchPlaceholder')" class="searchInput" />
          <button type="submit" class="searchBtn">{{ $t('searchButton') }}</button>
        </form>
        <button @click="goToCart"><img src="@/images/shopping-basket.svg" /></button>
      </div>
      <Catalogs></Catalogs>
    </div>
  </header>
</template>

<script>
import { ref, onMounted, computed, watch, provide } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import Catalogs from './Catalogs.vue';
import jsonArray from '../services/Catalog.json';
import { useSearchStore } from '../stores/counter';
import { useRouter } from 'vue-router';

import { useI18n } from 'vue-i18n';

export default {
  setup() {
    const search = ref('');
    const jsonData = jsonArray;
    const searchStore = useSearchStore();
    const router = useRouter();
    const searchValue = ref('');
    const isLoggedIn = ref(false);
    const isLogined = ref(false);
    const { t, i18n } = useI18n()

    const goToCart = () => {
      router.push('/cart');
    };
    const filteredData = computed(() => {
      const searchText = searchStore.getSearch().toLowerCase();
      return jsonData.filter((item) => item.name.toLowerCase().includes(searchText));
    });
    const goToLogin = () => {
      router.push('/login');
    };

    const goToRegistration = () => {
      router.push('/register');
    };
    onMounted(() => {
      search.value = searchStore.getSearch();
    });
    const logout = async () => {
      try {
        await signOut(auth);

        isLoggedIn.value = false;

        router.push('/login');
      } catch (error) {
        console.log('Ошибка при разлогине пользователя', error);
      }
    };
    watch(search, (newValue) => {
      searchStore.setSearch(newValue);
    });

    const searchStart = () => {
      const query = searchValue.value;
      router.push({ path: 'Catalog', query: { search: query } });
    };

    const backMainPage = () => {
      router.push('/');
    };

    const testClick = () => {
      console.log('hi');
    };



    const changeLanguage = (changeLang) => {
      // Используйте метод locale для установки языка
      i18n.locale = changeLang
    };

    provide('filteredData', filteredData);
    provide('isLoggedIn', isLoggedIn);
    provide('isLogined', isLogined);

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      isLoggedIn.value = user !== null;
      isLogined.value = isLoggedIn.value ? false : true;
    });

    const showLogin = () => {
      isLogined.value = true;
    };

    const loginSuccess = () => {
      isLogined.value = false;
    };

    return {
      search,
      jsonData,
      searchStore,
      router,
      searchValue,
      isLoggedIn,
      isLogined,
      goToCart,
      filteredData,
      goToLogin,
      goToRegistration,
      logout,
      searchStart,
      backMainPage,
      testClick,
      changeLanguage,
      auth,
      showLogin,
      loginSuccess,
    };
  },
  components: {
    Catalogs,
  },
};
</script>
<style scoped>
.header {
}
.sideBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, #222222, #555555);
  color: #b0b0b0;
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
  border-left: 1px solid;
}

.headerNatItemBtn {
  padding: 10px;
  background: inherit;
  border: 0;
  color: #b0b0b0;
}

.headerNavSec {
  display: flex;
}

.headerNavSecItem {
  list-style: none;
  margin: 15px;
  color: #bdb9b9;
}

.langSelect {
}

.personalArea {
}

.SearchLine {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 15px;
}

.searchInput {
  width: 400px;
  height: 35px;
  border: 0;
  border-radius: 5px;
}
.searchBtn {
  height: 35px;
  background-color: var(--main-bg-color);
  border: 2px solid #b0b0b0;
  margin-left: -57px;
  border-radius: 5px;
}
</style>
