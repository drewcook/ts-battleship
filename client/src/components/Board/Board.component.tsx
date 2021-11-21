import { IPoint } from 'battleship-types'
import { EAppStep } from '../App/App.component'
import './Board.styles.css'

export enum EPointStatus {
	Hit, Miss, Ship, Empty, Sunk
}

export type Location = {
	x: number,
	y: number,
}

type BoardSize = 'small' | "large"

interface BoardProps {
	size: BoardSize
	ocean: IPoint[][] | null
	onPlaceShip(location: Location): void
	step: EAppStep
}

const Board = (props: BoardProps) => {
	const { size, ocean, step, onPlaceShip } = props

	const onGuessSquare = (loc: Location): void => {
		console.log('guessing for location', loc)
	}

	const handlePointClick = (point: IPoint): void => {
		if (step === EAppStep.Placing) onPlaceShip(point.location)
		if (step === EAppStep.Guessing) onGuessSquare(point.location)
	}

	return ocean && (
		<table className={`board board-${size}`}>
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
