// Type definitions for battleship-types 1.0
// Project: https://github.com/drewcook/ts-battleship
// Definitions by: Drew Cook <https://github.com/drewcook>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
/// <reference types="typescript" />

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
	getPoint(x: number, y: number): IPoint
}

/**
 * Points
 */
export interface IPoint {
	x: number
	y: number
	status: PointStatus
	updateStatus(status: PointStatus): void
}

// Union (enum) for point statuses
export type PointStatus = 'Hit' | 'Miss' | 'Ship' | 'Empty'

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

// Union (enum) for ship types
export type ShipType = 'Destroyer' | 'Submarine' | 'Cruiser' | 'Battleship' | 'Carrier'

export interface IShip {
	type: ShipType
	name: string
	spacesOccupied: IPoint[]
	size: number
	isSunk(): boolean
	updatePoint(point: IPoint): void
}
