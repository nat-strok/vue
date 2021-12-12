<template>

  <div class="input-lane">
    <label>
      <slot/>
      <input v-bind="$attrs"
             :value="value"
             @input="$emit('input', $event.target.value)"
             @focus="$emit('removeError')"/>
    </label>
    <slot name="btn"/>
  </div>

</template>

<script>
export default {
  name: 'CInput',
  inheritAttrs: false,
  props: {
    value: String
  }
}
</script>

<style scoped>

</style>