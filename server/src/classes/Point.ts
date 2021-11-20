
export enum PointStatus {
	Hit, Miss, Ship, Empty
}

class Point {
	public x: number
	public y: number
	public status: PointStatus

	constructor(x: number, y: number) {
		this.x = x
		this.y = y
		this.status = PointStatus.Empty
	}

	public updateStatus(status: PointStatus): void {
		this.status = status
	}
}

export default Point
