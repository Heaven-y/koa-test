import fs from 'fs'
import type Application from 'koa'
import type Router from '@koa/router'

function registerRouters(app: Application) {
  const files = fs.readdirSync(__dirname)

  files.forEach((file) => {
    if (file === 'index.ts') return

    const router: Router = require(`./${file}`).default
    app.use(router.routes())
    app.use(router.allowedMethods())
  })
}

export default registerRouters
