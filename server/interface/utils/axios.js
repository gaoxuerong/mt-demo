const axios = require('axios')
const instance = axios.create({ // craete axios instance
  baseURL: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`,
  timeout: 5000,
  headers: {}
})

module.exports = instance
