const mongoose = require('mongoose')

const Schema = mongoose.Schema
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  }
})
const User = mongoose.model('User', UserSchema)
module.exports = User
