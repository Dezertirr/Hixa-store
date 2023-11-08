<template>
  <form class="AdminAll" @submit.prevent="addProduct">
    <div class="AdminName">
      <label class="AdminNameLabel"
        >Назва товару (укр)
        <input class="AdminInput" v-model="name.uk" />
      </label>
      <label class="AdminNameLabel"
        >Назва товару (анг)
        <input class="AdminInput" v-model="name.en" />
      </label>
      <label class="AdminNameLabel"
        >Назва товару (нім)
        <input class="AdminInput" v-model="name.de" />
      </label>
      <label class="AdminNameLabel"
        >Назва товару (пол)
        <input class="AdminInput" v-model="name.pl" />
      </label>
      <label class="AdminNameLabel"
        >Назва товару (вен)
        <input class="AdminInput" v-model="name.hu" />
      </label>
    </div>

    <label class="AdminNameLabel"
      >Назва для фільтрації
      <input class="AdminInput" v-model="brand" />
    </label>

    <!-- Короткий опис для карточки -->
    <!-- И так далее для каждого поля. Убедитесь, что у вас есть соответствующие свойства в data() -->

    <label class="AdminNameLabel"
      >фото(назва картинки з розширенням)
      <input class="AdminInput" v-model="photo" />
    </label>

    <label class="AdminNameLabel"
      >номера запчастин
      <input class="AdminInput" v-model="part" />
    </label>

    <label class="AdminNameLabel"
      >Ціна($)
      <input class="AdminInput" v-model="price" />
    </label>

    <label class="AdminNameLabel"
      >Код товару
      <input class="AdminInput" v-model="code" />
    </label>

    <button type="submit">Додати товар</button>
  </form>

  <form @submit.prevent="deleteProduct">
    <label class="AdminNameLabel"
      >Видалити товар(Введіть код товару)
      <input class="AdminInput" v-model="deleteCode" />
    </label>
    <button type="submit">Видалити товар</button>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      name: { en: '', uk: '', de: '', pl: '', hu: '' },
      brand: '',
      short_description: { en: '', uk: '', de: '', pl: '', hu: '' },
      description: { en: '', uk: '', de: '', pl: '', hu: '' },
      photo: '',
      price: '',
      code: '',
      part: '',
      deleteCode: ''
    }
  },
  methods: {
    async addProduct() {
      const newProduct = {
        id: this.generateId(),
        name: this.name,
        brand: this.brand,
        short_description: this.short_description,
        description: this.description,
        photo: this.photo,
        price: this.price,
        code: this.code,
        part: this.part
      }

      try {
        await axios.post(
          'https://hixanew.onrender.com/api/addProduct',
          newProduct
        )
        this.resetForm()
        alert('Product added successfully')
      } catch (error) {
        console.error('Error adding product:', error)
        alert('Failed to add product')
      }
    },
    async deleteProduct() {
      try {
        const response = await axios.delete(
          `https://hixanew.onrender.com/api/deleteProduct/${this.deleteCode}`
        )
        alert('Product deleted successfully')
      } catch (error) {
        console.error('Error deleting product:', error)
        alert('Failed to delete product')
      }
    },
    generateId() {
      return Date.now()
    },
    resetForm() {
      this.name = { en: '', uk: '', de: '', pl: '', hu: '' }
      // и так далее для всех полей...
    }
  }
}
</script>
<style>
.AdminAll {
  display: flex;
  flex-direction: column;
}
.AdminName {
  display: flex;
}
.AdminNameLabel {
  display: flex;
  flex-direction: column;
  margin: 15px;
}
.AdminInput {
  width: 180px;
}
</style>
