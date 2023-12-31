import { defineStore } from 'pinia';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://hixanew.onrender.com/',
});

export const useSearchStore = defineStore({
  id: 'search',
  state: () => ({
    search: '',
    course: 0,
    products: [], // Добавили массив для хранения продуктов
  }),
  getters: {},
  actions: {
    async setSearch(search) {
      this.search = search;
      await this.fetchProducts();
    },
    getSearch() {
      return this.search;
    },
    setCourse(course) {
      this.course = course;
    },
    getCourse() {
      return this.course;
    },
    async fetchProducts() {
      try {
        const response = await api.get('/api/products');
        this.products = response.data;
        return response.data; // Вернуть данные из метода
      } catch (error) {
        console.error('Ошибка при загрузке данных с бекенда:', error);
        this.products = [];
        return []; // Вернуть пустой массив в случае ошибки
      }
    },
    
  },
});
