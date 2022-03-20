const { Article } = require('../models/article')
const crud = require('./crud/index')

const addArticle = async (ctx) => {
  let tmpArticle = ctx.request.body
  let article = { ...tmpArticle, "createTime": Date.now() }
  let res = await crud.save(Article, article, ctx)
  if (res) {
    ctx.body = res
  }
}
// 查询文章列表
const findArticleList = async (ctx) => {
  let { page } = ctx.query
  if (!page || isNaN(Number(page))) {
    page = 1
  } else {
    page = Number(page)
  }
  // 每页条数
  let pageSize = 10
  // 总条数
  let count = 0
  count = await Article.find().count()
  // 总页数
  let totalPage = 0
  if (count > 0) {
    // 向上取整
    totalPage = Math.ceil(count / pageSize)
  }
  if (page > totalPage) page = totalPage
  if (page < 1) page = 1
  // 开始位置
  let start = (page - 1) * pageSize
  let res = await Article.find().skip(start).limit(pageSize)
  if (res && res.length > 0) {
    ctx.body = {
      code: 200,
      message: '查询成功',
      data: {
        res,
        page,
        pageSize,
        count,
        totalPage
      }
    }
  } else {
    ctx.body = {
      code: 201,
      message: '查询失败'
    }
  }
}
// 查询文章
const findArticleById = async (ctx) => {
  let id = ctx.params.id
  let res = await crud.find(Article, { id })
  if (res) {
    ctx.body = res
  }
}

module.exports = {
  addArticle,
  findArticleList,
  findArticleById
}