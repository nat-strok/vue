import Vue from 'vue'
import VueRouter from 'vue-router'
import Menu from '../components/Menu'
import SubNav from '../components/SubNav'
import Home from '../views/Home'
import posts from './posts'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {
      default: Home,
      menu: Menu,
      subNav: SubNav
    }
  },
  ...posts,
  {
    path: '*',
    name: 'Page404',
    components: {
      default: () => import(/* webpackChunkName: "about" */ '../views/Page404.vue'),
      menu: Menu,
      subNav: SubNav
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
