import type { IBoard, IPoint, IShip, Location } from 'battleship-types'
import Point, { EPointStatus } from './Point'
import { EShipOrientation } from './Ship'

class Board implements IBoard {
	public ocean: IPoint[][] = []

	constructor() {
		this.ocean = this._createBoard(10)
	}

	private _createBoard(gridSize: number = 10): IPoint[][] {
		const grid: IPoint[][] = []
		for (let row = 0; row < gridSize; row++) {
			const rowPoints: IPoint[] = []
			for (let col = 0; col < gridSize; col++) {
				rowPoints.push(new Point(row, col))
			}
			grid.push(rowPoints)
		}
		return grid
	}

	public clearBoard(): void {
		for (let row = 0; row < this.ocean.length; row++) {
			const rowPoints: IPoint[] = this.ocean[row]
			for (let col = 0; col < rowPoints.length; col++) {
				rowPoints[col].status = EPointStatus.Empty
			}
		}
	}

	public getPoint(location: Location): IPoint {
		const { x, y } = location
		return this.ocean[x][y]
	}

	public checkShipPlacement(ship: IShip, startLocation: Location): boolean {
		const { x, y } = startLocation

		// Check for out of bounds and if another ship is in space
		if (ship.orientation === EShipOrientation.Horizontal) {
			// walk horizontally
			for (let col = y; col < y + ship.size; col++) {
				const point = this.ocean[x][col]
				if (!point) throw new Error('Uh oh, ship cannot be placed out of bounds.')
				if (point.status === EPointStatus.Ship)
					throw new Error(`Uh oh, cannot place the ${ship.name} on top of another ship.`)
			}
		} else {
			// walk vertically
			for (let row = x; row < x + ship.size; row++) {
				const point = this.ocean[row][y]
				if (!point) throw new Error('Uh oh, ship cannot be placed out of bounds.')
				if (point.status === EPointStatus.Ship)
					throw new Error(`Uh oh, cannot place the ${ship.name} on top of another ship.`)
			}
		}

		return true
	}
}

export default Board
