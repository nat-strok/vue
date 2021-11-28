<template>
    <div>

      <router-view name="menu"/>
      <router-view name="subNav"/>

      <div class="card-box">
        <div class="card-title">Username: <strong>{{ currentUser.username }}</strong></div>

        <table class="user-info">
          <tr>
            <td>Name:</td>
            <td>{{ currentUser.name }}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{{ currentUser.email }}</td>
          </tr>
          <tr>
            <td>Address:</td>
            <td>{{ currentUser.address.street }}, {{ currentUser.address.suite }}, {{ currentUser.address.city }}, {{ currentUser.address.zipcode }}</td>
          </tr>
          <tr>
            <td>Phone:</td>
            <td>{{ currentUser.phone }}</td>
          </tr>
          <tr>
            <td>website:</td>
            <td>{{ currentUser.website }}</td>
          </tr>
          <tr>
            <td>Company:</td>
            <td>{{ currentUser.company.name }}, {{ currentUser.company.catchPhrase }}</td>
          </tr>
        </table>

        <div class="posts">
          <h4>All {{ currentUser.username }}'s posts</h4>
          <div v-for="item in currentPosts" :key="item.id">
            <div class="post-title">{{ item.title }}</div>
            <div>{{ item.body }}</div>
          </div>
        </div>
      </div>



    </div>
</template>

<script>
import {actions, getters} from "@/store";

export default {
  name: 'UserCard',
  computed: {
    ...getters,
  },
  methods: {
    ...actions,
  },
  created() {
    this.getCurrentPosts(this.$route.params.userId);
  },
}
</script>

<style scoped>
.card-box {
  margin-top: 2px;
  border: 1px solid silver;
  border-top: 0;
  border-radius: 0 0 6px 6px;
  padding: 20px;
  text-align: left;
}
.user-info {
  padding: 16px 0;
}

.user-info td {
  padding: 0 4px 4px 0;
  vertical-align: baseline;
}

.user-info td:first-child {
  font-style: italic;
}

.posts > div {
  padding-bottom: 16px;
}

.post-title {
  font-style: italic;
}

</style>