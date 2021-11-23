<template>

  <form :style="customTheme ? {'background-color': blue.bg} : {'background-color': grey.bg}">
    <slot></slot>
  </form>

</template>

<script>

export default {
  name: 'CFormN',
  inject: ['blue', 'grey'],
  props: {
    customTheme: {
      type: Boolean,
      required: true
    },
  }
}
</script>

<style scoped>
form {
  padding: 10px 20px 20px;
  margin: 20px 0;
}
</style>
