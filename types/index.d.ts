// Type definitions for battleship-types 1.0
// Project: https://github.com/drewcook/ts-battleship
// Definitions by: Drew Cook <https://github.com/drewcook>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
/// <reference types="typescript" />

/**
 * Game
 */
export interface ITurn {
	id: number
	playerName: string
	guess: Location
	result: PointStatus
}

export interface IGame {
	playerBoard: IBoard,
	opponentBoard: IBoard,
	player: IPlayer,
	opponent: IPlayer,
	public turns: ITurn[] = []
	public winner: IPlayer | null = null
	play(): void
	addTurn(turn: ITurn): ITurn[]
	declareWinner(player: IPlayer): void
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
	board: IBoar
	fleet: IShip[]
	allShipsDestroyed: boolean
	guessedSpaces: Map<string, PointStatus>
	placeShip(ship: IBaseShip, location: Location): void
	receiveGuess(location: Location): PointStatus
	makeGuess(location: Location, opponent: IPlayer): ITurn
}

/**
 * Ships
 */

// Union (enum) for ship types
export type ShipType = 'Destroyer' | 'Submarine' | 'Cruiser' | 'Battleship' | 'Carrier'

export type ShipOrientation = 'horizontal' | 'vertical'

export interface IBaseShip {
	name: string,
	orientation: ShipOrientation,
}

export interface IShip extends IBaseShip {
	type: ShipType
	spacesOccupied: IPoint[]
	size: number
	isSunk(): boolean
	sink(): void
}
