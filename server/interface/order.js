const Router = require('koa-router')
const md5 = require('crypto-js/md5')
const Order = require('../dbs/models/order')
const Cart = require('../dbs/models/cart')
// 加密

const router = new Router({ prefix: '/order' })

// 创建购物车分类栏
router.post('/createOrder', async (ctx) => {
  const { id, price, count } = ctx.request.body
  const time = Date()
  const orderID = md5(Math.random() * 1000 + time).toString()
  // isAuthenticated 是否登录
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: '请先登录!'
    }
  } else {
    const findCart = await Cart.findOne({ cartNo: id })
    const order = new Order({
      id: orderID,
      count,
      total: price * count,
      time,
      user: ctx.session.passport.user,
      name: findCart.detail[0].name,
      imsg: findCart.detail[0].imgs,
      status: 0
    })
    try {
      const result = await order.save()
      if (result) {
        await findCart.remove()
        ctx.body = {
          code: 0,
          id: orderID
        }
      } else {
        ctx.body = {
          code: -1
        }
      }
    } catch (e) {
      ctx.body = {
        code: -1
      }
    }
  }
})

// 获取购物车分类栏
router.post('/getOrders', async (ctx) => {
  // isAuthenticated 是否登录
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      list: [],
      msg: 'please login'
    }
  } else {
    try {
      // find 查询所有
      const result = await Order.find()
      if (result) {
        ctx.body = {
          code: 0,
          list: result
        }
      } else {
        ctx.body = {
          code: -1
        }
      }
    } catch (e) {
      ctx.body = {
        code: -1,
        list: []
      }
    }
  }
})

module.exports = router
