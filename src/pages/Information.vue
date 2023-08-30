<template>
  <div class="InformationSide">
    <div class="InformationBar">
      <ul class="InformationList">
        <li @click="showInformation(0)" class="InformationListItem">Відправка та доставка товарів</li>
        <li @click="showInformation(1)" class="InformationListItem">Оплата</li>
        <li @click="showInformation(2)" class="InformationListItem">Гарантія</li>
        <li @click="showInformation(3)" class="InformationListItem">Контакти</li>
        <li @click="showInformation(4)" class="InformationListItem">Повернення товару</li>
        <!-- <li @click="showInformation(5)" class="InformationListItem">Повертаємо автоматам надійність та чіткість переключення</li>
        <li @click="showInformation(6)" class="InformationListItem">Наші співробітники</li> -->
        <li @click="showInformation(7)" class="InformationListItem">Про нас</li>
        <!-- <li @click="showInformation(8)" class="InformationListItem">Вакансії</li> -->
        <li @click="showInformation(9)" class="InformationListItem">Використання кукі</li>
      </ul>
    </div>
    <div class="InformationTextBorder">
      <div class="InformationText" v-html="formattedInformation"></div>
    </div>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';

export default {
  setup() {
    const { t } = useI18n();
    const selectedInformation = ref('');

    const Information = [
      t('Infornation.delivery'),
      t('Infornation.payment'),
      t('Infornation.guarantee'),
      t('Infornation.contact'),
      'Повертаємо за наш рахунок',
      'Ми надійність',
      'Василь Іванченко',
      'Ми сила',
      'Ми нікого нажаль зараз не набираєм(',
      'Використання кукі'
    ];

    const showInformation = (index) => {
      selectedInformation.value = Information[index];
    };

    // Вызываем showInformation для инициализации selectedInformation
    showInformation(0);

    return { t, selectedInformation, showInformation };
  },
  computed: {
    formattedInformation() {
      return this.selectedInformation.replace(/\n/g, '<br><br>');
    },
  },
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
  background: linear-gradient(to right, #013f48 30%, #15575e 70%);
  margin: 15px;
  border-radius: 15px;
  color: white;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-size: 12px;
}

@media only screen and (min-width: 1200px) {
  .InformationBar {
    font-weight: 400;
    font-size: 14px;
  }
}

.InformationList {
  list-style: none;
}

.InformationListItem {
  margin: 15px;
  cursor: pointer;
}

.InformationTextBorder {
  max-width: 780px;
}

.InformationText {
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-size: 12px;
  margin: 30px 0;
}

@media only screen and (min-width: 1200px) {
  .InformationText {
    font-weight: 400;
    font-size: 14px;
  }
}
</style>
