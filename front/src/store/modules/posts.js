import config from '@/configs/index'
import api from '@/api/index'

const state = {
  posts: [],
  post: {}
}

// getters
const getters = {
  getPosts (state) {
    return state.posts
  },
  getPost (state) {
    return state.post
  }
}

// actions
const actions = {
  
  getPosts ({ commit }) {
    api.get(config.url + 'posts')
      .then(response => {
        commit('setLoading', true)
        commit('setPosts', response.records)
        commit('setLoading', false)
      })
      .catch(error => (console.log(error.toJSON())))
  },
  
  getPost ({ commit }, postId) {
    api.get(config.url + 'posts/' + postId)
      .then(response => {
        commit('setLoading', true)
        commit('setPost', response.record)
        commit('setLoading', false)
      })
      .catch(error => (console.log(error.toJSON())))
  },
  
  createPost ({ commit }, payload) {
    api.post(config.url + 'posts', payload.data)
      .then(response => {
        commit('addPost', response.record)
      })
      .catch(error => (console.log(error.toJSON())))
  },
  
  updatePost ({ commit }, payload) {
    api.update(config.url + 'posts/' + payload.postId, payload.data)
      .then(response => {
        commit('updPost', response.record)
      })
      .catch(error => (console.log(error.toJSON())))
  },
  
  deletePost ({ commit }, postId) {
    api.destroy(config.url + 'posts/' + postId)
      .then(response => {
        commit('delPost', response.record)
      })
      .catch(error => (console.log(error.toJSON())))
  }
}

// mutations
const mutations = {
  setPosts (state, payload) {
    state.posts = payload
  },
  setPost (state, payload) {
    state.post = payload
  },
  addPost (state, payload) {
    state.posts.push(payload)
  },
  updPost (state, payload) {
    state.post = payload
  },
  delPost (state, payload) {
    state.posts = state.posts.filter(function (item) {
      return item.id !== payload.id
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
