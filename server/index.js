const Koa = require('koa')
const consola = require('consola')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser') // Parsing the middleware of the body, this.body can get the data directly in koa. Post parameter acquisition
const session = require('koa-generic-session') // supports Delay session getter
const Redis = require('koa-redis') // Redis storage for koa session middleware/cache.
const json = require('koa-json')
const { Nuxt, Builder } = require('nuxt')
const config = require('../nuxt.config.js')
const dbConfig = require('./dbs/config.js')
const passport = require('./interface/utils/passport.js')
const users = require('./interface/users.js')
const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.keys = ['mt', 'keyskeys']
app.proxy = true
app.use(
  session({
    key: 'mt',
    prefix: 'mt:uid',
    store: new Redis()
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(
  bodyParser({
    extendTypes: ['json', 'form', 'text']
  })
)

app.use(json())

mongoose.connect(
  dbConfig.dbs,
  {
    useNewUrlParser: true
  }
)

config.dev = !(app.env === 'production')

async function start() {
  const nuxt = new Nuxt(config)
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  app.use(users.routes()).use(users.allowedMethods())
  app.use((ctx) => {
    ctx.status = 200
    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, (promise) => {
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
