import { IGame, ITurn, Location } from 'battleship-types'
import HttpStatus from 'http-status'
import Router from 'koa-router'
import Game from './classes/Game'

const router = new Router()

let game: IGame | null
// TODO: have a list of sets of random placements and pick a random index from it to start
const autoFleetLocations: Location[] = [
	{ x: 0, y: 0 }, // Destroyer
	{ x: 1, y: 0 }, // Submarine
	{ x: 2, y: 0 }, // Cruiser
	{ x: 3, y: 0 }, // Battleship
	{ x: 4, y: 0 }, // Carrier
]

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
		const { ship, location, auto } = ctx.request.body

		// Autoplace if applicable
		if (auto) {
			game.player.fleet.forEach((vessel, idx) => {
				game?.player.placeShip(vessel, autoFleetLocations[idx])
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
		const playerTurn: ITurn = await game.player.makeGuess(ctx.request.body, game.opponent)

		// Add turn to the game
		const gameTurns: ITurn[] = game.addTurn(playerTurn)

		// Check for game over
		if (game.opponent.allShipsDestroyed) {
			ctx.body = {
				gameOver: true,
				lastTurn: playerTurn,
			}
		} else {
			ctx.body = {
				gameOver: false,
				lastTurn: playerTurn,
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

		// Place each ship from default fleet
		game.opponent.fleet.forEach((ship, idx) => {
			game?.opponent.placeShip(ship, autoFleetLocations[idx])
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
			}
		} else {
			ctx.body = {
				gameOver: false,
				lastTurn: opponentTurn,
			}
		}
		ctx.status = HttpStatus.OK
		await next()
	} catch (ex: any) {
		ctx.body = { error: ex.message ?? ex }
		ctx.status = HttpStatus.INTERNAL_SERVER_ERROR
	}
})

export default router
