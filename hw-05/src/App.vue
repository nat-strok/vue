<template>
  <div class="container">

    <hoc/>

    <set-watch-provide />

    <observe/>


  </div>
</template>

<script>
import Hoc from './components/Hoc'
import SetWatchProvide from './components/SetWatchProvide'
import Observe from './components/Observe'

export default {
  name: 'App',
  components: {
    Hoc,
    SetWatchProvide,
    Observe
  }
}
</script>

<style>
.container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}

h2 {margin: 60px 0 20px;}

input[type=text] {
  border: 1px solid rgba(0, 0, 0, .4);
  border-radius: 2px;
  padding: 5px;
  margin: 10px;
}
</style>
