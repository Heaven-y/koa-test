import fileService from '../service/file.service'
import userService from '../service/user.service'
import { APP_HOST, APP_PORT } from '../app/config'
import type { Middleware } from '@koa/router'

class filerController {
  create: Middleware = async function (ctx, next) {
    const { filename, mimetype, size } = ctx.request.file
    const { id, hasOldAvatar } = ctx.user

    // 存储头像文件信息
    await fileService.createAvatar(filename, mimetype, size, id, hasOldAvatar)

    // 存储头像地址到用户表中
    const avatarUrl = `${APP_HOST}:${APP_PORT}/user/avatar/${id}`
    await userService.updateAvatarUrl(avatarUrl, id)

    const message = hasOldAvatar ? '头像更新成功' : '头像上传成功'
    ctx.body = { code: 0, data: { avatarUrl, message } }
  }
}

export default new filerController()
