const state = {
  loading: true,
}

// getters
const getters = {
  getLoading (state) {
    return state.loading
  }
}

// mutations
const mutations = {
  setLoading (state, payload) {
    state.loading = payload
  }
}

export default {
  state,
  getters,
  mutations
}
