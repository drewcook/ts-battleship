import { EPointStatus, EShipType, IPoint, IShip } from 'battleship-types'

export enum ShipType {
	Destroyer = 'Destroyer',
	Submarine = 'Submarine',
	Cruiser = 'Cruiser',
	Battleship = 'Battleship',
	Carrier = 'Carrier',
}

class Ship implements IShip {
	public type: EShipType
	public name: string
	public spacesOccupied: IPoint[] = []
	public size: number

	constructor(type: EShipType) {
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

	public isSunk(): boolean {
		this.spacesOccupied.forEach(point => {
			if (point.status !== EPointStatus.Hit) return false
		})
		return true
	}

	public updatePoint(point: IPoint): void {
		console.log('updating ship point', point)
	}
}

export default Ship
