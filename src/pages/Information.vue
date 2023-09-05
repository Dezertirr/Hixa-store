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
      t('Infornation.aboutMe'),
      'Ми нікого нажаль зараз не набираєм(',
      t('Infornation.document')
    ];

    const showInformation = (index) => {
      selectedInformation.value = Information[index];
    };
    showInformation(0);

    return { t, selectedInformation, showInformation };
  },
  computed: {
    formattedInformation() {
      
  let formattedText = this.selectedInformation.replace(/\n/g, '<br><br>');

  formattedText = formattedText.replace(/\\i/g, `<a href=${this.t('Footer.insta')} target="_blank" rel="noopener noreferrer" class="InformationLink">`);

  formattedText = formattedText.replace(/\\I/g, '</a>');

  formattedText = formattedText.replace(/\\y/g, `<a href=${this.t('Footer.youtube')} target="_blank" rel="noopener noreferrer" class="InformationLink">`);

  formattedText = formattedText.replace(/\\Y/g, '</a>');

  formattedText = formattedText.replace(/\\f/g, `<a href=${this.t('Footer.facebook')} target="_blank" rel="noopener noreferrer" class="InformationLink">`);

  formattedText = formattedText.replace(/\\F/g, '</a>');

  formattedText = formattedText.replace(/\\n/g, `<a href=tel:${this.t('Footer.telephoneLink1')} " class="InformationLink">`);

  formattedText = formattedText.replace(/\\N/g, '</a>');

  formattedText = formattedText.replace(/\\m/g, `<a href="mailto:${this.t('Footer.mail')}" class="InformationLink">`);

  formattedText = formattedText.replace(/\\M/g, '</a>');

  formattedText = formattedText.replace(/\\w/g, `<a href="https://www.google.com/maps/d/u/0/edit?mid=1aHgunP5BY_0ZRn2SddSAhL7AsBkouZo&ll=49.47426175003439%2C18.758484850000016&z=6" target="_blank" rel="noopener noreferrer" class="InformationLink"> `);

  formattedText = formattedText.replace(/\\W/g, '</a>');

  formattedText = formattedText.replace(/\\a/g, `<a href="https://docs.google.com/document/d/1N4vcSTLNoWKifOqdSJTyH-cHP2GsReOkEdTiqBf4VjU/edit" target="_blank" rel="noopener noreferrer" class="InformationLink"> `);

formattedText = formattedText.replace(/\\A/g, '</a>');

  return formattedText;
}
  },
};
</script>

<style>
.InformationSide {
  display: flex;
  margin: 15px 45px;
  gap: 30px;
  background-color: rgb(193, 193, 193);
  border-radius: 15px;
  flex-direction: column;
}

@media only screen and (min-width: 700px) {
  .InformationSide {
    flex-direction: row;
    
  }
}
@media only screen and (min-width: 1200px) {
  .InformationSide {
    gap: 100px;
  }
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

@media only screen and (min-width: 700px) {
  .InformationBar {
    font-weight: 400;
    font-size: 14px;
    min-width: 225px;
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
  padding: 15px
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

.InformationLink {
  font-family: 'Poppins', sans-serif;
    font-weight: 300;
    font-size: 14px;
    transition: ease-in-out 0.4s;
}

.InformationLink:hover,
.InformationLink:focus{
  color:blue;
  font-size: 14.5px;
}
</style>
