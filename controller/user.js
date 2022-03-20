const jwt = require('jsonwebtoken')
const { User } = require('../models/user')
const crud = require('./crud/index')
/**
 * 登录
 * @param {*} ctx 
 */
const login = async (ctx) => {
  let { username, pwd } = ctx.request.body
  let res = await crud.find(User, { username, pwd })
  if (res) {
    let token = jwt.sign({
      username: res.data.username,
      _id: res.data._id
    }, 'jianshu-server-jwt', { expiresIn: 3600 * 24 * 7 })
    ctx.body = {
      code: 200,
      message: '登录成功',
      token
    }
  }
  else {
    ctx.body = {
      code: 201,
      message: '登录失败，请检查用户名密码'
    }
  }
}

/**
 * 注册
 * @param {*} ctx 
 */
const register = async (ctx) => {
  let { username, pwd } = ctx.request.body
  let isRegister = false
  let res = await crud.find(User, { username })
  if (res) {
    isRegister = true
  }
  if (isRegister) {
    ctx.body = {
      code: 300,
      message: '用户名已存在'
    }
    return
  }
  const register = await crud.save(User, { username, pwd })
  if (register) {
    ctx.body = register
  }
}
/**
 * 校验登录
 * @param {*} ctx 
 */
const verify = async (ctx) => {
  let token = ctx.header.authorization
  token = token.replace('Bearer ', '')
  try {
    let result = jwt.verify(token, 'jianshu-server-jwt')
    await User.findOne({ _id: result._id }).then(res => {
      if (res) {
        ctx.body = {
          code: 200,
          message: '用户认证成功',
          user: res
        }
      } else {
        ctx.body = {
          code: 300,
          message: '用户认证失败',
        }
      }
    })
  } catch (error) {
    ctx.body = {
      code: 300,
      message: '用户认证失败',
      error
    }
  }
}


/**
 *添加用户
 *
 * @param {*} ctx
 */
const userAdd = async (ctx) => {
  let { username = '', pwd = '' } = ctx.request.body
  let res = await crud.save(User, { username, pwd }, ctx)
  if (res) {
    ctx.body = res
  }

}
/**
 *修改用户
 *
 * @param {*} ctx
 */
const userUpdate = async (ctx) => {
  let { _id = '', username = '', pwd = '' } = ctx.request.body
  let res = await crud.update(User, { _id }, { username, pwd })
  ctx.body = res
}
/**
 *删除用户
 *
 * @param {*} ctx
 */
const deleteUserById = async (ctx) => {
  let _id = ctx.params.id
  let res = await crud.del(User, { _id })
  ctx.body = res
}

/**
 *根据id查询用户
 *
 * @param {*} ctx
 */
const findById = async (ctx) => {
  let _id = ctx.params.id
  let res = await crud.find(User, { _id })
  ctx.body = res

}
/**
*根据username查询用户
*
* @param {*} ctx
*/
const findByUsername = async (ctx) => {
  let { username = '' } = ctx.query
  let res = await crud.find(User, { username })
  ctx.body = res
}
/**
 *查询所有用户
 *
 * @param {*} ctx
 */
const findUsers = async (ctx) => {
  let res = await crud.find(User)
  ctx.body = res
}
module.exports = {
  userAdd,
  userUpdate,
  deleteUserById,
  findById,
  findByUsername,
  findUsers,
  login,
  register,
  verify,
}
