const dbConfig = {
  dbs: 'mongodb://127.0.0.1:27017/mt-demo',
  redis: {
    get host() {
      return '127.0.0.1'
    },
    get port() {
      return 6379
    }
  },
  smtp: {
    get host() {
      return 'smtp.qq.com'
    },
    get user() {
      return '1991403547@qq.com'
    },
    get pass() {
      return 'wxjpitybeznajhef'
    },
    get code() {
      return () => {
        return Math.random()
          .toString(16)
          .slice(2, 6)
          .toUpperCase()
      }
    },
    get expire() {
      return () => {
        return new Date().getTime() + 60 * 60 * 1000
      }
    }
  },
  sign: '3bb84230a3a155fa4d39890d04e8b123', // 请求线上作者定义的数据才用到
  requestUrl: 'http://cp-tools.cn' // 请求线上作者定义的数据才用到
}

module.exports = dbConfig
