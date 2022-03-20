const mongoose = require('mongoose')

// 系统对象模型对象
const Schema = new mongoose.Schema({
  id: Number,
  title: String,
  createTime: Date,
  content: String, // 文章内容
  stemfrom: String, // 来源
  read: { // 阅读量
    type: Number,
    default: 0,
  },
  star: { // 点赞量
    type: Number,
    default: 0,
  },
  comment: { // 评论数
    type: Number,
    default: 0,
  },
  author: { // 作者
    type: String,
    default: 'outlaw',
  },
})

const Article = mongoose.model('articles', Schema)

module.exports = {
  Article
}
