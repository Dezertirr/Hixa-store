import { defineStore } from 'pinia';

export const useSearchStore = defineStore({
  id: 'search',
  state: () => ({
    search: '',
    course: 0
  }),
  getters: {},
  actions: {
    setSearch(search) {
      this.search = search;
    },
    getSearch() {
      return this.search;
    },
    setCourse(course) {
      this.course = course;
    },
    getCourse() {
      return this.course;
    }
  }
});
