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
      <button @click="goToInformation(index)"
       class="InformationListItem"
        v-for="(information, index) in informationCat"
         :key="index">
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
import { useI18n } from 'vue-i18n'



export default {
  setup() {
    const showSpoiler = ref(false)
    const activeCatalog = ref(null)
    const searchValue = ref('')
    let searchStore = useSearchStore()
    const router = useRouter()
    const course = ref(0)
    const i18n = useI18n()



    const catalogs = [
    i18n.t('Catalogs.catalog.0'),
    i18n.t('Catalogs.catalog.1'),
    i18n.t('Catalogs.catalog.2'),
    i18n.t('Catalogs.catalog.3'),
    i18n.t('Catalogs.catalog.4'),
    i18n.t('Catalogs.catalog.5'),
    i18n.t('Catalogs.catalog.6'),
    i18n.t('Catalogs.catalog.7'),
    i18n.t('Catalogs.catalog.8'),
    i18n.t('Catalogs.catalog.9'),
    i18n.t('Catalogs.catalog.10'),
    i18n.t('Catalogs.catalog.11'),
    i18n.t('Catalogs.catalog.12'),
    i18n.t('Catalogs.catalog.13'),
    i18n.t('Catalogs.catalog.14'),
    i18n.t('Catalogs.catalog.15'),
    i18n.t('Catalogs.catalog.16'),
    i18n.t('Catalogs.catalog.17'),
    i18n.t('Catalogs.catalog.18'),
    i18n.t('Catalogs.catalog.19'),
    i18n.t('Catalogs.catalog.20'),
    i18n.t('Catalogs.catalog.21'),
    i18n.t('Catalogs.catalog.22'),
    i18n.t('Catalogs.catalog.23'),
    i18n.t('Catalogs.catalog.24'),
    i18n.t('Catalogs.catalog.25'),
    i18n.t('Catalogs.catalog.26'),
    i18n.t('Catalogs.catalog.27'),
    i18n.t('Catalogs.catalog.28'),
    i18n.t('Catalogs.catalog.29'),
    i18n.t('Catalogs.catalog.30'),
    ]

    const hydroblocksCat = [
    i18n.t('Catalogs.hydroblocsCat.0'),
    i18n.t('Catalogs.hydroblocsCat.1'),
    i18n.t('Catalogs.hydroblocsCat.2'),
    i18n.t('Catalogs.hydroblocsCat.3'),
    i18n.t('Catalogs.hydroblocsCat.4'),
    i18n.t('Catalogs.hydroblocsCat.5'),
    i18n.t('Catalogs.hydroblocsCat.6'),

    ]
    const filtrationCat = [
    i18n.t('Catalogs.filtrationCat.0'),
    i18n.t('Catalogs.filtrationCat.1'),
    i18n.t('Catalogs.filtrationCat.2'),
    i18n.t('Catalogs.filtrationCat.3'),
    i18n.t('Catalogs.filtrationCat.4'),
    i18n.t('Catalogs.filtrationCat.5'),
    i18n.t('Catalogs.filtrationCat.6'),
    i18n.t('Catalogs.filtrationCat.7'),
    i18n.t('Catalogs.filtrationCat.8'),
    i18n.t('Catalogs.filtrationCat.9'),
    i18n.t('Catalogs.filtrationCat.10'),
    i18n.t('Catalogs.filtrationCat.11'),

    ]
    const instrumentCat = [
    i18n.t('Catalogs.instrumentCat.0'),
    i18n.t('Catalogs.instrumentCat.1'),
    i18n.t('Catalogs.instrumentCat.2'),
    i18n.t('Catalogs.instrumentCat.3'),
    i18n.t('Catalogs.instrumentCat.4'),
    i18n.t('Catalogs.instrumentCat.5'),
    i18n.t('Catalogs.instrumentCat.6'),
    i18n.t('Catalogs.instrumentCat.7'),
    i18n.t('Catalogs.instrumentCat.8'),

    ]
    const repairCat = [
    i18n.t('Catalogs.repairCat.0'),
    i18n.t('Catalogs.repairCat.1'),
    i18n.t('Catalogs.repairCat.2'),
    i18n.t('Catalogs.repairCat.3'),
    i18n.t('Catalogs.repairCat.4'),
    i18n.t('Catalogs.repairCat.5'),
    i18n.t('Catalogs.repairCat.6'),
    i18n.t('Catalogs.repairCat.7'),
    i18n.t('Catalogs.repairCat.8'),
    i18n.t('Catalogs.repairCat.9'),
    i18n.t('Catalogs.repairCat.10'),
    i18n.t('Catalogs.repairCat.11'),
    ]
    const informationCat = [
    i18n.t('Catalogs.informationCat.0'),
    i18n.t('Catalogs.informationCat.1'),
    i18n.t('Catalogs.informationCat.2'),
    i18n.t('Catalogs.informationCat.3'),
    i18n.t('Catalogs.informationCat.4'),
    i18n.t('Catalogs.informationCat.5'),
    i18n.t('Catalogs.informationCat.6'),
    i18n.t('Catalogs.informationCat.7'),
    i18n.t('Catalogs.informationCat.8'),
    
    ]

    const catalogSelect = (catalog) => {
  searchStore.setSearch(catalog); // Update the value instead of reassigning.
  router.push({ path: 'Catalog', query: { search: catalog } });
};

    const goToInformation = (index) => {
      router.push({ path: 'Info' });
    };

    onMounted(() => {
      searchValue.value = searchStore.getSearch();
    });

    watch(searchStore.getSearch, (newValue) => {
      searchValue.value = newValue;
    });

    onMounted(async () => {
      try {
        const data = await exchangeCourse();
        course.value = data;
      } catch (error) {
        console.error(error);
      }
    });

    return {
      catalogs,
      showSpoiler,
      catalogSelect,
      hydroblocksCat,
      filtrationCat,
      instrumentCat,
      repairCat,
      informationCat,
      goToInformation,
    };
  },
};

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
