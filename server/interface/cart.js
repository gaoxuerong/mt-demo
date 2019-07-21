import Router from 'koa-router'
import Cart from '../dbs/models/cart'
import md5 from 'crypto-js/md5' // encryption

const router = new Router({
  prefix: '/cart'
})

router.post('/create', async ctx => {
  if (!ctx.isAuthenticated()) { // isAuthenticated Whether to log in
    ctx.body = {
      code: -1,
      msg: 'please login'
    }
  } else {
    const time = Date() // Date: For the same time zone
    const cartNo = md5(Math.random() * 1000 + time).toString()
    const { params: { id, detail }} = ctx.request.body // ctx.request.body: post Way to get data
    const cart = new Cart({
      id,
      cartNo,
      time,
      user: ctx.session.passport.user,
      detail
    })
    const result = await cart.save() // Stored in the database
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

router.post('/getCart', async ctx => {
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

export default router
