<template>
    <div>
      <div>
        <ul>
          <li @click="showInformation(0)">Відправка та доставка товарів</li>
          <li @click="showInformation(1)">Оплата</li>
          <li @click="showInformation(2)">Гарантія</li>
          <li @click="showInformation(3)">Контакти</li>
          <li @click="showInformation(4)">Повернення товару</li>
          <li @click="showInformation(5)">Повертаємо автоматам надійність та чіткість переключення</li>
          <li @click="showInformation(6)">Наші співробітники</li>
          <li @click="showInformation(7)">Про нас</li>
          <li @click="showInformation(8)">Вакансії</li>
        </ul>
      </div>
      <div>
        <p>{{ selectedInformation }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        Information: [
          'Відправляємо в день оформлення замовлення',
          'Оплата частинами та у розстрочку',
          'Гарантуємо надійність',
          'Дзвоніть та пишіть',
          'Повертаємо за наш рахунок',
          'Ми надійність',
          'Василь Іванченко',
          'Ми сила',
          'Ми нікого нажаль зараз не набираєм('
        ],
        selectedInformation: '' // Переменная для хранения выбранного текста из массива
      };
    },
    methods: {
      showInformation(index) {
        this.selectedInformation = this.Information[index];
      }
    }
  };
  </script>
  
  <style></style>
  