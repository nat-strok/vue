<template>
  <div>

    <slot></slot>

  </div>
</template>

<script>

export default {
  name: 'Theme',
  provide() {
    return {
      green: this.green,
      coral: this.coral
    }
  },
  data() {
    return {
      green: {
        main: 'green',

      },
      coral: {
        main: 'coral',
      }
    }
  },
}
</script>
