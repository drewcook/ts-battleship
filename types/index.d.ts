// Type definitions for battleship-types 1.0
// Project: https://github.com/drewcook/ts-battleship
// Definitions by: Drew Cook <https://github.com/drewcook>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
/// <reference types="typescript" />

/**
 * Game
 */
export interface IGame {
	playerBoard: IBoard,
	opponentBoard: IBoard,
	player: IPlayer,
	opponent: IPlayer,
	play(): void
}

/**
 * Board
 */
export interface IBoard {
	ocean: IPoint[][]
	getPoint(location: Location): IPoint
	checkShipPlacement(ship: IShip, startLocation: Location): boolean
}

/**
 * Location
 */
export type Location = {
	x: number,
	y: number,
}

/**
 * Points
 */
export interface IPoint {
	location: Location
	status: PointStatus
	updateStatus(status: PointStatus): void
}

// Union (enum) for point statuses
export type PointStatus = 'Sunk' | 'Hit' | 'Miss' | 'Ship' | 'Empty'

/**
 * Players
 */
export interface IPlayer {
	name: string
	board: IBoard
	fleet: IShip[]
	allShipsDestroyed: boolean
	placeShip(ship: IShip, location: Location): void
	receiveGuess(point: IPoint): void
	makeGuess(point: IPoint, opponent: IPlayer): void
}

/**
 * Ships
 */

// Union (enum) for ship types
export type ShipType = 'Destroyer' | 'Submarine' | 'Cruiser' | 'Battleship' | 'Carrier'

export type ShipOrientation = 'horizontal' | 'vertical'

export interface IShip {
	type: ShipType
	name: string
	orientation: ShipOrientation
	spacesOccupied: IPoint[]
	size: number
	isSunk(): boolean
	updatePoint(point: IPoint): void
}
