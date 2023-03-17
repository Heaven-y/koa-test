import jwt from 'jsonwebtoken'
import { errorType } from '../global/constants/error-type'
import md5Password from '../utils/md5-password'
import userService from '../service/user.service'
import { PUBLIC_KEY } from '../app/config'
import type { Middleware } from '@koa/router'
import type { IUser } from '../global/types'

const verifyLogin: Middleware = async (ctx, next) => {
  const { name, password } = ctx.request.body as IUser

  if (!name || !password) {
    return ctx.app.emit('error', errorType.NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }

  const users = await userService.getUserByName(name)
  const user = users[0]
  if (!user) {
    return ctx.app.emit('error', errorType.USER_DOES_NOT_EXISTS, ctx)
  }

  if (user.password !== md5Password(password)) {
    return ctx.app.emit('error', errorType.PASSWORD_IS_INCORRENT, ctx)
  }

  ctx.user = user

  await next()
}

const verifyAuth: Middleware = async (ctx, next) => {
  const authorization = ctx.header.authorization
  const token = authorization?.replace('Bearer ', '') ?? ''

  try {
    // { id, name, iat: 1678960540, exp: 1679046940 }
    const res = jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] })

    ctx.user = res

    await next()
  } catch (error) {
    ctx.app.emit('error', errorType.UNAUTHORIZATION, ctx)
  }
}

export { verifyLogin, verifyAuth }
