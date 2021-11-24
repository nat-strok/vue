<template>
  <div id="app">

    <slider />

    <directives />


  </div>
</template>

<script>
import Slider from './components/Slider.vue'
import Directives from './components/Directives.vue'

export default {
  name: 'App',
  components: {
    Slider,
    Directives
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
