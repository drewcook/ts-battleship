import cors from '@koa/cors'
import Koa from 'koa'
import BodyParser from 'koa-bodyparser'
import Logger from 'koa-logger'
import mount from 'koa-mount'
import serve from 'koa-static'
import router from './routes'
import mongoose from 'mongoose'

// Load .env
require('dotenv').config()

const app = new Koa()
const PORT = process.env.PORT || 3000
const isProduction: boolean = process.env['NODE_ENV'] === 'production'

// Setup Mongo Database
const setupDb = () => {
	const host = isProduction
		? process.env.MONGODB_PROD_CONNECTION
		: process.env.MONGODB_DEV_CONNECTION
	const db = `${host}/battleship`
	mongoose
		.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		})
		.then(() => console.info(`Connected to MongoDB...`))
}
setupDb()

// Middleware
app.use(BodyParser())
app.use(Logger())
app.use(cors())

// Production Workflow
if (isProduction) {
	console.info('Running production workflow...')
	// Serve static client app
	console.info('Building client app...')
	const static_pages = new Koa()
	static_pages.use(serve(__dirname + '/../../client/build'))
	app.use(mount('/', static_pages))
	console.info('Client app served at /')
}

// Setup routes
app.use(router.routes()).use(router.allowedMethods())

export default app
