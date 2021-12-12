<template>
  <div class="container">

    <p>Если вы зарегистрированный пользователь:</p>
    <router-link :to="{ name: 'Auth' }" class="btn auth-btn">Войти</router-link>

    <p>Если вы новый пользователь:</p>
    <router-link :to="{ name: 'Registration'}" class="btn auth-btn">Зарегистрироваться</router-link>

    <router-view/>

  </div>
</template>

<script>
import { A_SET_TEST_USER } from "@/types/actions";

export default {
  name: 'Home',
  methods: {
    testLogin() {
      this.$store.dispatch(A_SET_TEST_USER);
      this.$router.push({name: 'Todos'});
    }
  }
}
</script>

<style scoped>
.container {
  text-align: center;
}
</style>
