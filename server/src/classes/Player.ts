import { IBoard, IPlayer, IPoint, IShip } from 'battleship-types'
import { EPointStatus } from './Point'
import Ship, { EShipType } from './Ship'

class Player implements IPlayer {
	public name: string
	public board: IBoard
	public ships: IShip[] = [
		new Ship(EShipType.Destroyer),
		new Ship(EShipType.Submarine),
		new Ship(EShipType.Cruiser),
		new Ship(EShipType.Battleship),
		new Ship(EShipType.Carrier),
	]
	public allShipsDestroyed: boolean = false

	constructor(name: string, board: IBoard) {
		this.name = name
		this.board = board
	}

	private _placeShip(ship: IShip): void {
		console.log(`Where would you like to place your ${ship.name}?`)
		// intake an x and y,
		// then find point on ocean with those coordinates
		var x = 0,
			y = 1
		const point = this.board.getPoint(x, y)
		point.updateStatus(EPointStatus.Ship)
		console.log(point)
	}

	public placeShips(): void {
		console.log(`Hello ${this.name}! Please place each of your ships first.`)
		this.ships.forEach(ship => {
			this._placeShip(ship)
		})
	}

	public receiveGuess(point: IPoint): void {
		console.log(`Receiving guess on point ${point}...`)
		// 1. Get point from board
		// Point is miss:
		// return a miss; allow guesser to add to list of guessed points

		// Point is hit:
		// Cycle through this.ships and check if point guessed matches any ship's points
		// Alternatively, keep a list of occupied spaces and cycle through those for a match
		// After marking the ship's point as PointStatus.Hit, then check if all ship's points are Hit. If so, sink it.
		// Finally if all player's ships are sunk, end the game this.allShipsDestroyed = true
	}

	public makeGuess(point: IPoint, opponent: IPlayer): void {
		console.log(
			`Player ${this.name} is making guess against ${opponent.name} for point ${point}...`,
		)
		// Call other player's receiveGuess
		opponent.receiveGuess(point)
	}
}

export default Player
