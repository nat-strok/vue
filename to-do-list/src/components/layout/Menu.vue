<template>

    <div id="nav" :class="[customTheme ? green.main : coral.main]">
      <div class="nav-item"
           v-for="item in routs.filter(item => !hiddenRouts.includes(item.name))">
              <span :key="item.name">
                <router-link :to="item.path">{{ item.name }}</router-link>
              </span>
      </div>

    </div>
</template>

<script>
import router from '../../router'
import {mapState} from "vuex";
export default {
  name: 'Menu',
  inject: ['green', 'coral'],
  computed: {
    ...mapState({
      customTheme: state => state.theme
    })
  },
  data() {
    return {
      routs: router.options.routes,
      hiddenRouts: [
        'Home',
        'Page404',
        'Registration',
        'Auth'
      ]
    }
  }
}
</script>

<style scoped>
#nav {
  padding: 0 10px 10px 0;
  display: flex;
  flex-flow: wrap;
  font-size: 16px;
  line-height: 1.2;
}

#nav a {
  font-weight: bold;
  color: var(--grey-dark);
}

#nav .nav-item {
  padding: 0 20px 10px 0;
}

#nav a:hover {
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: var(--main-color-primary);
  text-decoration: none;
}
</style>
