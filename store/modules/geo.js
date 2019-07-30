const state = () => ({
  position: {}
})

const actions = {
  setPosition: ({ commit }, position) => {
    commit('setPosition', position)
  }
}

export default {
  namespaced: true,
  state,
  actions
}
