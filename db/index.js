const mongoose = require('mongoose')

module.exports = () => {
  mongoose.connect('mongodb://root:mongo020412@101.132.40.57:27017/jianshu?authSource=admin')
    .then(() => {
      console.log('数据库连接成功')
    })
    .catch(err => {
      console.log('连接失败', err)
    })
}