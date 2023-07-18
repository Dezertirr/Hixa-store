import axios from 'axios'

const BASE_URL = 'https://api.monobank.ua/bank/currency'

async function exchangeCourse() {
  try {
    const response = await axios.get(BASE_URL)
    setTimeout(() => {
      const data = response.data[0].rateBuy
      return data
    }, 30000)
  } catch (error) {
    console.error(error)
  }
}

export default exchangeCourse
