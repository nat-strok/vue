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

    // обнуляет значения переменных currentUser и currentPost,
    // чтобы при переходе на конкретный пост не показывались сначала денные из прошлого перехода
    // думала, что можно было бы это сделать через навигационный хук,
    // но не смогла разобраться достаточно быстро, чтобы не слишком опоздать с домашкой
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
/*.cards {*/
/*  display: flex;*/
/*  flex-flow: row wrap;*/
/*  gap: 20px;*/
/*}*/

/*.card-link-box {*/
/*  border: 1px solid silver;*/
/*  border-radius: 6px;*/
/*  width: 200px;*/
/*  padding: 10px;*/
/*  flex: 1 0 200px;*/
/*  text-align: left;*/
/*}*/
</style>