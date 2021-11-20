import Point from './Point'

class Board {
	public ocean: Point[][] = []

	constructor() {
		this.ocean = this._createBoard(10)
	}

	private _createBoard(gridSize: number = 10): Point[][] {
		const grid: Point[][] = []
		for (let row = 0; row < gridSize; row++) {
			const rowPoints: Point[] = []
			for (let col = 0; col < gridSize; col++) {
				rowPoints.push(new Point(row, col))
			}
			grid.push(rowPoints)
		}
		return grid
	}

	public getPoint(x: number, y: number): Point {
		return this.ocean[x][y]
	}
}

export default Board