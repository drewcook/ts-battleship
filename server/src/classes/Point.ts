import { EPointStatus, IPoint } from '@types'

class Point implements IPoint {
	public x: number
	public y: number
	public status: EPointStatus

	constructor(x: number, y: number) {
		this.x = x
		this.y = y
		this.status = EPointStatus.Empty
	}

	public updateStatus(status: EPointStatus): void {
		this.status = status
	}
}

export default Point
