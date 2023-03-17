import { errorType } from '../global/constants/error-type'
import type { ParameterizedContext } from 'koa'

const handleError = (error: errorType, ctx: ParameterizedContext) => {
  let code = 0
  let message = ''

  switch (error) {
    case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001
      message = '用户名或者密码不能为空~'
      break
    case errorType.USER_ALREADY_EXISTS:
      code = -1002
      message = '用户名已经被占用, 请输入新的用户名~'
      break
    case errorType.USER_DOES_NOT_EXISTS:
      code = -1003
      message = '用户名不存在, 请检测用户名~'
      break
    case errorType.PASSWORD_IS_INCORRENT:
      code = -1004
      message = '输入的密码错误, 请检测密码~'
      break
    case errorType.UNAUTHORIZATION:
      code = -2001
      message = '无效的token或者token已经过期~'
      break
    case errorType.AVATAR_NOT_EXISTS:
      code = -2002
      message = '用户头像不存在'
      break
  }

  ctx.body = { code, message }
}

export default handleError
