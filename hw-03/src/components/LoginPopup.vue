<template>
  <div>

    <form v-on:submit.prevent="onSubmit">
      <label>Имя:<br /><input type="text" v-model="newUser.name"></label> <br /><br />
      <label>Пароль:<br /><input type="text" v-model="newUser.password"></label> <br /><br />
      <button type="submit">Войти</button>
      <div v-show="!newUser.name || !newUser.pass" class="error">Введите все данные</div>
    </form>

  </div>
</template>

<script>
export default {
  name: 'LoginPopup',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      newUser: this.user,
    }
  },
  methods: {

    //передает в родителя объект с данными пользователя и событие по submit формы
    onSubmit() {
      this.$emit('update:user', this.newUser);
      this.$emit('submitUser')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
