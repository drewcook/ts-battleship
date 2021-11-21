import { IPoint, IShip, ShipOrientation, ShipType } from '@types'
import { EPointStatus } from './Point'

export enum EShipType {
	Destroyer = 'Destroyer',
	Submarine = 'Submarine',
	Cruiser = 'Cruiser',
	Battleship = 'Battleship',
	Carrier = 'Carrier',
}

class Ship implements IShip {
	public type: ShipType
	public name: string
	public orientation: ShipOrientation = 'horizontal'
	public spacesOccupied: IPoint[] = []
	public size: number

	constructor(type: ShipType) {
		this.type = type

		switch (type) {
			case EShipType.Destroyer:
				this.size = 2
				this.name = 'Destroyer'
				break
			case EShipType.Submarine:
				this.size = 3
				this.name = 'Submarine'
				break
			case EShipType.Cruiser:
				this.size = 3
				this.name = 'Cruiser'
				break
			case EShipType.Battleship:
				this.size = 4
				this.name = 'Battleship'
				break
			case EShipType.Carrier:
				this.size = 5
				this.name = 'Carrier'
				break
			default:
				throw new Error(`Ship type ${type} not recognized!`)
		}
	}

	// TODO: Call this after making guess and is a hit
	public isSunk(): boolean {
		this.spacesOccupied.forEach(point => {
			if (point.status !== EPointStatus.Hit) return false
		})
		// Update to sunken if so.
		this.spacesOccupied.forEach(point => point.updateStatus(EPointStatus.Sunk))
		return true
	}

	public updatePoint(point: IPoint): void {
		console.log('updating ship point', point)
	}
}

export default Ship
