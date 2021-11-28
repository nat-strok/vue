<template>
  <div>

    <h1>List page</h1>

    <div v-for="item in posts" :key="item.id">
      <p>
        <router-link :to="{name: 'Item', params: { id: item.id }}">{{ item.title }}</router-link>
      </p>
    </div>

  </div>
</template>

<script>
import posts from '../posts'

export default {
  name: 'List',
  data() {
    return {
      posts,
    }
  }
}
</script>