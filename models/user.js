const mongoose = require('mongoose')

// 系统对象模型对象
const Schema = new mongoose.Schema({
  username: String,
  pwd: {
    type: String,
    select: false
  },
  avatar: {
    type: String,
    default: '',
  },
  sex: {
    type: String,
    default: '',
  },
  desc: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
  },

})


const User = mongoose.model('users', Schema)

module.exports = {
  User
}
