import { ITurn } from 'battleship-types'
import './TurnsTable.styles.css'
// import styles from './TurnsTable.styles'
// css={styles}

interface TurnsTableProps {
	turns: ITurn[]
}

const TurnsTable = (props: TurnsTableProps) => {
	const { turns } = props

	return (
		<div className="turns-table">
			<h4>Game Turn Results</h4>
			<p>Total Turns: {turns.length}</p>
			<div className="table-wrapper">
				<table>
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Player</th>
							<th scope="col">Guess</th>
							<th scope="col">Result</th>
						</tr>
					</thead>
					<tbody>
						{turns.length === 0 ? (
							<tr>
								<td colSpan={4}>No turns</td>
							</tr>
						) : (
							turns.map(turn => (
								<tr key={turn.id}>
									<td>{turn.id}</td>
									<td>{turn.playerName}</td>
									<td>
										[{turn.guess.x}, {turn.guess.y}]
									</td>
									<td>{turn.result}</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default TurnsTable
