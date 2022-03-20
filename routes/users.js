const router = require('koa-router')()
const userController = require('../controller/user')
router.prefix('/users')

// 添加用户

router.post('/add', userController.userAdd)
// 修改用户
router.put('/update', userController.userUpdate)
// 删除用户
router.delete('/del/:id', userController.deleteUserById)
// 根据id查询用户
router.get('/find/:id', userController.findById)
// 根据username查询用户
router.get('/find-by-username', userController.findByUsername)
// 查询用户
router.get('/find', userController.findUsers)

// 登录用户
router.post('/login', userController.login)
// 注册用户
router.post('/register', userController.register)
// 校验用户
router.post('/verify', userController.verify)

module.exports = router
