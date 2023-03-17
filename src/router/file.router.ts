import KoaRouter from '@koa/router'
import fileController from '../controller/file.controller'
import { handleAvatar, handleOldAvatar } from '../middleware/file.middleware'
import { verifyAuth } from '../middleware/login.middleware'

const fileRouter = new KoaRouter({ prefix: '/file' })

// 上传头像接口
fileRouter.post('/avatar', verifyAuth, handleAvatar, handleOldAvatar, fileController.create)

export default fileRouter
