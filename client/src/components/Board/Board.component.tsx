import { IPoint } from 'battleship-types'

export enum EPointStatus {
	Hit, Miss, Ship, Empty, Sunk
}

export type Location = {
	x: number,
	y: number,
}

interface BoardProps {
	ocean: IPoint[][];
	onPlaceShip(location: Location): void;
	shipToPlace: object | null;
	placingShips: boolean;
}

const Board = (props: BoardProps) => {
	const { ocean, onPlaceShip, placingShips, shipToPlace } = props

	const handlePointClick = (point: IPoint): void => {
		if (placingShips && shipToPlace) onPlaceShip(point.location)
	}

	return (
		<table className="board">
			<thead>
				<tr>
					<th />
					<th>A</th>
					<th>B</th>
					<th>C</th>
					<th>D</th>
					<th>E</th>
					<th>F</th>
					<th>G</th>
					<th>H</th>
					<th>I</th>
					<th>J</th>
				</tr>
			</thead>
			<tbody>
				{ocean.map((row: IPoint[], idx: number) => (
					<tr key={`row-${idx + 1}`}>
						<td>{idx + 1}</td>
						{row.map((point: IPoint) => (
							<td
								className="board__square"
								key={`square-${point.location.x + point.location.y}`}
								onClick={() => handlePointClick(point)}
								data-status={point.status}
							>
								{/*
									point.status === "Empty" && `[${point.location.x}][${point.location.y}]`
									point.status === "Ship" && 'S'
									point.status === "Hit" && 'X'
									point.status === "Miss" && '-'
								*/}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default Board
