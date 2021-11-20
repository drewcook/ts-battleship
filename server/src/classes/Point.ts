import { IPoint, PointStatus } from 'battleship-types'

export enum EPointStatus {
	Hit = "Hit",
	Miss = "Miss",
	Ship = "Ship",
	Empty = "Empty"
}

class Point implements IPoint {
	public x: number
	public y: number
	public status: PointStatus

	constructor(x: number, y: number) {
		this.x = x
		this.y = y
		this.status = EPointStatus.Empty
	}

	public updateStatus(status: PointStatus): void {
		this.status = status
	}
}

export default Point
