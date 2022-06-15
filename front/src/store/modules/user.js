// import config from '@/configs/index'
// import api from '@/api/index'

const state = {
  token: null,
  user: {},
  permissions: [],
  isAuth: false
}

// getters
const getters = {
  getUser (state) {
    return state.user
  },
  getToken (state) {
    return state.token
  },
  getPermissions (state) {
    return state.permissions
  }
}

// actions
const actions = {
  
  // getPosts ({ commit }) {
  //   api.get(config.url + 'posts')
  //     .then(response => {
  //       commit('setPosts', response.records)
  //     })
  //     .catch(error => (console.log(error.toJSON())))
  // },
  
}

// mutations
const mutations = {

}

export default {
  state,
  getters,
  actions,
  mutations
}
