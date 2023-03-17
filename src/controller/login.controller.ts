import jwt from 'jsonwebtoken'
import { PRIVATE_KEY } from '../app/config'
import type { Middleware } from '@koa/router'

class loginController {
  login: Middleware = function (ctx, next) {
    const { id, name } = ctx.user

    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256',
    })

    ctx.body = { code: 0, data: { id, name, token } }
  }

  testToken: Middleware = function (ctx, next) {
    ctx.body = { code: 0, message: 'token验证通过' }
  }
}

export default new loginController()
