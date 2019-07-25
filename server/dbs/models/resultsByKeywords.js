const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ResultsByKeywords = new Schema({
  count: {
    type: Number,
    require: true
  },
  pois: {
    type: Array,
    require: true
  }
})

module.exports = mongoose.model('ResultsByKeywords', ResultsByKeywords)
