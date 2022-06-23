import api from '@/api'
import config from '@/configs'

const state = {
  user: {},
  permission: '',
  isAuth: false
}

// getters
const getters = {
  getUser (state) {
    return state.user
  },
  isAdmin (state) {
    return state.permission === 'administrator' && state.isAuth
  },
  isModerator (state) {
    return state.permission === 'moderator' && state.isAuth
  },
  isWriter (state) {
    return state.permission === 'writer' && state.isAuth
  },
  isReader (state) {
    return state.permission === 'reader' && state.isAuth
  },
  isAuth (state) {
    return state.isAuth
  },
}

// actions
const actions = {
  login ({ commit }, payload) {
    api.get(config.urlCsrf + 'sanctum/csrf-cookie')
      .then(() => {
        api.post(config.url + 'login', { email: payload.email, password: payload.password })
          .then(response => {
            commit('setUser', response.record)
          })
          .catch(error => (console.log(error.toJSON())))
      })
      .catch(error => (console.log(error.toJSON())))
  },
  
  logout ({ commit }) {
    api.post(config.url + 'logout')
      .then(() => {
        commit('unsetUser')
      })
      .catch(error => (console.log(error.toJSON())))
  }
}

// mutations
const mutations = {
  setUser (state, payload) {
    state.isAuth = true
    state.user = payload
    state.permission = [...payload.role].shift().name
  },
  
  unsetUser (state) {
    state.isAuth = false
    state.user = {}
    state.permission = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
