import Vue from 'vue'
import axios from 'axios'

const state = Vue.observable({
  posts: [],
  singlePost: {},
  currentUser: [],
  currentPosts: [],
  isLoaded: false,
  isLoadedUser: false
})

export const actions = {

  // получает список всех сообщений и ззаписывает его в переменную posts
  async getPosts() {
    try {
      let data = await axios.get('https://jsonplaceholder.typicode.com/posts/')
      mutations.setPosts(data.data);
    } catch (err) {
      console.log(err);
    }
  },

  // принимает ID выбранного сообщения
  // получает объект соответствующего ID сообщения и записывает его в переменную singlePost
  // проверяет соответствие userID в выбранном сообщении ID пользователя
  // если userID undefined (учитывая resetCurrent должно быть именно так)
  // или не соответствует ID актуального пользователя (если resetCurrent не сработал),
  // вызывает getCurrentUser
  async getSinglePost(postId) {
    try {
      let data = await axios.get('https://jsonplaceholder.typicode.com/posts/' + postId)
      if (data.data.userId !== this.currentUser.id) {
        await this.getCurrentUser(data.data.userId);
      }
        mutations.setSinglePost(data.data);
        mutations.setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  },

  // принимает ID пользователя (userID в объекте сообщения)
  // получает объект пользователя, чье сообщение выбрано и записывает его в переменную currentUser
  async getCurrentUser(userId) {
    try {
      let data = await axios.get('https://jsonplaceholder.typicode.com/users/' + userId)
      mutations.setCurrentUser(data.data);
      mutations.setIsLoadedUser(true);
    } catch (err) {
      console.log(err);
    }
  },

  // принимает ID пользователя
  // получает список сообщений выбранного пользователя и записывает его в переменную currentPosts
  async getCurrentPosts(userId) {
    try {
      let data = await axios.get('https://jsonplaceholder.typicode.com/posts?userId=' + userId)
      mutations.setCurrentPosts(data.data);
    } catch (err) {
      console.log(err);
    }
  },

  // обнуляет переменные, соответствующие выбранному сообщению и пользователю
  // используется при загрузке страницы со списком сообщений (PostList)
  resetCurrent() {
    mutations.setSinglePost({});
    mutations.setCurrentUser({});
    mutations.setIsLoaded(false);
    mutations.setIsLoadedUser(false);
  }
}

export const mutations = {
  setPosts: payload => state.posts = payload,
  setSinglePost: payload => state.singlePost = payload,
  setCurrentUser: payload => state.currentUser = payload,
  setCurrentPosts: payload => state.currentPosts = payload,
  setIsLoaded: payload => state.isLoaded = payload,
  setIsLoadedUser: payload => state.isLoaded = payload
}

export const getters = {
  posts: () => state.posts,
  singlePost: () => state.singlePost,
  currentUser: () => state.currentUser,
  currentPosts: () => state.currentPosts,
  isLoaded: () => state.isLoaded,
  isLoadedUser: () => state.isLoaded
}
