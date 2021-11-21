import { IBoard, IPlayer, IPoint, IShip, Location } from '@types'
import { EPointStatus } from './Point'
import Ship, { EShipType } from './Ship'

class Player implements IPlayer {
	public name: string
	public board: IBoard
	public fleet: IShip[] = [
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

	public placeShip(ship: IShip, location: Location): void {
		// Check if location is occupied
		const square: IPoint = this.board.getPoint(location)

		if (square.status === EPointStatus.Hit || square.status === EPointStatus.Miss)
			throw new Error('Uh oh, this square is in a bad state. Please refresh.')

		if (square.status === EPointStatus.Ship)
			throw new Error('Uh oh, cannot place a ship on top of another ship.')

		// Check if ship is in player's fleet
		const playerShip = this.fleet.find(s => s.type === ship.name)
		if (!playerShip)
			throw new Error('Uh oh, ship not found in player\'s fleet.')

		// Update orientation for player's ship
		playerShip.orientation = ship.orientation

		// Desired square empty, check if ship will fit there
		const canFit: boolean = this.board.checkShipPlacement(playerShip, location)
		if (!canFit)
			throw new Error('Uh oh, ship cannot fit in this space.')

		// Ship can fit, place on board
		const { x, y } = location
		if (playerShip.orientation === 'horizontal') {
			// walk horizontally
			for (let col = y; col < y + playerShip.size; col++) {
				const point = this.board.ocean[x][col]
				if (point.status === EPointStatus.Ship) throw new Error('Uh oh, cannot place a ship on top of another ship.')
				// Update players board that a ship occupies the space
				point.updateStatus(EPointStatus.Ship)
				// Add space to ship's occupied spaces
				playerShip.spacesOccupied.push(point)
			}
		} else {
			// walk vertically
			for (let row = x; row < x + playerShip.size; row++) {
				const point = this.board.ocean[row][y]
				if (point.status === EPointStatus.Ship) throw new Error('Uh oh, cannot place a ship on top of another ship.')
				// Update players board that a ship occupies the space
				point.updateStatus(EPointStatus.Ship)
				// Add space to ship's occupied spaces
				playerShip.spacesOccupied.push(point)
			}
		}
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
