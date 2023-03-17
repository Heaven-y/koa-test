import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import registerRouters from '../router'
import handleError from '../utils/handle-error'

const app = new Koa()

app.use(bodyParser())
registerRouters(app)

app.on('error', handleError)

export default app
