<template>
  <div>
    <h1>Item page</h1>

    <div>
      <p><strong>{{ item.title }}</strong></p>
      <p>{{ item.body }}</p>
    </div>

    <router-link :to="{name: 'List'}"> Return to List </router-link>

  </div>
</template>

<script>
import posts from '../posts'

export default {
  name: 'Item',
  data() {
    return {
      item: {}
    }
  },
  created() {
    this.item = posts.find(item => item.id == this.$route.params.id)
  }
}
</script>