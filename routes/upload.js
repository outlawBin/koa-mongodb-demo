const multer = require('@koa/multer')
const { dir } = require('console')
const fs = require('fs')
const path = require('path')
const router = require('koa-router')()
router.prefix('/upload')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let date = new Date()
    let year = date.getFullYear() + ''
    let month = date.getMonth() + 1 + ''
    let day = date.getDate() + ''

    let dir = path.join('./public/files', year, month, day)
    // 判断文件夹是否存在
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true
      })
    }
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    // 设置文件名
    let filename = file.originalname + '-' + Date.now() + path.extname(file.originalname)
    cb(null, filename)
  }
})

const upload = multer({ storage })
// 上传图片接口
router.post('/img', upload.single('myfile'), async ctx => {

  let filepath = ctx.file.path
  // let replacepath = path.join(__dirname)
  filepath = ctx.origin + '' + filepath.replace('public', '')
  ctx.body = {
    data: filepath
  }
})
module.exports = router