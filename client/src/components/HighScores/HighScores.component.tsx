/** @jsxImportSource @emotion/react */
import { jsx} from '@emotion/react'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import data, { IHighScore } from './highscores'
import { tableStyles } from './HighScores.styles'
import './HighScores.styles.css'

interface HighScoresProps {
	onBack: () => void;
}

const HighScores = (props: HighScoresProps) => {
	const { onBack } = props
	const [loading, setLoading] = useState(true)
	const [highScores, setHighScores] = useState<IHighScore[]>([])

	useEffect(() => {
		setTimeout(() => {
			data.sort((a,b) => a.moves - b.moves)
			setHighScores(data)
			setLoading(false)
		}, 2000)
	}, [])

	return (
		<div className="app high-scores">
			<div className="container">
				<h1>High Scores</h1>
				<h3>Check out the high scores below!</h3>
				{loading ? <div className="loading">Loading...</div> : (
					<table css={tableStyles}>
						<thead>
							<tr>
								<th>Rank</th>
								<th>Player</th>
								<th># Moves</th>
								<th>Date</th>
							</tr>
						</thead>
						<tbody>
							{highScores.map((hs: IHighScore, idx: number) => (
								<tr key={`${hs.id}-${idx}`}>
									<td>{idx + 1}</td>
									<td>{hs.name}</td>
									<td>{hs.moves}</td>
									<td>{format(hs.dateCreated, 'yyyy-MM-dd')}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
				<button className="btn info" onClick={onBack}>
					Back to Menu
				</button>
			</div>
		</div>
	)
}

export default HighScores
