const Router = require('koa-router')
const md5 = require('crypto-js/md5')
const Cart = require('../dbs/models/cart')

const router = new Router({
  prefix: '/cart'
})

router.post('/create', async (ctx) => {
  if (!ctx.isAuthenticated()) { // isAuthenticated Whether to log in
    ctx.body = {
      code: -1,
      msg: 'please login'
    }
  } else {
    const time = Date()
    const cartNo = md5(Math.random() * 1000 + time).toString()
    const { params: { id, detail } } = ctx.request.body
    const cart = new Cart({
      id,
      cartNo,
      time,
      user: ctx.session.passport.user,
      detail
    })
    const result = await cart.save()
    if (result) {
      ctx.body = {
        code: 0,
        msg: '',
        id: cartNo
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'fail'
      }
    }
  }
})

router.post('/getCart', async (ctx) => {
  const { id } = ctx.request.body
  try {
    const result = await Cart.findOne({ cartNo: id })
    ctx.body = {
      code: 0,
      data: result ? result.detail[0] : {}
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      data: {}
    }
  }
})

module.exports = router
