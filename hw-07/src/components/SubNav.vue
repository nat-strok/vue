<template>
  <div class="sub-nav">
      <div class="prev" @click="goByHistoryPrev">< previous</div>
    <div class="next" @click="goByHistoryNext">next ></div>
  </div>
</template>

<script>
export default {
  name: 'SubNav',
  methods: {
    goByHistoryNext() {
      this.$router.go(1)
    },
    goByHistoryPrev() {
      this.$router.go(-1)
    }
  },
}
</script>

<style scoped>
.sub-nav {
  padding: 0 5px 20px;
  text-align: left;
}

.prev,
.next {
  display: inline-block;
  color: #2c3e50;
  margin: 0 0 0 15px;
  cursor: pointer;
  opacity: .85;
  font-size: 14px;
  line-height: 1.2;
  text-align: center;
}
.prev:hover,
.next:hover {
  opacity: 1;
}


</style>