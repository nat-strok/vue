<template>

  <button type="button"
          @click.prevent="$emit('doSmtng')"
          :class="customTheme ? blue.btnclass : grey.btnclass">
    <slot></slot>
  </button>

</template>

<script>
export default {
  name: 'CButton',
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

</style>