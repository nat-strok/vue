import api from '@/api/api'
import { SET_ALL_POSTS, SET_SINGLE_POST, SET_CURR_USER, SET_CURR_POSTS, SET_IS_LOADED, SET_IS_LOADED_USER, SET_IS_LOADED_INFO } from '@/types/mutations'
import { A_GET_ALL_POSTS, A_GET_SINGLE_POST, A_GET_CURR_USER, A_GET_CURR_POSTS } from '@/types/actions';
import axios from "@/api/axios";

export default {
  // namespaced: true,
  state: {
    allPosts: [],
    singlePost: {},
    currentUser: {},
    currentPosts: [],
    isLoaded: false,
    isLoadedUser: false,
    isLoadedInfo: false
  },
  mutations: {
    [SET_ALL_POSTS](state, payload) {
      state.allPosts = payload
    },
    [SET_SINGLE_POST](state, payload) {
      state.singlePost = payload
    },
    [SET_CURR_USER](state, payload) {
      state.currentUser = payload
    },
    [SET_CURR_POSTS](state, payload) {
      state.currentPosts = payload
    },
    [SET_IS_LOADED](state, payload) {
      state.isLoaded = payload
    },
    [SET_IS_LOADED_USER](state, payload) {
      state.isLoadedUser = payload
    },
    [SET_IS_LOADED_INFO](state, payload) {
      state.isLoadedInfo = payload
    }
  },
  actions: {

    // получает список всех сообщений и записывает его в переменную allPosts
    async [A_GET_ALL_POSTS]({commit}) {
      try {
        const data = await api.getPosts();
        commit(SET_ALL_POSTS, await data.data);
      } catch (err) {
        console.log(err)
      }
    },

    // обнуляет значения singlePost и isLoaded, чтобы при переходе на страницу не показывались данные предыдущего выбранного сообщения
    // принимает ID выбранного сообщения, передает его в api axios
    // получает объект соответствующего ID сообщения и записывает его в переменную singlePost
    // вызывает и ждет, пока выполнится A_GET_CURR_USER
    async [A_GET_SINGLE_POST]({commit, state, dispatch, getters}, params) {
      commit(SET_SINGLE_POST, {});
      commit(SET_IS_LOADED, false);
      try {
        const data = await api.getSinglePost(params.id);
        commit(SET_SINGLE_POST, await data.data);
        dispatch(A_GET_CURR_USER, data.data);
        commit(SET_IS_LOADED, true);
      } catch (err) {
        console.log(err)
      }
    },

    // принимает ID пользователя (userID из полученного в A_GET_SINGLE_POST объекта), передает его в api axios
    // получает объект пользователя, чье сообщение выбрано и записывает его в переменную currentUser
    async [A_GET_CURR_USER]({ commit, state, dispatch, getters }, params) {
      commit(SET_IS_LOADED_USER, false)
      commit(SET_IS_LOADED_USER, false)
      try {
        const data = await api.getCurrUser(params.userId)
        commit(SET_CURR_USER, await data.data)
        commit(SET_IS_LOADED_USER, true)
      } catch (err) {
        console.log(err)
      }
    },

    // принимает ID пользователя (userID в объекте сообщения), передает его в api axios
    // получает массив сообщений выбранного пользователя и записывает его в переменную currentPosts
    async [A_GET_CURR_POSTS]({commit}, params) {
      commit(SET_IS_LOADED_INFO, false)
      try {
        const data = await api.getCurrUserPosts(params.id)
        commit(SET_CURR_POSTS, await data.data)
        commit(SET_IS_LOADED_INFO, true)
      } catch (err) {
        console.log(err)
      }
    }

  },
  modules: {

  }
}
