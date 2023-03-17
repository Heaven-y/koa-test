import KoaRouter from '@koa/router'
import loginController from '../controller/login.controller'
import { verifyAuth, verifyLogin } from '../middleware/login.middleware'

const loginRouter = new KoaRouter({ prefix: '/login' })

// 登录接口
loginRouter.post('/', verifyLogin, loginController.login)
// 测试验证token
loginRouter.get('/testToken', verifyAuth, loginController.testToken)

export default loginRouter
