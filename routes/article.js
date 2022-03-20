const router = require('koa-router')()
const ArticleController = require('../controller/article')
router.prefix('/articles')

// 添加文章
router.post('/add', ArticleController.addArticle)

// 分页查询文章列表
router.get('/find', ArticleController.findArticleList)
// 根据id查询文章
router.get('/findbyid/:id', ArticleController.findArticleById)
module.exports = router
