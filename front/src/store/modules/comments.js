import config from '@/configs/index'
import api from '@/api/index'

const state = {
  comments: [],
  comment: {},
  checkNextCommentPage: false
}

// getters
const getters = {
  getComments (state) {
    return state.comments
  },
  getComment (state) {
    return state.comment
  },
  checkNextCommentPage (state) {
    return state.checkNextCommentPage
  }
}

// actions
const actions = {
  
  getComments ({ commit }, payload) {
    api.get(config.url + 'comments?page=' + payload)
      .then(response => {
        commit('setLoading', true)
        commit('setCheckNextCommentPage', response.meta)
        commit('setComments', response.records)
        commit('setLoading', false)
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
  
  createComment ({ commit }, payload) {
    api.post(config.url + 'comments/' + payload.postId, payload.data)
      .then(response => {
        commit('addCommentToPost', response.record)
      })
      .catch(error => (console.log(error.toJSON())))
  },
  
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
    state.comments = state.comments.concat(payload)
  },
  setCheckNextCommentPage (state, payload) {
    state.checkNextCommentPage = payload.current_page < payload.last_page
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
