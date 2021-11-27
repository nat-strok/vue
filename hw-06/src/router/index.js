import Vue from 'vue'
import VueRouter from 'vue-router'

import Menu from '@/components/Menu'
import SubNav from '@/components/SubNav'

import Home from '../views/Home'
import List from '../views/List'
import Item from '../views/Item'
import Contacts from '../views/Contacts'
import About from '../views/About'

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
  {
    path: '/list',
    name: 'List',
    components: {
      default: List,
      menu: Menu,
      subNav: SubNav
    },
    props: true
  },
  {
    path: '/list/item:id',
    name: 'Item',
    components: {
      default: Item,
      menu: Menu,
      subNav: SubNav
    },
    props: true
  },
  ...posts,
  {
    path: '/about',
    name: 'About',
    components: {
      default: About,
      menu: Menu,
      subNav: SubNav
    }
  },
  {
    path: '/contacts',
    name: 'Contacts',
    components: {
      default: Contacts,
      menu: Menu,
      subNav: SubNav
    }
  },
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
