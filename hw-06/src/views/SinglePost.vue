<template>
  <div>

    <div v-if="!isLoaded">Loading...</div>

    <div v-else>
      <div class="card-box">
        <div class="card-title bold">{{ singlePost.title }}</div>
        <div class="card-text">{{ singlePost.body }}</div>
        <div class="card-name small">Author of the post: {{ currentUser.username }} </div>
        <br />
        <router-link class="link bold" :to="{name: 'SinglePostAdd', params: {userId: singlePost.userId}}">More information about {{ currentUser.username }}</router-link>
        <br />
        <router-link class="link small" :to="{name: 'All Posts'}"> Back to all user's posts </router-link>
      </div>

      <transition name="fade">
        <router-view/>
      </transition>

    </div>

  </div>
</template>

<script>
import {actions, getters} from "@/store";

export default {
  name: 'SinglePost',
  computed: {
    ...getters
  },
  created() {
    this.getSinglePost(this.$route.params.postId);
  },
  methods: {
    ...actions
  }
}
</script>

<style scoped>
.card-box {
  border: 1px solid silver;
  border-radius: 6px;
  padding: 20px;
  margin-top: 50px;
  text-align: left;
}

.bold {
  font-weight: bold;
}

.card-text {
  padding: 16px 0 16px;
  font-style: italic;
}

.link {
  display: inline-block;
  /*color: #2c3e50;*/
  margin: 15px 0 0;
  cursor: pointer;
  opacity: .85;
  text-align: left;
}

.link:hover {
  opacity: 1;
}

.small {
  font-size: 14px;
}

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: .3s;
}

.fade-enter-active {
  transition-delay: .3s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

</style>