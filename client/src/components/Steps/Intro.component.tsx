interface IntroPageProps {
	ctaText: string
	playGame: () => void
	viewHighScores: () => void
}

const IntroPage = (props: IntroPageProps) => {
	const { ctaText, playGame, viewHighScores } = props

	return (
		<div className="app main-menu">
			<div className="container">
				<div className="welcome-box">
					<h1>The Game of Battleship!</h1>
					<h3>{ctaText}</h3>
					<button className="btn" onClick={playGame}>
						Start New Game
					</button>
					<button className="btn" onClick={viewHighScores}>
						High Scores
					</button>
				</div>
			</div>
		</div>
	)
}

export default IntroPage
