import type { IPoint } from 'battleship-types'
import { EAppStep } from '../App/App.component'
import './Board.styles.css'

export enum EPointStatus {
	Hit = 'Hit',
	Miss = 'Miss',
	Ship = 'Ship',
	Empty = 'Empty',
	Sunk = 'Sunk',
}

export type Location = {
	x: number
	y: number
}

type BoardSize = 'small' | 'large' | 'guessing' | 'end'

interface BoardProps {
	whoIs: 'player' | 'opponent',
	size: BoardSize
	ocean: IPoint[][] | null
	step: EAppStep
	onPlaceShip(location: Location): void
	onGuess(location: Location): void
}

const Board = (props: BoardProps) => {
	const { whoIs, size, ocean, step, onPlaceShip, onGuess } = props

	const handlePointClick = (point: IPoint): void => {
		if (size === 'small' || size === 'end') return
		if (step === EAppStep.Placing) onPlaceShip(point.location)
		if (
			step === EAppStep.Guessing &&
			(point.status === EPointStatus.Empty || point.status === EPointStatus.Ship)
		)
			onGuess(point.location)
	}

	return (
		ocean && (
			<div className={`${whoIs}-board`}>
				<table className={`board board-${size}`}>
					<thead>
						{/* <tr>
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
						</tr> */}
					</thead>
					<tbody>
						{ocean.map((row: IPoint[], idx: number) => (
							<tr key={`row-${idx + 1}`}>
								{/* <td className="board__header">{idx + 1}</td> */}
								{row.map((point: IPoint) => (
									<td
										className="board__square"
										key={`square-${point.location.x + point.location.y}`}
										onClick={() => handlePointClick(point)}
										data-status={point.status}
									></td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		)
	)
}

export default Board
