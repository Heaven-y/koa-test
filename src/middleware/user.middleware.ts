import { errorType } from '../global/constants/error-type'
import md5Password from '../utils/md5-password'
import userService from '../service/user.service'
import type { Middleware } from '@koa/router'
import type { IUser } from '../global/types'

const verifyUser: Middleware = async (ctx, next) => {
  const { name, password } = ctx.request.body as IUser

  if (!name || !password) {
    return ctx.app.emit('error', errorType.NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }

  const users = await userService.getUserByName(name)
  if (users.length) {
    return ctx.app.emit('error', errorType.USER_ALREADY_EXISTS, ctx)
  }

  await next()
}

const handlePassWord: Middleware = async (ctx, next) => {
  const { password } = ctx.request.body as IUser

  ;(ctx.request.body as IUser).password = md5Password(password)

  await next()
}

export { verifyUser, handlePassWord }
