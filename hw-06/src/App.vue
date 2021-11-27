<template>
  <div id="app">
    <router-view name="menu"/>
    <router-view name="subNav"/>

    <router-view/>
  </div>
</template>

<script>
import router from './router'

export default {
  name: 'App',
  data() {
    return {
      routs: router.options.routes
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
h1 {
  text-align: center;
}
</style>
