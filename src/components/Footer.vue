<template>
    <footer class="footer">
        <ul class="footerList">
        <li class="listItemFooter">
            <h4>Інформація</h4>
            <ul class="listInfo">
            <li class="listItemInfo" @click="goToInformation">Гарантія</li>
            <li class="listItemInfo" @click="goToInformation">Напишіть нам</li>
            <li class="listItemInfo" @click="goToInformation">Повернення товару</li>
        </ul>
        </li>
        <li class="listItemFooter">
            <h4>Купити запчастини</h4>
            <ul>
                <li class="listTel"><a tel="+380978033485">+380 97 80 33 485</a></li>
                <li class="listTel"><a tel="+380978033485">+380 97 80 33 485</a></li>
                <li class="listTel"><a tel="+380978033485">+380 97 80 33 485</a></li>
            </ul>
        </li>
        <li class="listItemFooter">
            <ul class="listWork">
                <li  class="listItemWork">
                    <h4>Графік роботи відділу продажу</h4>
                    <p class="listItemWork">ПН-ПТ: 9:00-18:00</p>
                    <p class="listItemWork">Сб-Нд:вихідний</p>
                </li>
                <li class="listItemWork">
                    <h4>Графік роботи СТО</h4>
                    <p class="listItemWork">ПН-CБ: 9:00 -18.00</p>
                    <p class="listItemWork">НД: вихідний</p>
                </li>
            </ul>
        </li>
        <li class="listItemFooter">
            <h4>Наша адреса</h4>
            <p class="listItemWork adreesSTO">Львівська область Пустомитівський р-н с, вулиця Львівська, 61, Зимна Вода, 81110</p>
        </li>
    </ul>

        
    </footer>
</template>
<script>
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter();

    const goToInformation = () => {
      router.push({ path: '/Info' });
    };

    return {
      goToInformation
    };
  }
}
</script>

<style>
.footer {
    background: linear-gradient(to right, #222222, #555555);
    color:#b0b0b0;
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
.listInfo{
list-style: none;
}

.listItemInfo{
margin-top:8px;
margin-left: 18px;
}
.listTel {
    list-style: none;
    margin-top: 8px;
    margin-left: 18px;
}
.listWork{
    list-style: none;
}

.listItemWork{
    margin-top: 8px;
    margin-left: 18px;
}
.adreesSTO {
    width: 160px;
    line-height: 24px;
}

</style>