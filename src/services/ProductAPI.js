import axios from 'axios'

const api = axios.create({
  baseURL: 'https://hixanew.onrender.com/'
})

export const fetchProducts = async () => {
  try {
    const response = await api.get('/api/products')
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Ошибка при загрузке данных с бекенда:', error)

    return []
  }
}
