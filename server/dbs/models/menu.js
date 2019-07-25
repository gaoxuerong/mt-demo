const mongoose = require('mongoose')

const Schema = mongoose.Schema
const Menu = new Schema({
  menu: {
    type: Array,
    require: true
  }
})

module.exports = mongoose.model('Menu', Menu)
