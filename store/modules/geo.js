const state = () => ({
  position: {}
})

const mutations = {
  setPosition(state, val) {
    state.position = val
  },
  setCity(state, val) {
    state.position.city = val
  },
  setProvince(state, val) {
    state.position.province = val
  }
}

const actions = {
  setPosition: ({ commit }, position) => {
    commit('setPosition', position)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
