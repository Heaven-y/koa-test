import KoaRouter from '@koa/router'
import userController from '../controller/user.controller'
import { verifyUser, handlePassWord } from '../middleware/user.middleware'

const userRouter = new KoaRouter({ prefix: '/user' })

// 用户注册
userRouter.post('/', verifyUser, handlePassWord, userController.create)
// 查看用户头像
userRouter.get('/avatar/:userId', userController.getAvatarByUserId)

export default userRouter
