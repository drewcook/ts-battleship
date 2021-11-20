export type Hello = 'Hello'

/**
 * Game
 */
export interface IGame {
	board: IBoard
	play(): void
}

/**
 * Board
 */
export interface IBoard {
	ocean: IPoint[][]
	_createBoard(gridSize: number): IPoint[][]
	getPoint(x: number, y: number): IPoint
}

/**
 * Points
 */
export interface IPoint {
	x: number
	y: number
	status: EPointStatus
	updateStatus(status: EPointStatus): void
}

export type PointStatus = 'Hit' | 'Miss' | 'Ship' | 'Empty'

export enum EPointStatus {
	Hit = 'Hit',
	Miss = 'Miss',
	Ship = 'Ship',
	Empty = 'Empty',
}

/**
 * Players
 */
export interface IPlayer {
	name: string
	board: IBoard
	ships: IShip[]
	allShipsDestroyed: boolean
	placeShips(): void
	receiveGuess(point: IPoint): void
	makeGuess(point: IPoint, opponent: IPlayer): void
}

/**
 * Ships
 */
export type ShipType = 'Destroyer' | 'Submarine' | 'Cruiser' | 'Battleship' | 'Carrier'

export enum EShipType {
	Destroyer,
	Submarine,
	Cruiser,
	Battleship,
	Carrier,
}

export interface IShip {
	type: EShipType
	name: string
	spacesOccupied: IPoint[]
	size: number
	isSunk(): boolean
	updatePoint(point: IPoint): void
}
