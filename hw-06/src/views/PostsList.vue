<template>
  <div class="list">
    <h1>All posts</h1>

    <div class="cards">
      <div v-for="post in posts" class="card-link-box" :key="post.id">
        <router-link :to="{name: 'SinglePost', params: {postId: post.id}}">{{ post.id + '. ' + post.title }}</router-link>
      </div>
    </div>

  </div>
</template>

<script>
import {actions, getters} from '../store'

export default {
  name: 'PostsList',
  computed: {
    ...getters
  },
  created() {

    // обнуляет значения переменных currentUser, currentPost и isLoaded,
    // чтобы при переходе на конкретный пост до загрузки необходимых данных не показывались данные,
    // загруженные во время прошлого перехода на другой пост
    this.resetCurrent();
    this.getPosts();
  },
  methods: {
    ...actions
  }
}

</script>

<style scoped>
.cards {
  padding: 0 20px;
  text-align: left;
}
.cards > div {
  padding-bottom: 16px;
}
</style>