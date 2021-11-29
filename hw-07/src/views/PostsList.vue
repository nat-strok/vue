<template>
  <div class="list">
    <h1>All posts</h1>

    <div class="cards">
      <div v-for="post in allPosts" class="card-link-box" :key="post.id">
        <router-link :to="{name: 'SinglePost', params: {postId: post.id}}">{{`${post.id}. ${post.title}`}}</router-link>
      </div>
    </div>

  </div>
</template>

<script>
import { A_GET_ALL_POSTS } from '@/types/actions'
import { mapState } from 'vuex'

export default {
  name: 'PostsList',
  beforeCreate() {
    this.$store.dispatch(A_GET_ALL_POSTS);
  },
  computed: {
    ...mapState({
      allPosts: state => state.posts.allPosts
    })
  },
  methods: {

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