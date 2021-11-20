import Point, { PointStatus } from './Point';

export enum ShipType {
	Destroyer,
	Submarine,
	Cruiser,
	Battleship,
	Carrier,
}

class Ship {
	public type: ShipType
	public name: string
	public spacesOccupied: Point[] = []
	public size: number;

	constructor(type: ShipType) {
		this.type = type;

		switch (type) {
			case ShipType.Destroyer:
					this.size = 2;
					this.name = 'Destroyer'
					break;
				case ShipType.Submarine:
					this.size = 3;
					this.name = 'Submarine'
					break;
				case ShipType.Cruiser:
					this.size = 3;
					this.name = 'Cruiser'
					break;
				case ShipType.Battleship:
					this.size = 4;
					this.name = 'Battleship'
					break;
				case ShipType.Carrier:
					this.size = 5;
					this.name = 'Carrier'
					break;
				default:
					throw new Error(`Ship type ${type} not recognized!`)
		}
	}

	public isSunk(): boolean {
		this.spacesOccupied.forEach(point => {
			if (point.status !== PointStatus.Hit) return false
		})
		return true
	}
}

export default Ship
