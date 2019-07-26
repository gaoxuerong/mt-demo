// export const actions = {
//   async nuxtServerInit({ commit }, { req, app }) {
//     const { status, data: { province, city } } = await app.$axios.get('/geo/getPosition')
//     commit('geo/setPosition', status === 200 ? {
//       city,
//       province
//     } : {
//       city: '',
//       province: ''
//     })
//   }
// }

export const state = {
  userName: '111'
}
export const actions = {
  userName: '111'
}
