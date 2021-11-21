import { IPoint, Location, PointStatus } from '@types'

export enum EPointStatus {
	Empty = "Empty",
	Ship = "Ship",
	Miss = "Miss",
	Hit = "Hit",
	Sunk = "Sunk"
}

class Point implements IPoint {
	public location: Location
	public status: PointStatus

	constructor(x: number, y: number) {
		this.location = { x, y }
		this.status = EPointStatus.Empty
	}

	public updateStatus(status: PointStatus): void {
		this.status = status
	}
}

export default Point
