const mongoose = require('mongoose')

const Schema = mongoose.Schema
const PositionSchema = new Schema({
  province: {
    type: String,
    require: true
  },
  city: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('Position', PositionSchema)
