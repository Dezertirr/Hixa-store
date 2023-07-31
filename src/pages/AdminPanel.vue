<template>
    <form class="AdminAll">
        <label class="AdminNameLabel">Назва для фільтрації(анг)
            <input class="AdminInput"/>
        </label>
        <div class="AdminName">
        <label class="AdminNameLabel">Назва товару (укр)
            <input class="AdminInput"/>
        </label>
            <label class="AdminNameLabel">Назва товару (анг)
            <input class="AdminInput"/>
        </label>
            <label class="AdminNameLabel">Назва товару (нім)
            <input class="AdminInput"/>
        </label>
            <label class="AdminNameLabel">Назва товару (пол)
            <input class="AdminInput"/>
        </label>
            <label class="AdminNameLabel">Назва товару (вен)
            <input class="AdminInput"/>
        </label>
        </div>
        <label class="AdminNameLabel">Виробник
            <input class="AdminInput"/>
        </label>
        <div class="AdminName">
        <label class="AdminNameLabel">Короткий опис для карточки(укр)
            <input class="AdminInput"/>
        </label>
        <label class="AdminNameLabel">Короткий опис для карточки(анг)
            <input class="AdminInput"/>
        </label>
        <label class="AdminNameLabel">Короткий опис для карточки(нім)
            <input class="AdminInput"/>
        </label>
        <label class="AdminNameLabel">Короткий опис для карточки(пол)
            <input class="AdminInput"/>
        </label>
        <label class="AdminNameLabel">Короткий опис для карточки(вен)
            <input class="AdminInput"/>
        </label>
    </div>
    <div class="AdminName">
        <label class="AdminNameLabel">опис товару(укр)
            <input class="AdminInput"/>
        </label>
        <label class="AdminNameLabel">опис товару(анг)
            <input class="AdminInput"/>
        </label>
        <label class="AdminNameLabel">опис товару(нім)
            <input class="AdminInput"/>
        </label>
        <label class="AdminNameLabel">опис товару(пол)
            <input class="AdminInput"/>
        </label>
        <label class="AdminNameLabel">опис товару(вен)
            <input class="AdminInput"/>
        </label>
    </div>
    <label class="AdminNameLabel">фото(назва картинки з розширенням)
            <input class="AdminInput"/>
        </label>
        <label class="AdminNameLabel">номера запчастин
            <input class="AdminInput"/>
        </label>
        <label class="AdminNameLabel">Ціна($)
            <input class="AdminInput"/>
        </label>
        <label class="AdminNameLabel">Код товару
            <input class="AdminInput"/>
        </label>
        <button type="submit">Додати товар</button>
    </form>
    <form>
        <label class="AdminNameLabel">Видалити товар(Введіть код товару)
            <input class="AdminInput"/>
        </label>
        <button type="submit">Видалити товар</button>
    </form>
</template>
<script></script>
<style>
.AdminAll{
display: flex;
flex-direction: column;
}
.AdminName{
    display: flex;
}
.AdminNameLabel {
    display: flex;
    flex-direction: column;
    margin: 15px;
}
.AdminInput{
    width: 180px;
}
</style>