import Router from 'koa-router'
// import axios from './utils/axios'
// import Config from '../dbs/config'
import Categroy from '../dbs/models/category'

const router = new Router({
  prefix: '/category'
})
// const sign = Config.sign

// products.vue
router.get('/crumbs', async ctx => {
  // Operating a local database
  const result = await Categroy.findOne({
    city: ctx.query.city
  })
  if (result) {
    ctx.body = {
      areas: result.areas,
      types: result.types
    }
  } else {
    ctx.body = {
      areas: [],
      types: []
    }
  }
  // Online service
  // const { status, data: { areas, types }} = await axios.get(`${Config.requestUrl}/categroy/crumbs`, {
  //   params: {
  //     city: ctx.query.city.replace('市', '') || '北京',
  //     sign
  //   }
  // })
  // ctx.body = {
  //   areas: status === 200 ? areas : [],
  //   types: status === 200 ? types : []
  // }
})

export default router
