<template>
  <footer class="footer">
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
        <ul>
          <li class="listTel">
            <a tel="+4915237711276">{{ $t('Footer.telphoneDe') }}</a>
          </li>
          <li class="listTel">
            <a tel="+48506388798">{{ $t('Footer.telphonePl') }}</a>
          </li>
          <li class="listTel">
            <a tel="+380978033485">{{ $t('Footer.telphoneUa') }}</a>
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
    </ul>
  </footer>
</template>
<script>
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()

    const goToInformation = () => {
      router.push({ path: '/Info' })
    }

    return {
      goToInformation
    }
  }
}
</script>

<style>
.footer {
  background: linear-gradient(to right, #013f48 50%, #15575e 70%);
  color: #b0b0b0;
  padding: 15px;
}
.footerList {
  list-style: none;
  display: flex;
  margin: 15px;
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
  margin-top: 8px;
  margin-left: 18px;
}
.listWork {
  list-style: none;
}

.listItemWork {
  margin-top: 8px;
  margin-left: 18px;
}
.adreesSTO {
  width: 160px;
  line-height: 24px;
}
</style>
