<template>
  <div>

    <slot></slot>

  </div>
</template>

<script>

export default {
  name: 'BlueTheme',
  provide() {
    return {
      blue: this.blue,
      grey: this.grey
    }
  },
  data() {
    return {
      blue: {
        bg: 'lightblue',
        rad: '8px',
        btnclass: 'blueclass'
      },
      grey: {
        bg: 'lightgrey',
        rad: '2px',
        btnclass: 'greyclass'
      }
    }
  },
}
</script>
