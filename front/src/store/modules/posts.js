import config from '@/configs/index'
import api from '@/api/index'

const state = {
  posts: [],
  post: {},
  checkNextPostPage: false
}

// getters
const getters = {
  getPosts (state) {
    return state.posts
  },
  getPost (state) {
    return state.post
  },
  checkNextPostPage (state) {
    return state.checkNextPostPage
  }
}

// actions
const actions = {
  
  getPosts ({ commit }, payload) {
    api.get(config.url + 'posts?page=' + payload)
      .then(response => {
        commit('setLoading', true)
        commit('setCheckNextPostPage', response.meta)
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
    state.posts = state.posts.concat(payload)
  },
  
  setPost (state, payload) {
    state.post = payload
  },
  
  addPost (state, payload) {
    state.posts.push(payload)
  },
  
  addCommentToPost (state, payload) {
    state.post.comments.push(payload)
  },
  
  setCheckNextPostPage (state, payload) {
    state.checkNextPostPage = payload.current_page < payload.last_page
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
