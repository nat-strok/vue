<template>
  <div>
    <h1>Counter</h1>
    <div class="home">

      <button @click="decrement">- 1</button>
      <div class="counter">{{ count }}</div>
      <button @click="increment">+ 1</button>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Home',
  computed: {
    ...mapState({
      count: state => state.count
    })
  },
  methods: {
    ...mapActions(['increment', 'decrement'])
  }
}
</script>

<style scoped>
.home {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
}
.counter {
  font-size: 24px;
  font-weight: bold;
}
</style>
