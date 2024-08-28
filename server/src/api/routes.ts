import type { IBaseShip, IGame, ITurn, Location } from 'battleship-types'
import HttpStatus from 'http-status'
import Router from 'koa-router'
import Game from '../classes/Game'
import HighScore from '../classes/HighScore'
import { getRandomPlacement } from '../utils/autoplaceShips'
import { Request } from 'koa'

const router = new Router()

let game: IGame | null

// TODO: have moves return IBoard so it can easily be updated from UI
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

router.get('/boards', async (ctx, next) => {
	try {
		if (!game) return

		ctx.body = {
			playerBoard: game.playerBoard.ocean,
			opponentBoard: game.opponentBoard.ocean,
		}
		ctx.status = HttpStatus.OK
		await next()
	} catch (ex: any) {
		ctx.body = { error: ex.message ?? ex }
		ctx.status = HttpStatus.INTERNAL_SERVER_ERROR
	}
})

router.post('/player/place', async (ctx, next) => {
	try {
		if (!game) return
		const { ship, location, auto } = ctx.request.body as {
			ship: IBaseShip
			location: Location
			auto: boolean
		}

		// Autoplace if applicable
		if (auto) {
			game?.player.board.clearBoard()
			getRandomPlacement().forEach(({ ship, startingLocation }) => {
				game?.player.placeShip(ship, startingLocation)
			})
		} else {
			game.player.placeShip(ship, location)
		}

		ctx.body = game.playerBoard.ocean
		ctx.status = HttpStatus.OK
		await next()
	} catch (ex: any) {
		ctx.body = { error: ex.message ?? ex }
		ctx.status = HttpStatus.INTERNAL_SERVER_ERROR
	}
})

router.post('/player/guess', async (ctx, next) => {
	try {
		if (!game) return

		// Have player guess on opponent's board
		const playerTurn: ITurn = await game.player.makeGuess(
			ctx.request.body as Location,
			game.opponent,
		)

		// Add turn to the game
		const gameTurns: ITurn[] = game.addTurn(playerTurn)

		// Check for game over
		if (game.opponent.allShipsDestroyed) {
			ctx.body = {
				gameOver: true,
				lastTurn: playerTurn,
				gameTurns,
			}
		} else {
			ctx.body = {
				gameOver: false,
				lastTurn: playerTurn,
				gameTurns,
			}
		}
		ctx.status = HttpStatus.OK
		await next()
	} catch (ex: any) {
		ctx.body = { error: ex.message ?? ex }
		ctx.status = HttpStatus.INTERNAL_SERVER_ERROR
	}
})

router.post('/opponent/place', async (ctx, next) => {
	try {
		if (!game) return

		// Create opponent's board from auto-placement
		getRandomPlacement().forEach(({ ship, startingLocation }) => {
			game?.opponent.placeShip(ship, startingLocation)
		})

		ctx.status = HttpStatus.OK
		await next()
	} catch (ex: any) {
		ctx.body = { error: ex.message ?? ex }
		ctx.status = HttpStatus.INTERNAL_SERVER_ERROR
	}
})

router.post('/opponent/guess', async (ctx, next) => {
	try {
		if (!game) return

		// Guess a random location on the players board
		const location: Location = {
			x: Math.floor(Math.random() * 10),
			y: Math.floor(Math.random() * 10),
		}

		// Make a guess and create a turn
		const opponentTurn: ITurn = game.opponent.makeGuess(location, game.player)

		// Add turn to the game
		const gameTurns: ITurn[] = game.addTurn(opponentTurn)

		// Check for game over
		if (game.player.allShipsDestroyed) {
			ctx.body = {
				gameOver: true,
				lastTurn: opponentTurn,
				gameTurns,
			}
		} else {
			ctx.body = {
				gameOver: false,
				lastTurn: opponentTurn,
				gameTurns,
			}
		}
		ctx.status = HttpStatus.OK
		await next()
	} catch (ex: any) {
		ctx.body = { error: ex.message ?? ex }
		ctx.status = HttpStatus.INTERNAL_SERVER_ERROR
	}
})

router.get('/highscores', async (ctx, next) => {
	try {
		const highScores = await HighScore.find().sort({ moves: 'asc' })
		ctx.body = { highScores }
		ctx.status = HttpStatus.OK
		await next()
	} catch (ex: any) {
		ctx.body = { error: ex.message ?? ex }
		ctx.status = HttpStatus.INTERNAL_SERVER_ERROR
	}
})

router.post('/highscores/new', async (ctx, next) => {
	try {
		const { name, moves } = ctx.request.body as { name: string; moves: number }
		const payload = {
			name,
			moves,
			created_at: new Date(),
		}

		// TODO: Joi validate?
		// const results = validateHighScore(payload)
		// if (results.error) res.status(400).send(results.error.details)

		// create new record and save
		const newHighScore = new HighScore(payload)
		await newHighScore.save()
		ctx.status = HttpStatus.OK
	} catch (ex: any) {
		ctx.body = { error: ex.message ?? ex }
		ctx.status = HttpStatus.INTERNAL_SERVER_ERROR
	}
})

export default router
