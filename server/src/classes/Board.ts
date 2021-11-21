import { IBoard, IPoint, IShip, Location } from '@types'
import Point, { EPointStatus } from './Point'

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

	public getPoint(location: Location): IPoint {
		const { x, y } = location
		return this.ocean[x][y]
	}

	public checkShipPlacement(ship: IShip, startLocation: Location): boolean {
		const { x, y } = startLocation
		let shipWalked = 0

		if (ship.orientation === 'horizontal') {
			// walk horizontally
			for (let col = y; col < this.ocean[0].length; col++) {
				if (this.ocean[x][col].status === EPointStatus.Ship) throw new Error('Cannot place over ship')
				shipWalked++
			}
		} else {
			// walk vertically
			for (let row = x; row < this.ocean.length; row++) {
				if (this.ocean[row][y].status === EPointStatus.Ship) throw new Error('Cannot place over ship')
				shipWalked++
			}
		}

		return shipWalked >= ship.size
	}
}

export default Board
