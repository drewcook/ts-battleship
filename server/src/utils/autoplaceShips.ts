import type { IBaseShip, Location } from 'battleship-types'
import { EShipOrientation, EShipType } from '../classes/Ship'

type AutoplacedShip = {
	ship: IBaseShip,
	startingLocation: Location,
}

export const fleet1: AutoplacedShip[] = [
	{
		ship: {
			name: EShipType.Destroyer,
			orientation: EShipOrientation.Vertical,
		},
		startingLocation: { x: 8, y: 7 },
	},
	{
		ship: {
			name: EShipType.Submarine,
			orientation: EShipOrientation.Vertical,
		},
		startingLocation: { x: 2, y: 7 },
	},
	{
		ship: {
			name: EShipType.Cruiser,
			orientation: EShipOrientation.Horizontal,
		},
		startingLocation: { x: 6, y: 3 },
	},
	{
		ship: {
			name: EShipType.Battleship,
			orientation: EShipOrientation.Horizontal,
		},
		startingLocation: { x: 3, y: 2 },
	},
	{
		ship: {
			name: EShipType.Carrier,
			orientation: EShipOrientation.Vertical,
		},
		startingLocation: { x: 0, y: 9 },
	},
]

export const fleet2: AutoplacedShip[] = [
	{
		ship: {
			name: EShipType.Destroyer,
			orientation: EShipOrientation.Vertical,
		},
		startingLocation: { x: 0, y: 8 },
	},
	{
		ship: {
			name: EShipType.Submarine,
			orientation: EShipOrientation.Vertical,
		},
		startingLocation: { x: 0, y: 1 },
	},
	{
		ship: {
			name: EShipType.Cruiser,
			orientation: EShipOrientation.Horizontal,
		},
		startingLocation: { x: 9, y: 5 },
	},
	{
		ship: {
			name: EShipType.Battleship,
			orientation: EShipOrientation.Vertical,
		},
		startingLocation: { x: 3, y: 5 },
	},
	{
		ship: {
			name: EShipType.Carrier,
			orientation: EShipOrientation.Horizontal,
		},
		startingLocation: { x: 7, y: 3 },
	},
]

export const fleet3: AutoplacedShip[] = [
	{
		ship: {
			name: EShipType.Destroyer,
			orientation: EShipOrientation.Vertical,
		},
		startingLocation: { x: 0, y: 9 },
	},
	{
		ship: {
			name: EShipType.Submarine,
			orientation: EShipOrientation.Vertical,
		},
		startingLocation: { x: 0, y: 8 },
	},
	{
		ship: {
			name: EShipType.Cruiser,
			orientation: EShipOrientation.Horizontal,
		},
		startingLocation: { x: 8, y: 6 },
	},
	{
		ship: {
			name: EShipType.Battleship,
			orientation: EShipOrientation.Horizontal,
		},
		startingLocation: { x: 6, y: 3 },
	},
	{
		ship: {
			name: EShipType.Carrier,
			orientation: EShipOrientation.Vertical,
		},
		startingLocation: { x: 1, y: 5 },
	},
]

export const fleet4: AutoplacedShip[] = [
	{
		ship: {
			name: EShipType.Destroyer,
			orientation: EShipOrientation.Vertical,
		},
		startingLocation: { x: 5, y: 4 },
	},
	{
		ship: {
			name: EShipType.Submarine,
			orientation: EShipOrientation.Vertical,
		},
		startingLocation: { x: 5, y: 9 },
	},
	{
		ship: {
			name: EShipType.Cruiser,
			orientation: EShipOrientation.Horizontal,
		},
		startingLocation: { x: 0, y: 2 },
	},
	{
		ship: {
			name: EShipType.Battleship,
			orientation: EShipOrientation.Vertical,
		},
		startingLocation: { x: 2, y: 2 },
	},
	{
		ship: {
			name: EShipType.Carrier,
			orientation: EShipOrientation.Vertical,
		},
		startingLocation: { x: 4, y: 0 },
	},
]

export const fleet5: AutoplacedShip[] = [
	{
		ship: {
			name: EShipType.Destroyer,
			orientation: EShipOrientation.Vertical,
		},
		startingLocation: { x: 6, y: 6 },
	},
	{
		ship: {
			name: EShipType.Submarine,
			orientation: EShipOrientation.Horizontal,
		},
		startingLocation: { x: 4, y: 7 },
	},
	{
		ship: {
			name: EShipType.Cruiser,
			orientation: EShipOrientation.Vertical,
		},
		startingLocation: { x: 0, y: 7 },
	},
	{
		ship: {
			name: EShipType.Battleship,
			orientation: EShipOrientation.Horizontal,
		},
		startingLocation: { x: 2, y: 1 },
	},
	{
		ship: {
			name: EShipType.Carrier,
			orientation: EShipOrientation.Horizontal,
		},
		startingLocation: { x: 6, y: 1 },
	},
]

// TODO: use difficulty level to pick partiular fleets
export const getRandomPlacement = (): AutoplacedShip[] => {
	const fleets = [fleet1, fleet2, fleet3, fleet4, fleet5]
	const randomIdx = Math.floor(Math.random() * fleets.length)
	const randomFleet = fleets[randomIdx]
	return randomFleet
}
