import fs from 'fs'
import userService from '../service/user.service'
import fileService from '../service/file.service'
import { AVATAR_PATH } from '../app/config'
import { errorType } from '../global/constants/error-type'
import type { Middleware } from '@koa/router'
import type { IUser } from '../global/types'

class userController {
  create: Middleware = async function (ctx, next) {
    const user = ctx.request.body as IUser
    const res = await userService.create(user)
    ctx.body = {
      code: 0,
      message: '创建用户成功',
      data: res
    }
  }

  getAvatarByUserId: Middleware = async function (ctx, next) {
    const { userId } = ctx.params

    const avatarInfo = await fileService.queryAvatarByUserId(userId)

    if (!avatarInfo) {
      return ctx.app.emit('error', errorType.AVATAR_NOT_EXISTS, ctx)
    }
    // {id, filename, mimetype, size, user_id, createAt, updateAt}
    const { mimetype, filename } = avatarInfo

    ctx.type = mimetype
    ctx.body = fs.readFileSync(`${AVATAR_PATH}/${filename}`)
  }
}

export default new userController()
