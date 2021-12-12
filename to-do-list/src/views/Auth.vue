<template>
  <div class="container">

    <popup-wrapper>
      <div class="head">Вход в учетную запись</div>

      <form class="login" @submit.prevent="login">

        <c-input required
                 type="text"
                 v-model="newUser.name"
                 @removeError="error = false">Имя/Email:
        </c-input>

        <c-input required
                 type="password"
                 v-model="newUser.password"
                 @removeError="error = false">Пароль:
        </c-input>

        <p class="error">
          <span v-show="error">Неправильно введен логин/емейл или пароль</span>
        </p>
        <button type="submit">Войти</button>
      </form>

      <router-link :to="{name: 'Registration', params: {  }}">Я еще не зарегистрирован, перейти к регистрации</router-link>
      <a @click="testLogin">Зайти как тестовый пользователь (ознакомительный режим)</a>
    </popup-wrapper>

  </div>
</template>

<script>
import PopupWrapper from "@/components/PopupWrapper";
import CInput from "@/components/forms/CInput"

import {mapState} from 'vuex';
import {A_LOGIN, A_SET_TEST_USER} from "@/types/actions";

export default {
  name: 'Auth',
  components: {
    PopupWrapper,
    CInput
  },
  data() {
    return {
      newUser: {name: "", password: ""},
      error: false
    }
  },
  computed: {
    ...mapState({
      users: state => state.users.users
    })
  },

  methods: {
    testLogin() {
      this.$store.dispatch(A_SET_TEST_USER);
      this.$router.push({name: 'Todos'});
    },

    // проверяет, совпадает ли введенные имя или  email с имеющимися в сторе пользователями
    // если нет:  1) меняет error на true (на форме появляется сообщение об ошибке (которое исчезнет, если одно из полей формы получит фокус)
    //            2) обнуляет поле с паролем
    // если да: 1) вызывает action A_LOGIN и передает в него объект логинящегося пользователя
    //          2) совершает переход на страницу с TO-DO
    //          3) обнуляет поля формы
    login() {
      const index = this.users.findIndex(item => item.name === this.newUser.name || item.email === this.newUser.name);
      if (index < 0 || this.users[index].password !== this.newUser.password) {
        this.error = true;
        this.newUser.password = "";
      } else {
        this.$store.dispatch(A_LOGIN, this.users[index]);
        this.$router.push({name: 'Todos'});
        this.newUser.name = "";
        this.newUser.password = "";
      }
    }
  }
}
</script>

<style scoped>

</style>
