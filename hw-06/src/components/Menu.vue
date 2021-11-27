<template>

    <div id="nav">
      <div class="nav-item" v-for="item in routs.filter(el => !hiddenRouts.includes(el.name))">
              <span :key="item.name">
                <router-link :to="item.path">{{ item.name }}</router-link>
              </span>
      </div>

  </div>
</template>
<script>
import router from '../router'
export default {
  name: 'Menu',
  data() {
    return {
      routs: router.options.routes,
      hiddenRouts: ['SinglePost', 'Page404', 'Item']
    }
  }
}
</script>

<style scoped>
#nav {
  padding: 10px;
  display: flex;
  flex-flow: wrap;
  font-size: 16px;
  line-height: 1.2;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav .nav-item {
  padding: 10px;
}

#nav > div {
  padding-right: 30px;
}

#nav a:hover {
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
  text-decoration: none;
}
</style>
