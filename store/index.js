const Vue = require('vue')
const Vuex = require('vuex')

// const geo = require('./modules/geo.js')
// const home = require('./modules/home')
// const search = require('./modules/search')

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    mutations: {
      setPosition(state, val) {
        state.position = val
      },
      setCity(state, val) {
        state.position.city = val
      },
      setProvince(state, val) {
        state.position.province = val
      }
    },
    actions: {
      async nuxtServerInit({ commit }, { req, app }) { // nuxtServerInit 将服务端的一些数据传到客户端
        {
          const {
            status,
            data: { province, city }
          } = await app.$axios.get('/geo/getPosition')
          commit('setPosition', status === 200 ? { city, province } : { city: '', province: '' })
        }
        // {
        //   const {
        //     status,
        //     data: { menu }
        //   } = await app.$axios.get('/geo/menu')
        //   commit('home/setMenu', status === 200 ? menu : [])
        // }
        // {
        //   const {
        //     status,
        //     data: { result }
        //   } = await app.$axios.get('/search/hotPlace', {
        //     params: {
        //       city: app.store.state.geo.position.city.replace('市', '')
        //     }
        //   })
        //   commit('search/setHotPlace', status === 200 ? result : [])
        // }
      }
    }
  })

export default store
