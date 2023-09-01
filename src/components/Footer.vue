<template>
  <footer class="footer" id='footer'>
    <ul class="footerList">
      <li class="listItemFooter">
        <h4>{{ $t('Footer.info') }}</h4>
        <ul class="listInfo">
          <li class="listItemInfo" @click="goToInformation">{{ $t('Footer.guarantee') }}</li>
          <li class="listItemInfo" @click="goToInformation">{{ $t('Footer.send') }}</li>
          <li class="listItemInfo" @click="goToInformation">{{ $t('Footer.returnProd') }}</li>
        </ul>
      </li>
      <li class="listItemFooter">
        <h4>{{ $t('Footer.buyPart') }}</h4>
        <ul class="listTeleph">
          <li class="listTel">
            <a :href="getPhoneNum1()" class="FooterNumber" target="_blank" rel="noopener noreferrer">{{ $t('Footer.telphone1') }}</a>
          </li>
          <li class="listTel">
            <a :href="getPhoneNum2()" class="FooterNumber" target="_blank" rel="noopener noreferrer">{{ $t('Footer.telphone2') }}</a>
          </li>
          
        </ul>
      </li>
      <li class="listItemFooter">
        <ul class="listWork">
          <li class="listItemWork">
            <h4>{{ $t('Footer.schedule') }}</h4>
            <p class="listItemWork">{{ $t('Footer.workTime') }}</p>
            <p class="listItemWork">{{ $t('Footer.weekend') }}</p>
          </li>
          <li class="listItemWork">
            <h4>{{ $t('Footer.serviceTime') }}</h4>
            <p class="listItemWork">{{ $t('Footer.workTime') }}</p>
            <p class="listItemWork">{{ $t('Footer.weekend') }}</p>
          </li>
        </ul>
      </li>
      <li class="listItemFooter">
        <h4>{{ $t('Footer.adressTitle') }}</h4>
        <p class="listItemWork adreesSTO">{{ $t('Footer.adress') }}</p>
      </li>
      <li>
        <ul class="footerLinksList">
          <li class="footerLinksItem">
            <a :href="getFacebook()" target="_blank" rel="noopener noreferrer">
    <svg width="32" height="32">
        <use href="@/images/symbol-defs.svg#icon-facebook2" class="footerSVG"></use>
    </svg>
    </a>
</li>
<li class="footerLinksItem">
  <a :href="getInsta()" target="_blank" rel="noopener noreferrer">
    <svg width="32" height="32">
        <use href="@/images/symbol-defs.svg#icon-instagram" class="footerSVG"></use>
    </svg>
    </a>
</li>
<li class="footerLinksItem">
  <a :href="getYoutube()" target="_blank" rel="noopener noreferrer">
    <svg width="60" height="32">
        <use href="@/images/symbol-defs.svg#icon-youtube2" class="footerSVG"></use>
    </svg>
    </a>
</li>
        </ul>
      </li>
    </ul>
  </footer>
</template>
<script>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

export default {
  setup() {
    const router = useRouter()
    const { t } = useI18n()
    
    const getPhoneNum1 = () => {
      const phoneNumber = t('Footer.telephoneLink1');
      return `tel:${phoneNumber}`;
    }
    const getPhoneNum2 = () => {
      const phoneNumber = t('Footer.telephoneLink2');
      return `tel:${phoneNumber}`;
    }

    const getFacebook = () => {
      const facebook = t('Footer.facebook')
      return facebook
    }

    const getYoutube = () => {
      const youTube = t('Footer.youtube')
      return youTube
    }

    const getInsta = () => {
      const insta = t('Footer.insta')
      return insta
 }
    const goToInformation = () => {
      router.push({ path: '/Info' })
    }

    return {
      goToInformation,
      getPhoneNum1,
      getPhoneNum2,
      getFacebook,
      getYoutube,
      getInsta
    }
  }
}
</script>

<style>
.footer {
  background: linear-gradient(to right, #013f48 50%, #15575e 70%);
  color: #b0b0b0;
  padding: 15px;
  font-size: 12px;
}
@media only screen and (min-width: 1200px) {
  .footer {
    padding: 15px;
    font-size: 14px;
  }
}
.footerList {
  list-style: none;
  display: flex;
  margin: 10px;
  flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
}

@media only screen and (min-width: 1200px) {
.footerList{
  margin: 15px;
  flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-start;
  }
}
.listItemFooter {
  margin: 15px;
}
.listInfo {
  list-style: none;
}

.listItemInfo {
  margin-top: 8px;
  margin-left: 18px;
}
.listTel {
  list-style: none;
  margin-top: 6px;
    margin-left: 4px;
    font-size: 12px;
    width: 136px;
}
@media only screen and (min-width: 1200px) {
  .listTel{
    margin-top: 8px;
  margin-left: 18px;
  }
}
.listWork {
  list-style: none;
  width: 150px;
}

.listItemWork {
  margin-top: 8px;
  margin-left: 18px;
}
.adreesSTO {
  width: 160px;
  line-height: 24px;
}
.FooterNumber {
  text-decoration: none;
}
.footerLinksList{
display: flex;
list-style: none;
margin: 15px;
}

.footerLinksItem{
  margin: 15px;
}

.footerSVG {
  fill: #b0b0b0;
  transition: ease-in-out 0.4s;
}

.footerSVG:hover,
.footerSVG:focus {
  fill: #2fb9c8;
}

</style>
