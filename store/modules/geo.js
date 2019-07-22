export const state = () => ({
  position: {}
})

export const mutations = {
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

export const actions = {
  setPosition: ({ commit }, position) => {
    commit('setPosition', position)
  }
}
