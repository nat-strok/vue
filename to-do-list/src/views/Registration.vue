<template>
  <div class="container">

    <popup-wrapper>
      <div class="head">Регистрация</div>

      <form class="login" @submit.prevent="login">

        <c-input required
                 type="text"
                 v-model="newUser.name"
                 @removeError="errorsRemove">Имя:
        </c-input>

        <c-input required
                 type="text"
                 v-model="newUser.nickname">Псевдоним:
        </c-input>

        <c-input type="text"
                 v-model="newUser.email"
                 @removeError="errorsRemove">Email:
        </c-input>

        <c-input required
                 type="password"
                 v-model="newUser.password"
                 @removeError="errorsRemove">Пароль:
        </c-input>

        <c-input required
                 type="password"
                 v-model="doublePass"
                 @removeError="errorsRemove">Пароль: <br />(еще раз)
        </c-input>

          <p class="error">
            <span v-for="(error, i) in errors" :key="i">
              <span v-show="error.state" v-html="error.text"></span>
            </span>
          </p>
        <button type="submit">Зарегистрироваться</button>
      </form>

      <router-link :to="{name: 'Auth', params: { }}">Я уже зарегистрирован, хочу залогиниться</router-link>
    </popup-wrapper>

  </div>
</template>

<script>
import PopupWrapper from "@/components/PopupWrapper";
import CInput from "@/components/forms/CInput"
import { mapState } from 'vuex';
import { A_REG_NEW_USER } from "@/types/actions";

export default {
  name: 'Registration',
  components: {
    PopupWrapper,
    CInput
  },
  data() {
    return {
      newUser: {id: "", name: "", nickname: "", email: "", password: ""},
      doublePass: "",
      newActId: "",
      newCount: "",
      errors: {
        errorPresentName: {
          state: false,
          text: 'Это имя уже занято'
        },
        errorPresentPass:  {
          state: false,
          text: 'Вы уже зарегистрированы, перейдите по ссылке под кнопкой "Зарегистрироваться"'
        },
        errorPass:  {
          state: false,
          text: 'Введенные вами пароли не совпадают'
        },
        errorEmail:  {
          state: false,
          text: 'Проверьте правильность введенного email'
        },
      }
    }
  },
  computed: {
    ...mapState({
      users: state => state.users.users,
      usersCount: state => state.users.usersCount,
      activeId: state => state.users.activeId
    }),
    isEmailValid() {
      const emailRegexp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
      return emailRegexp.test(this.newUser.email);
    },
  },
  methods: {

    //убирает сообщения об ошибках
    errorsRemove() {
      for (let key in this.errors) {
        this.errors[key].state = false;
      }
    },

    // проверяет, что такого пользователя еще нет
    isPresentName() {
      return !this.users.findIndex(item => item.name === this.newUser.name || item.email === this.newUser.name);
    },

    // проверяет, совпадает ли введенный пароль с паролем уже имеющегося пользователя
    // используется, если уже совпало имя или email
    isPresentPass() {
      return !this.users.findIndex(item => item.password === this.newUser.password && item.password === this.doublePass);
    },

    // проверяет, что пароль введен оба раза одинаково
    isPass() {
      return this.newUser.password === this.doublePass
    },

    // проверяет данные, если такого пользователя с таким же пароллем еще нет и email выглядит как email
    // присваивает пользователю ID,
    // увеличивает счетчик пользователей на единицу,
    // передает в A_REG_NEW_USER объект с новым пользователем и обновленный счетчик пользователей
    // перенаправляет пользователя на страницу со списком задач
    // обнуляет объект нового пользователя в компопненте
    // если какая-либо из проверок не выполнена передает в соответствующее поле объекта errors значение true
    // по условию в блоке с ошибками показывается та ошибка, у котрой значение поля state true
    // если пользователь начинает исправлять ошибку (фокус на поле имя, email или пароль),
    // все ошибки снова отмечаются как false и сообщения об ошибках пропадают до следующей проверки при попытке submit
    login() {
      if (!this.isPresentName() && this.isPass() && this.isEmailValid) {
        this.newUser.id = this.usersCount;
        this.newCount = this.usersCount + 1;
        this.$store.dispatch(A_REG_NEW_USER, {user: this.newUser, count: this.newCount});
        this.$router.push({name: 'Todos'});
        this.newUser = Object.assign({}, {id: "", name: "", nickname: "", email: "", password: ""});
      } else if (this.isPresentName() && !this.isPresentPass()) {
        this.errors.errorPresentName.state = true;
      } else if (this.isPresentName() && this.isPresentPass()) {
        this.errors.errorPresentPass.state = true;
      } else if (!this.isPass()) {
        this.errors.errorPass.state = true;
        this.newUser.password = "";
        this.doublePass = "";
      } else if (!this.isEmailValid) {
        this.errors.errorEmail.state = true;
      }
    }
  }
}
</script>

<style scoped>
p.error span {
  display: inline-block;
  padding-bottom: 3px;
}
</style>