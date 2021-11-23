<template>

  <button type="button">
    <slot />
  </button>

</template>

<script>
export default {
  name: 'CButton',
}
</script>

<style scoped>
button {
  display: inline-block;
  border: 1px solid rgba(0, 0, 0, .4);
  border-radius: 2px;
  padding: 5px 6px;
  position: relative;
  outline: none;
  margin: 10px 10px;
  min-width: 120px;
  box-shadow: 3px 3px 5px rgba(26, 23, 20, .3);
  background-color: lightgrey;
  text-transform: uppercase;
  transition: all 0.4s ease;
}

button:hover {
  transform: scale(1.1);
}

</style>