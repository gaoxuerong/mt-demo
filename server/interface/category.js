const Router = require('koa-router')
const Config = require('../dbs/config')
const axios = require('./utils/axios')

const router = new Router({
  prefix: '/category'
})
const sign = Config.sign

// products.vue
router.get('/crumbs', async (ctx) => {
  const { status, data: { areas, types } } = await axios.get(`${Config.requestUrl}/categroy/crumbs`, {
    params: {
      city: ctx.query.city.replace('市', '') || '北京',
      sign
    }
  })
  ctx.body = {
    areas: status === 200 ? areas : [],
    types: status === 200 ? types : []
  }
})

module.exports = router
