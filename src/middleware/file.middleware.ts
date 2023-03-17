import fs from 'fs'
import multer from '@koa/multer'
import fileService from '../service/file.service'
import { AVATAR_PATH } from '../app/config'
import type { Middleware } from '@koa/router'

const uploadAvatar = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, AVATAR_PATH)
    },
    filename(req, file, cb) {
      cb(null, Date.now() + '_' + file.originalname)
    }
  })
})

const handleAvatar = uploadAvatar.single('avatar')

// 如果有旧头像就先删除
const handleOldAvatar: Middleware = async (ctx, next) => {
  const { id } = ctx.user
  ctx.user.hasOldAvatar = false

  const avatarInfo = await fileService.queryAvatarByUserId(id)

  if (avatarInfo) {
    ctx.user.hasOldAvatar = true
    fs.unlink(`${AVATAR_PATH}/${avatarInfo.filename}`, () => {})
  }

  await next()
}

export { handleAvatar, handleOldAvatar }
