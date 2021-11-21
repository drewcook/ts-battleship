import { IGame } from 'battleship-types'
import HttpStatus from 'http-status'
import Router from 'koa-router'
import Game from './classes/Game'

const router = new Router()

let game: IGame | null

router.post('/game/start', async (ctx, next) => {
	try {
		// Initialize a new game from scratch
		game = new Game()
		game.play()

		ctx.status = HttpStatus.OK
		await next()
	} catch (ex: any) {
		ctx.body = { error: ex.message ?? ex }
		ctx.status = HttpStatus.INTERNAL_SERVER_ERROR
	}
})

router.post('/game/quit', async (ctx, next) => {
	try {
		// Wipe away our existing game
		game = null

		ctx.status = HttpStatus.OK
		await next()
	} catch (ex: any) {
		ctx.body = { error: ex.message ?? ex }
		ctx.status = HttpStatus.INTERNAL_SERVER_ERROR
	}
})

router.get('/board', async (ctx, next) => {
	try {
		if (!game) return

		ctx.body = game.board.ocean
		ctx.status = HttpStatus.OK
		await next()
	} catch (ex: any) {
		ctx.body = { error: ex.message ?? ex }
		ctx.status = HttpStatus.INTERNAL_SERVER_ERROR
	}
})

router.post('/ship/place', async (ctx, next) => {
	try {
		if (!game) return

		const { ship, location } = ctx.request.body
		await game.player.placeShip(ship, location)

		ctx.body = game.board.ocean
		ctx.status = HttpStatus.OK
		await next()
	} catch (ex: any) {
		ctx.body = { error: ex.message ?? ex }
		ctx.status = HttpStatus.INTERNAL_SERVER_ERROR
	}
})

export default router
