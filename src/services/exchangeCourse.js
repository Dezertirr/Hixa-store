import axios from 'axios';

const BASE_URL = 'https://api.monobank.ua/bank/currency';

async function exchangeCourse() {
    try {
      const response = await axios.get(BASE_URL);
      const data = response.data[0].rateBuy;
      return data; // Добавьте эту строку
    } catch (error) {
      console.error(error);
    }
  }
  

// haexchangeCourseВызов функции для получения данных
export default exchangeCourse;