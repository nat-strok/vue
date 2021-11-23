import Vue from 'vue'
import axios from 'axios'

const state = Vue.observable({
  anime: [],
  isLoaded: false
})

export const actions = {
  async getData() {
    mutations.setIsLoaded(false)
    try {
      let data = await axios.get('https://api.jikan.moe/v3/top/anime')
      mutations.setData(data.data.top)
      mutations.setIsLoaded(true)
    } catch (err) {
      console.log(err)
    }
  }
}

export const mutations = {
  setData: payload => state.anime = payload,
  setIsLoaded: payload => state.isLoaded = payload
}

export const getters = {
  anime: () => state.anime,
  isLoaded: () => state.isLoaded
}
