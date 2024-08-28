/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react'
import { get } from '../../api'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { IHighScore } from './highscores.data'
import './HighScores.styles.css'
// import { tableStyles } from './HighScores.styles'
// x<table css={tableStyles}></table>

interface HighScoresProps {
	onBack: () => void
}

const HighScores = (props: HighScoresProps) => {
	const { onBack } = props
	const [loading, setLoading] = useState(true)
	const [highScores, setHighScores] = useState<IHighScore[]>([])

	const fetchHighScores = async () => {
		try {
			const res = await get('/highscores')
			setHighScores(res.highScores)
			setLoading(false)
		} catch (ex: any) {
			console.error('Exception occurred displayBoards()', ex)
		}
	}

	useEffect(() => {
		fetchHighScores()
	}, [])

	return (
		<div className="app high-scores">
			<div className="container">
				<div className="wrapper-box">
					<h1>High Scores</h1>
					<h3>Check out the high scores below!</h3>
					{loading ? (
						<div className="loading">Loading...</div>
					) : (
						<table>
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
									<tr key={`${hs._id}`}>
										<td>{idx + 1}</td>
										<td>{hs.name}</td>
										<td>{hs.moves}</td>
										<td>{format(new Date(hs.created_at), 'yyyy-MM-dd')}</td>
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
		</div>
	)
}

export default HighScores
