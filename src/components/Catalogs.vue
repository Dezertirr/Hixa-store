<template>
  <div class="catalogs">
    <!-- Catalog 1 -->
    <div @mouseenter="showSpoiler = true" class="spoiler-trigger">
      <div
        v-if="showSpoiler && activeCatalog === 'Каталог'"
        class="CatalogBig"
        @mouseleave="showSpoiler = false"
      >
        <button class="catBtn"
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
    {{ $t('Catalogs.catalog1') }}
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
    {{ $t('Catalogs.catalog2') }}
    </a>
    <div @mouseenter="showSpoiler = true" class="spoiler-trigger">
      <div
        v-if="showSpoiler && activeCatalog === 'Охолодження'"
        class="CatalogBig"
        @mouseleave="showSpoiler = false"
      >
        <button class="catBtn"
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
    {{ $t('Catalogs.catalog3') }}
    </a>
    <div @mouseenter="showSpoiler = true" class="spoiler-trigger">
      <div
        v-if="showSpoiler && activeCatalog === 'Інструмент та обладнання'"
        class="CatalogBig"
        @mouseleave="showSpoiler = false"
      >
        <button class="catBtn"
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
    {{ $t('Catalogs.catalog4') }}
    </a>

    <div @mouseenter="showSpoiler = true" class="spoiler-trigger">
      <div
        v-if="showSpoiler && activeCatalog === 'Ремонт АКПП'"
        class="CatalogBig"
        @mouseleave="showSpoiler = false"
      >
        <button class="catBtn" v-for="(repair, index) in repairCat" :key="index" @click="catalogSelect(repair)">
          {{ repair }}
        </button>
      </div>
    </div>
    <a
      class="CatalogAll"
      @mouseenter=";(showSpoiler = true), (activeCatalog = 'Ремонт АКПП')"
      @mouseleave="showSpoiler = false"
    >
    {{ $t('Catalogs.catalog5') }}
    </a>
    <div @mouseenter="showSpoiler = true" class="spoiler-trigger">
      <div 
        v-if="showSpoiler && activeCatalog === 'Інформація'"
        class="CatalogBig"
        @mouseleave="showSpoiler = false"
      >
      <button @click="goToInformation(index)" 
      class="catBtn"
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
    {{ $t('Catalogs.catalog6') }}
    </a>
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
    const { t, locale } = useI18n();
   


    const catalogs = [
     t('Catalogs.catalog.0'),
     t('Catalogs.catalog.1'),
     t('Catalogs.catalog.2'),
     t('Catalogs.catalog.3'),
     t('Catalogs.catalog.4'),
     t('Catalogs.catalog.5'),
     t('Catalogs.catalog.6'),
     t('Catalogs.catalog.7'),
     t('Catalogs.catalog.8'),
     t('Catalogs.catalog.9'),
     t('Catalogs.catalog.10'),
     t('Catalogs.catalog.11'),
     t('Catalogs.catalog.12'),
     t('Catalogs.catalog.13'),
     t('Catalogs.catalog.14'),

    ]

    const hydroblocksCat = [
     t('Catalogs.hydroblocsCat.0'),
     t('Catalogs.hydroblocsCat.1'),
     t('Catalogs.hydroblocsCat.2'),
     t('Catalogs.hydroblocsCat.3'),
     t('Catalogs.hydroblocsCat.4'),
     t('Catalogs.hydroblocsCat.5'),
     t('Catalogs.hydroblocsCat.6'),

    ]
    const filtrationCat = [
     t('Catalogs.filtrationCat.0'),
     t('Catalogs.filtrationCat.1'),
     t('Catalogs.filtrationCat.2'),
     t('Catalogs.filtrationCat.3'),
     t('Catalogs.filtrationCat.4'),
     t('Catalogs.filtrationCat.5'),
     t('Catalogs.filtrationCat.6'),
     t('Catalogs.filtrationCat.7'),
     t('Catalogs.filtrationCat.8'),
     t('Catalogs.filtrationCat.9'),
     t('Catalogs.filtrationCat.10'),
     t('Catalogs.filtrationCat.11'),

    ]
    const instrumentCat = [
     t('Catalogs.instrumentCat.0'),
     t('Catalogs.instrumentCat.1'),
     t('Catalogs.instrumentCat.2'),
     t('Catalogs.instrumentCat.3'),
     t('Catalogs.instrumentCat.4'),
     t('Catalogs.instrumentCat.5'),
     t('Catalogs.instrumentCat.6'),
     t('Catalogs.instrumentCat.7'),
     t('Catalogs.instrumentCat.8'),

    ]
    const repairCat = [
     t('Catalogs.repairCat.0'),
     t('Catalogs.repairCat.1'),
     t('Catalogs.repairCat.2'),
     t('Catalogs.repairCat.3'),
     t('Catalogs.repairCat.4'),
     t('Catalogs.repairCat.5'),
     t('Catalogs.repairCat.6'),
     t('Catalogs.repairCat.7'),
     t('Catalogs.repairCat.8'),
     t('Catalogs.repairCat.9'),
     t('Catalogs.repairCat.10'),
     t('Catalogs.repairCat.11'),
    ]
    const informationCat = [
     t('Catalogs.informationCat.0'),
     t('Catalogs.informationCat.1'),
     t('Catalogs.informationCat.2'),
     t('Catalogs.informationCat.3'),
     t('Catalogs.informationCat.4'),
     
     t('Catalogs.informationCat.7'),
     t('Catalogs.informationCat.8'),
    
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
  background: linear-gradient(to right, #013F48 50%, #15575e 70%);
  color: #ffffff;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;

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
  box-shadow: 0px 4px 6px rgba(1, 35, 228, 0.15);
  width: 150px;
  border: 0;
  padding: 4px;
  background: #0391a7;
  border-radius: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  color: #ffffff;
}

.CatalogAll {
  display: inline-block;
  padding: 12px;
  font-weight: 300;
  font-size: 10px;
  line-height: 1.3;
  transition: ease-in-out 0.4s;
  cursor: pointer;
}

@media only screen and (min-width: 700px) {
  .CatalogAll  {
    padding: 15px;
  font-weight: 300;
  font-size: 12px;
  }
}
@media only screen and (min-width: 1200px) {
  .CatalogAll {
    padding: 7px 15px;
    font-size: 14px;
line-height: 1.5;
  }
}
.CatalogAll:hover,
.CatalogAll:focus {
  background: #027081;
}

.catBtn{
margin-top: 5px;
cursor: pointer;
transition: ease-in-out 0.4s;
}

.catBtn:hover,
.catBtn:focus{
  background: #025461; ;
}
</style>
