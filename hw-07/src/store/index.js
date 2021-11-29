import Vue from 'vue'
import Vuex from 'vuex'

import posts from './posts'

import api from '@/api/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    INCREMENT(state) {
      state.count++;
    },
    DECREMENT(state) {
      state.count--;
    }
  },
  actions: {
    increment({commit}) {
      commit('INCREMENT');
    },
    decrement({commit}) {
      commit('DECREMENT');
    }
  },
  modules: {
    posts
  }
})
