<template>
  <div>

    <form v-on:submit.prevent="onSubmit">
      <label>Имя:<br /><input type="text" v-model="newUser"></label> <br /><br />
      <label>Пароль:<br /><input type="text" v-model="newUserPass"></label> <br /><br />
      <button type="submit">Войти</button>
      <div v-show="!newUser || !newUserPass" class="error">Введите все данные</div>
    </form>

  </div>
</template>

<script>
export default {
  name: 'LoginPopup',
  props: ['user', 'pass'],
  data() {
    return {
      newUser: this.user,
      newUserPass: this.pass
    }
  },
  methods: {

    //передает в родителя имя пользователя, логин и событие по submit формы
    onSubmit() {
      this.$emit('update:user', this.newUser);
      this.$emit('update:pass', this.newUserPass);
      this.$emit('submitUser')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
