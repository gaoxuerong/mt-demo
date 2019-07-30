const Vue = require('vue')
const Vuex = require('vuex')

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    state: () => ({
      position: {}
    }),
    mutations: {
      setPosition(state, val) {
        state.position = val
      },
      setCity(state, val) {
        state.position.city = val
      },
      setProvince(state, val) {
        state.position.province = val
      },
      setMenu(state, val) {
        state.menu = val
      },
      setHotPlace(state, val) {
        state.hotPlace = val
      }
    },
    actions: {
      async nuxtServerInit({ commit }, { req, app }) {
        {
          const {
            status,
            data: { province, city }
          } = await app.$axios.get('/geo/getPosition')
          commit('setPosition', status === 200 ? { city, province } : { city: '', province: '' })
        }
        {
          const {
            status,
            data: { menu }
          } = await app.$axios.get('/geo/menu')
          commit('home/setMenu', status === 200 ? menu : [])
        }
        {
          const {
            status,
            data: { result }
          } = await app.$axios.get('/search/hotPlace', {
            params: {
              city: app.store.state.position.city.replace('市', '')
            }
          })
          commit('search/setHotPlace', status === 200 ? result : [])
        }
      }
    }
  })

export default store
