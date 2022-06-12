import config from '@/configs/index'
import api from '@/api/index'

const state = {
  comments: [],
  comment: {}
}

// getters
const getters = {
  getComments (state) {
    return state.comments
  },
  getComment (state) {
    return state.comment
  }
}

// actions
const actions = {
  
  getComments ({ commit }) {
    api.get(config.url + 'comments').then(
      response => (commit('setComments', response.records))
    )
    
  },
  getComment ({ commit }, commentId) {
    api.get(config.url + 'comments/' + commentId).then(
      response => (commit('setComment', response.record))
    ).catch(error => (console.log(error.toJSON())))
  },
  
  createComment ({ commit }, data) {
    api.update(config.url + 'comments', data).then(
      response => (commit('addComment', response.record))
    ).catch(error => (console.log(error.toJSON())))
  },
  
  updateComment ({ commit }, commentId, data) {
    api.update(config.url + 'comments/' + commentId, data).then(
      response => (commit('updComment', response.record))
    ).catch(error => (console.log(error.toJSON())))
  },
  
  deleteComment ({ commit }, commentId) {
    api.destroy(config.url + 'comments/' + commentId).then(
      response => (commit('delComment', response.record))
    ).catch(error => (console.log(error.toJSON())))
  }
}

// mutations
const mutations = {
  setComments (state, payload) {
    state.comments = payload
  },
  setComment (state, payload) {
    state.comment = payload
  },
  addComment(state, payload) {
    state.comments.push(payload)
  },
  updComment (state, payload) {
    state.comments = state.comments.map(function (item) {
      return item.id === payload.id ? payload : item
    })
  },
  delComment (state, payload) {
    state.comments = state.comments.filter(function (item) {
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
