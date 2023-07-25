<template>
  <div class="catalogs">
    <!-- Catalog 1 -->
    <div @mouseenter="showSpoiler = true" class="spoiler-trigger">
      <div
        v-if="showSpoiler && activeCatalog === 'Каталог'"
        class="CatalogBig"
        @mouseleave="showSpoiler = false"
      >
        <button 
        v-for="(catalog, index) in catalogs" 
        :key="index" 
        @click="catalogSelect(catalog)">
          {{ catalog }}
        </button>
      </div>
    </div>

    <a
      class="CatalogAll"
      @mouseenter=";(showSpoiler = true), (activeCatalog = 'Каталог')"
      @mouseleave="showSpoiler = false"
    >
      Каталог
    </a>
    <!-- Catalog 2 -->
    <div @mouseenter="showSpoiler = true" class="spoiler-trigger">
      <div
        v-if="showSpoiler && activeCatalog === 'Гідроблоки'"
        class="CatalogBig"
        @mouseleave="showSpoiler = false"
      >
        <button
          v-for="(hydroblock, index) in hydroblocksCat"
          :key="index"
          @click="catalogSelect(hydroblock)"
        >
          {{ hydroblock }}
        </button>
      </div>
    </div>
    <a
      class="CatalogAll"
      @mouseenter=";(showSpoiler = true), (activeCatalog = 'Гідроблоки')"
      @mouseleave="showSpoiler = false"
    >
      Запчастини для гідроблоків
    </a>
    <div @mouseenter="showSpoiler = true" class="spoiler-trigger">
      <div
        v-if="showSpoiler && activeCatalog === 'Охолодження'"
        class="CatalogBig"
        @mouseleave="showSpoiler = false"
      >
        <button
          v-for="(filtration, index) in filtrationCat"
          :key="index"
          @click="catalogSelect(filtration)"
        >
          {{ filtration }}
        </button>
      </div>
    </div>
    <a
      class="CatalogAll"
      @mouseenter=";(showSpoiler = true), (activeCatalog = 'Охолодження')"
      @mouseleave="showSpoiler = false"
    >
      Охолодження та фільтрація
    </a>
    <div @mouseenter="showSpoiler = true" class="spoiler-trigger">
      <div
        v-if="showSpoiler && activeCatalog === 'Інструмент та обладнання'"
        class="CatalogBig"
        @mouseleave="showSpoiler = false"
      >
        <button
          v-for="(instrument, index) in instrumentCat"
          :key="index"
          @click="catalogSelect(instrument)"
        >
          {{ instrument }}
        </button>
      </div>
    </div>
    <a
      class="CatalogAll"
      @mouseenter=";(showSpoiler = true), (activeCatalog = 'Інструмент та обладнання')"
      @mouseleave="showSpoiler = false"
    >
      Інструмент та обладнання
    </a>

    <div @mouseenter="showSpoiler = true" class="spoiler-trigger">
      <div
        v-if="showSpoiler && activeCatalog === 'Ремонт АКПП'"
        class="CatalogBig"
        @mouseleave="showSpoiler = false"
      >
        <button v-for="(repair, index) in repairCat" :key="index" @click="catalogSelect(repair)">
          {{ repair }}
        </button>
      </div>
    </div>
    <a
      class="CatalogAll"
      @mouseenter=";(showSpoiler = true), (activeCatalog = 'Ремонт АКПП')"
      @mouseleave="showSpoiler = false"
    >
      Ремонт АКПП
    </a>
    <div @mouseenter="showSpoiler = true" class="spoiler-trigger">
      <div
        v-if="showSpoiler && activeCatalog === 'Інформація'"
        class="CatalogBig"
        @mouseleave="showSpoiler = false"
      >
        <button
          v-for="(information, index) in informationCat"
          :key="index"
          @click="catalogSelect(information)"
        >
          {{ information }}
        </button>
      </div>
    </div>
    <a
      class="CatalogAll"
      @mouseenter=";(showSpoiler = true), (activeCatalog = 'Інформація')"
      @mouseleave="showSpoiler = false"
    >
      Інформація
    </a>
    <p class="headerNavSecItem">Курс $: <CurrentCourse></CurrentCourse> UAH</p>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useSearchStore } from '../stores/counter'
import { useRouter } from 'vue-router'
import CurrentCourse from '@/components/CurrentCourse.vue'
import exchangeCourse from '@/services/exchangeCourse'

export default {
  setup() {
    const showSpoiler = ref(false)
    const activeCatalog = ref(null)
    const searchValue = ref('')
    const searchStore = useSearchStore()
    const router = useRouter()
    const course = ref(0)


    const catalogs = [
      'AISIN WARNER',
      'ALASON',
      'AUDI, VOLKSWAGEN, SKODA',
      'BMW',
      'CHINESE CARS',
      'CHRYSLER, DODGE',
      'CITROEN, PEUGEOT, RENAULT',
      'FORD',
      'GENERAL MOTORS',
      'HALDEX',
      'HONDA, ACURA',
      'HYUNDAI, KIA',
      'JAGUAR',
      'LAND ROVER',
      'MAZDA',
      'MERCEDES-BENZ',
      'MITSUBISHI',
      'NISSAN, INFINITI, JATCO',
      'OPEL',
      'PORSCHE',
      'SSANGYONG',
      'SUBARU',
      'SUZUKI',
      'TOYOTA, LEXUS',
      'VOLVO',
      'ZF',
      'Гідроблоки',
      'Мастила для АКПП',
      'Фільтра діференціалів',
      'Запчастини для гідротрансформаторів'
    ]
    const hydroblocksCat = [
      'Клапани в стандартному розмірі',
      'Ремонтні фтулки та клапани',
      'Розгортки',
      'Інструмент',
      'Відновлення гідравлічної плити',
      'Сепараторні пластини',
      'Втулки та плунжери'
    ]
    const filtrationCat = [
      'Адаптери АКПП',
      'Адаптери додаткового фільтра АКПП',
      'Швидкісний фітинг',
      'Комплекти додаткової фільтрації',
      'Радіатори охолодження стрічкові',
      'Радіатори трубчасті охолодження',
      'Послуги з ремонту трубок охолодження',
      'Фітинги',
      'Хомути',
      'Шланги',
      'Термостати',
      'Ручний гідравлічний прес'
    ]
    const instrumentCat = [
      'Гідравлічний інструмент',
      'Інструмент для ремонту соленоїдів',
      'Інструмент для встановлення втулок',
      'Інструмент для ремонту АКПП',
      'Інструмент для чистки гідроблока',
      'Інструмент для тестування',
      'Інструмент для металообробки',
      'Розхідники для миття',
      'Інше обладнання'
    ]
    const repairCat = [
      'Ремонт гідротрансформатора',
      'Ремонт гідроблока',
      'Ремонт корпуса АКПП',
      'Ремонт соленоїдів',
      'Ремонт і прошивка ЕБУ',
      'Ремонт масляного насоса',
      'Ремонт PowerShift Ford/Volvo',
      'Ремонт DSG',
      'Ремонт трубок охолодження',
      'Встановлення додаткового фільтру',
      'Початок ремонту',
      'Діагностика On-line'
    ]
    const informationCat = [
      'Відправка та доставка товарів',
      'Оплата',
      'Гарантія',
      'Контакти',
      'Повернення товару',
      'Повертаємо автоматам надійність та чіткість переключення',
      'Наші співробітники',
      'Про нас',
      'Вакансії'
    ]

    const catalogSelect = (catalog) => {
      searchValue.value = catalog
      router.push({ path: 'Catalog', query: { search: searchValue.value } })
    }

  
    onMounted(() => {
      searchValue.value = searchStore.getSearch()
    })

    watch(searchStore.getSearch, (newValue) => {
      searchValue.value = newValue
    })

    onMounted(async () => {
      try {
        const data = await exchangeCourse()
        course.value = data
      } catch (error) {
        console.error(error)
      }
    })

    return {
      showSpoiler,
      catalogs,
      catalogSelect,
      hydroblocksCat,
      filtrationCat,
      instrumentCat,
      repairCat,
      informationCat,
    }
  },
}
</script>

<style>
.catalogs {
  display: flex;
  height: 35px;
  background: linear-gradient(to right, #222222, #555555);
  color: #b0b0b0;
  align-items: center;
  justify-content: center;
}

.spoiler-trigger {
  position: relative;
  padding-top: 35px;
  display: flex;
}

.CatalogBig {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: rgba(188, 187, 187, 0.3);
  gap: 8px;
  font-size: 14px;
  column-gap: 80px;
  width: 150px;
  height: auto;
  margin: 0;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 999;
}

.CatalogBig > * {
  box-shadow: 0px 4px 6px rgba(1, 35, 228, 0.1);
  width: 150px;
  border: 1px solid black;
  padding: 4px;
  background-color: rgb(178, 209, 238);
  border-radius: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.CatalogAll {
  display: inline-block;
  padding: 15px;
  font-weight: 400;
  line-height: 1.5;
}
</style>
