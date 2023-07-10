import { defineStore } from 'pinia';

export const useSearchStore = defineStore({
  id: 'search',
  state: () => ({
    search: ''
  }),
  getters: {},
  actions: {
    setSearch(search) {
      this.search = search;
    },
    getSearch() {
      return this.search;
    }
  }
});
