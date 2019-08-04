const Router = require('koa-router')
const Config = require('../dbs/config')
const axios = require('./utils/axios')
const router = new Router({
  prefix: '/geo'
})
const sign = Config.sign

router.get('/getPosition', async (ctx) => {
  const {
    status,
    data: { province, city }
  } = await axios.get(`${Config.requestUrl}/geo/getPosition?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      province,
      city
    }
  } else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
})

router.get('/menu', async (ctx) => {
  const {
    status,
    data: { menu }
  } = await axios.get(`${Config.requestUrl}/geo/menu?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      menu
    }
  } else {
    ctx.body = {
      menu: []
    }
  }
})
router.get('/province', async (ctx) => {
  const {
    status,
    data: { province }
  } = await axios.get(`${Config.requestUrl}/geo/province?sign=${sign}`)
  ctx.body = {
    province: status === 200 ? province : []
  }
})

router.get('/province/:id', async (ctx) => {
  const {
    status,
    data: { city }
  } = await axios.get(
    `${Config.requestUrl}/geo/province/${ctx.params.id}?sign=${sign}`
  )
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
})

router.get('/city', async (ctx) => {
  const {
    status,
    data: { city }
  } = await axios.get(`${Config.requestUrl}/geo/city?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
})

router.get('/hotCity', async (ctx) => {
  const {
    status,
    data: { hots }
  } = await axios.get(`${Config.requestUrl}/geo/hotCity?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      hots
    }
  } else {
    ctx.body = {
      hots: []
    }
  }
})

module.exports = router
