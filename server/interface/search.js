const Router = require('koa-router')
const Config = require('../dbs/config')
const axios = require('./utils/axios')
// import Poi from '../dbs/models/poi'
// import ResultsByKeywords from '../dbs/models/resultsByKeywords'
// import Products from '../dbs/models/products'

const router = new Router({
  prefix: '/search'
})
const sign = Config.sign
router.get('/top', async (ctx) => {
  // try {
  //   const top = await Poi.find({
  //     name: new RegExp(ctx.query.input), // ctx.query.input & ctx.query.city: searchbar.vue pass parameter
  //     city: ctx.query.city
  //   })
  //   ctx.body = {
  //     code: 0,
  //     top: top.map((item) => {
  //       return {
  //         name: item.name,
  //         type: item.type
  //       }
  //     })
  //   }
  // } catch (e) {
  //   ctx.body = {
  //     code: -1,
  //     top: []
  //   }
  // }
  const { status, data: { top }} = await axios.get(`${Config.requestUrl}/search/top`, {
    params: {
      input: ctx.query.input,
      city: ctx.query.city,
      sign
    }
  })
  ctx.body = {
    top: status === 200 ? top : []
  }
})

router.get('/hotPlace', async (ctx) => {
  // const city = ctx.store ? ctx.store.geo.position.city : ctx.query.city // ctx.query.city: store/index.js pass parameter
  // try {
  //   const result = await Poi
  //     .find({
  //       city,
  //       type: ctx.query.type || '景点'
  //     })
  //     .limit(10)
  //   ctx.body = {
  //     code: 0,
  //     result: result.map((item) => {
  //       return {
  //         name: item.name,
  //         type: item.type
  //       }
  //     })
  //   }
  // } catch (e) {
  //   ctx.body = {
  //     code: -1,
  //     result: []
  //   }
  // }
  const city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  const { status, data: { result }} = await axios.get(`${Config.requestUrl}/search/hotPlace`, {
    params: {
      sign,
      city
    }
  })
  ctx.body = {
    result: status === 200 ? result : []
  }
})

router.get('/resultsByKeywords', async (ctx) => {
  // try {
  //   const result = await ResultsByKeywords.findOne()
  //   ctx.body = {
  //     count: result.count,
  //     pois: result.pois
  //   }
  // } catch (e) {
  //   ctx.body = {
  //     count: 0,
  //     pois: []
  //   }
  // }
  const { city, keyword } = ctx.query
  const { status, data: { count, pois }} = await axios.get(`${Config.requestUrl}/search/resultsByKeywords`, {
    params: {
      city,
      keyword,
      sign
    }
  })
  ctx.body = {
    count: status === 200 ? count : 0,
    pois: status === 200 ? pois : []
  }
})

router.get('/products', async (ctx) => {
  // const keyword = ctx.query.keyword || '旅游'
  // const city = ctx.query.city || '北京'
  // try {
  //   const result = await Products.findOne({ city })
  //   ctx.body = {
  //     keyword: result.keyword,
  //     product: result.product,
  //     more: ctx.isAuthenticated() ? result.more : [],
  //     login: ctx.isAuthenticated(), // ctx.isAuthenticated(): Is it logged in??
  //     type: result.type
  //   }
  // } catch (e) {
  //   ctx.body = {
  //     keyword: '',
  //     product: {},
  //     more: [],
  //     login: false,
  //     type: ''
  //   }
  // }
  const keyword = ctx.query.keyword || '旅游'
  const city = ctx.query.city || '北京'
  const { status, data: { product, more }} = await axios.get(`${Config.requestUrl}/search/products`, {
    params: {
      keyword,
      city,
      sign
    }
  })
  if (status === 200) {
    ctx.body = {
      product,
      more: ctx.isAuthenticated() ? more : [],
      login: ctx.isAuthenticated()
    }
  } else {
    ctx.body = {
      product: {},
      more: ctx.isAuthenticated() ? more : [],
      login: ctx.isAuthenticated()
    }
  }
})

module.exports = router
