import HttpStatus from 'http-status'
import Router from 'koa-router'
import Game from './classes/Game'

const router = new Router()
const game = new Game()

router.get('/play', async (ctx, next) => {
	try {
		game.play()
		ctx.status = HttpStatus.OK
		ctx.body = 'hello'
		await next()
	} catch (ex) {
		ctx.status = HttpStatus.INTERNAL_SERVER_ERROR
	}
})

router.get('/board', async (ctx, next) => {
	const board = game.board.ocean
	ctx.status = HttpStatus.OK
	ctx.body = board
	await next()
})

export default router
