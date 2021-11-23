<template>

  <input :value="value"
         :style="customTheme ? {'border-radius': blue.rad} : {'border-radius': grey.rad}"
         @input="$emit('input', $event.target.value)" />

</template>

<script>
export default {
  name: 'CInput',
  inject: ['blue', 'grey'],
  props: {
    customTheme: {
      type: Boolean,
      required: true
    },
    value: String,
  },
}
</script>

<style scoped>

input {
  display: block;
  border: 1px solid rgba(0, 0, 0, .4);
  border-radius: 2px;
  padding: 5px;
  margin: 10px 0;
}

</style>