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
    api.get(config.url + 'comments')
      .then(response => {
        commit('setComments', response.records)
      })
      .catch(error => (console.log(error.toJSON())))
    
  },
  getComment ({ commit }, commentId) {
    api.get(config.url + 'comments/' + commentId)
      .then(response => {
        commit('setComment', response.record)
      })
      .catch(error => (console.log(error.toJSON())))
  },
  
  // eslint-disable-next-line no-unused-vars
  createComment ({ commit }, payload) {
    api.post(config.url + 'comments/' + payload.postId, payload.data)
      .then()
      .catch(error => (console.log(error.toJSON())))
  },
  
  // eslint-disable-next-line no-unused-vars
  // updateComment ({ commit }, payload) {
  //   api.update(config.url + 'comments/' + payload.commentId, payload.data)
  //     .then()
  //     .catch(error => (console.log(error.toJSON())))
  // },
  
  deleteComment ({ commit }, commentId) {
    api.destroy(config.url + 'comments/' + commentId)
      .then(response => {
        commit('delComment', response.record)
      })
      .catch(error => (console.log(error.toJSON())))
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
