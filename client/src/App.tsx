import React, { useState } from 'react'
import { get } from './api/get'
import './App.css'

interface Point {
	x: number;
	y: number;
	status: string;
}

function App() {
	const [board, setBoard] = useState([])

	const playGame = async () => {
		try {
			const res = await get('/play')
			console.log(res)
			displayBoard()
		} catch (ex) {
			console.error('Exception occurred', ex)
		}
	}

	const displayBoard = async () => {
		try {
			const res = await get('/board')
			setBoard(res)
		} catch (ex) {
			console.error('Exception occurred', ex)
		}
	}

	const handlePointClick = async (point: Point) => {
		try {
			console.log('clicking point', point)
		} catch (ex) {
			console.error('Exception occurred', ex)
		}
	}

	return (
		<div className="app">
			<header className="app-header">
				<h1>Typescript Battleship</h1>
			</header>
			<main className="app-content">
				{board !== null && board.length > 0 ? (
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
							{board.map((row: Point[], idx: number) => (
								<tr key={`row-${idx + 1}`}>
									<td>{idx + 1}</td>
									{row.map((point: Point) => (
										<td
											className="board__point"
											key={`point-${point.x + point.y}`}
											onClick={() => handlePointClick(point)}
										>
											{`[${point.x}][${point.y}]`}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<button className="btn" onClick={playGame}>
						Start New Game!
					</button>
				)}
			</main>
		</div>
	)
}

export default App
