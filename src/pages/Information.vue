<template>
    <div class="InformationSide">
      <div class="InformationBar">
        <ul class="InformationList">
          <li @click="showInformation(0)" class="InformationListItem">Відправка та доставка товарів</li>
          <li @click="showInformation(1)" class="InformationListItem">Оплата</li>
          <li @click="showInformation(2)" class="InformationListItem">Гарантія</li>
          <li @click="showInformation(3)" class="InformationListItem">Контакти</li>
          <li @click="showInformation(4)" class="InformationListItem">Повернення товару</li>
          <li @click="showInformation(5)" class="InformationListItem">Повертаємо автоматам надійність та чіткість переключення</li>
          <li @click="showInformation(6)" class="InformationListItem">Наші співробітники</li>
          <li @click="showInformation(7)" class="InformationListItem">Про нас</li>
          <li @click="showInformation(8)" class="InformationListItem">Вакансії</li>
        </ul>
      </div>
      <div class="InformationTextBorder">
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
  
  <style>
  .InformationSide {
    display: flex;
    margin: 15px 45px;
    gap: 100px;
    background-color: rgb(193, 193, 193);
    border-radius: 15px;
  }

  .InformationBar {
    background-color: #116975;
    margin: 15px;
    border-radius: 15px;
    max-height: 335px;
  }

  .InformationList {
    list-style: none;
    
  }

  .InformationListItem {
    margin: 15px;

  }

  .InformationTextBorder {
    max-width: 780px;
  }

</style>
  