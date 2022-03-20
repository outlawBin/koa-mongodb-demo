/**
 *添加
 *
 * @param {*} model 模型
 * @param {*} params 添加对象
 */
const save = (model, params) => (
  model.create(params).then(res => {
    if (res) {
      return {
        code: 200,
        msg: '添加成功',
        data: res
      }
    }
    else {
      return {
        code: 201,
        msg: '添加失败'
      }
    }
  }, err => {
    console.error(error)
    return {
      code: 202,
      msg: '添加时出现异常',
      data: err
    }
  })
)

/**
 *修改
 *
 * @param {*} model 模型
 * @param {*} where 条件
 * @param {*} params 修改对象
 */
const update = (model, where, params) => (
  model.updateMany(where, params).then(res => {
    if (res.modifiedCount) {
      return {
        code: 200,
        msg: '修改成功',
        data: res
      }
    }
    else {
      return {
        code: 201,
        msg: '修改失败'
      }
    }
  }, error => {
    console.error(error)
    return {
      code: 202,
      msg: '修改时出现异常',
      data: error
    }
  })
)

/**
 *删除
 *
 * @param {*} model 模型
 * @param {*} where 条件
 */
const del = (model, where) => (
  model.deleteMany(where).then(res => {
    if (res.deletedCount) {
      return {
        code: 200,
        msg: '删除成功',
        data: res
      }
    } else {
      return {
        code: 201,
        msg: '删除失败',
      }
    }
  }, error => {
    return {
      code: 202,
      msg: '删除时出现异常',
      data: error
    }
  })
)

/**
 *查询
 *
 * @param {*} model 模型
 * @param {*} where 条件 默认为null 查所有
 * @param {*} projection 选择查询字段，默认为 null
 * @param {*} options 选项 默认为null
 * 
 */
const find = (model, where, projection = null, options = null) => (
  model.find(where, projection, options).then(res => {
    if (res) {
      return {
        code: 200,
        msg: '查询成功',
        data: res
      }
    } else {
      return {
        code: 201,
        msg: '查询失败',
        data: res
      }
    }
  }, error => {
    return {
      code: 202,
      msg: '查询时出现异常',
      data: error
    }
  })
)


module.exports = {
  save, update, del, find
}
