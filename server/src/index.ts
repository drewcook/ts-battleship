import cors from '@koa/cors'
import Koa from 'koa'
import BodyParser from 'koa-bodyparser'
import Logger from 'koa-logger'
import mount from 'koa-mount'
import serve from 'koa-static'
import router from './routes'

const app = new Koa()
const PORT = process.env.PORT || 3000

// Middleware
app.use(BodyParser())
app.use(Logger())
app.use(cors())

// Serve static client app
const static_pages = new Koa()
static_pages.use(serve(__dirname + '/../../client/build'))
app.use(mount('/', static_pages))

// Setup routes
app.use(router.routes()).use(router.allowedMethods())

// Open and listen on port
app.listen(PORT, function () {
	console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/', PORT, PORT)
})
