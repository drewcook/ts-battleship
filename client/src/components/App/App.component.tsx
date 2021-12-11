import { faCheck, faRedo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IPoint } from 'battleship-types'
import { useState } from 'react'
import { get, post } from '../../api'
import Board, { Location } from '../Board/Board.component'
import ShipsToPlace, { ShipData } from '../Ship/ShipsToPlace'
import TurnsTable from '../TurnsTable/TurnsTable.component'
import './App.styles.css'

const initialShipsToPlace: ShipData[] = [
	{ size: 2, name: 'Destroyer', orientation: 'horizontal' },
	{ size: 3, name: 'Submarine', orientation: 'horizontal' },
	{ size: 3, name: 'Cruiser', orientation: 'horizontal' },
	{ size: 4, name: 'Battleship', orientation: 'horizontal' },
	{ size: 5, name: 'Carrier', orientation: 'horizontal' },
]

export enum EAppStep {
	Intro,
	Placing,
	Guessing,
	Ending,
}

const App = () => {
	const [ctaText, setCtaText] = useState("Let's start playing!")
	const [shipsPlaced, setShipsPlaced] = useState(false)
	const [playerBoardData, setPlayerBoardData] = useState<IPoint[][] | null>(null)
	const [oppBoardData, setOppBoardData] = useState<IPoint[][] | null>(null)
	const [activeShipBeingPlaced, setActiveShipBeingPlaced] = useState<ShipData | null>(null)
	const [shipsToPlace, setShipsToPlace] = useState<ShipData[]>(initialShipsToPlace)
	const [placementError, setPlacementError] = useState(null)
	const [guessError, setGuessError] = useState(null)
	const [step, setStep] = useState<EAppStep>(EAppStep.Intro)
	const [gameTurns, setGameTurns] = useState([])
	const [computerThinking, setComputerThinking] = useState(false)
	const [winner, setWinner] = useState<string | null>(null)

	const playGame = async (): Promise<void> => {
		try {
			await post('/game/start')
			displayBoards()
			setStep(EAppStep.Placing)
			setCtaText('Place your ships onto the board.')
		} catch (ex) {
			console.error('Exception occurred', ex)
		}
	}

	const quitGame = async (): Promise<void> => {
		// reset backend
		await post('/game/quit')

		// reset UI
		setPlayerBoardData(null)
		setShipsPlaced(false)
		setActiveShipBeingPlaced(null)
		setPlacementError(null)
		setGuessError(null)
		setGameTurns([])
		setWinner(null)
		setShipsToPlace(initialShipsToPlace)

		// set step
		setCtaText("Let's start playing!")
		setStep(EAppStep.Intro)
	}

	const displayBoards = async (): Promise<void> => {
		try {
			const res = await get('/boards')
			setPlayerBoardData(res.playerBoard)
			setOppBoardData(res.opponentBoard)
		} catch (ex) {
			console.error('Exception occurred', ex)
		}
	}

	const handleShipClick = (ship: any): void => {
		if (placementError) setPlacementError(null)
		if (activeShipBeingPlaced === ship) setActiveShipBeingPlaced(null)
		else setActiveShipBeingPlaced(ship)
	}

	const handleSwapShipOrientation = (ship: ShipData): void => {
		let target: ShipData | undefined = shipsToPlace.find(s => s === ship)
		if (!target) console.error('Target ship not found in fleet to rotate.')

		const updatedFleet: ShipData[] = shipsToPlace.map(s => {
			if (s.name === ship.name) {
				return s.orientation === 'horizontal'
					? { ...s, orientation: 'vertical' }
					: { ...s, orientation: 'horizontal' }
			} else {
				return s
			}
		})
		setShipsToPlace(updatedFleet)
		setActiveShipBeingPlaced(null)
	}

	const handleAutoplace = async (): Promise<void> => {
		try {
			await post('/player/place', { auto: true })
			const res = await get('/boards')
			setPlayerBoardData(res.playerBoard)
			setShipsPlaced(true)
			setCtaText("Ships have been auto-placed. Are you happy with your board?")
		} catch (ex: any) {
			console.error('Exception occurred handleAutoplace()', ex)
		}
	}

	const handlePlaceShipOnBoard = async (location: Location): Promise<void> => {
		try {
			setPlacementError(null)
			if (!activeShipBeingPlaced) return
			await post('/player/place', { ship: activeShipBeingPlaced, location: location })

			// Update board
			const res = await get('/boards')
			setPlayerBoardData(res.playerBoard)

			// Update ships to place
			const shipsLeftToPlace = shipsToPlace.filter(s => s.name !== activeShipBeingPlaced.name)
			setShipsToPlace(shipsLeftToPlace)
			setActiveShipBeingPlaced(null)

			// All ships have been placed, start guessing
			if (shipsLeftToPlace.length === 0) {
				setShipsPlaced(true)
				setCtaText("Great! Now it's time to search for your opponents ships.")
			}
		} catch (ex: any) {
			setPlacementError(ex.response.data.error)
		}
	}

	const startGuessing = async (): Promise<void> => {
		try {
			// Place AI ships prior to starting guessing
			await post('/opponent/place')
			setStep(EAppStep.Guessing)
			displayBoards()
			setCtaText("Great! Now it's time to search for your opponents ships.")
		} catch (ex: any) {
			console.error('Exception occurred', ex)
		}
	}

	const handleGuess = async (loc: Location): Promise<void> => {
		try {
			setGuessError(null)
			const res = await post('/player/guess', loc)
			setGameTurns(res.gameTurns)
			// Update UI based off of result
			displayBoards()

			if (res.gameOver) {
				setWinner(res.lastTurn.playerName)
				setCtaText('Congratulations, you live to sail another day!')
				setStep(EAppStep.Ending)
			} else {
				// Allow for opponent to guess
				setComputerThinking(true)
				setTimeout(async () => {
					const res = await post('/opponent/guess')
					setGameTurns(res.gameTurns)
					setComputerThinking(false)
					displayBoards()

					if (res.gameOver) {
						setWinner(res.lastTurn.playerName)
						setCtaText('Oh oh, your fleet has been sunk! Game Over.')
						setStep(EAppStep.Ending)
					}
				}, 500)
			}
		} catch (ex: any) {
			setGuessError(ex.response.data.error)
		}
	}

	return (
		<div className="app">
			<header className="app-header">
				<div className="container">
					<h1>The Game of Battleship!</h1>
					{step !== EAppStep.Intro && (
						<button className="btn quitGameBtn danger" onClick={quitGame}>
							Quit Game
						</button>
					)}
				</div>
			</header>
			<main className="app-content">
				<div className="container">
					{step === EAppStep.Intro && (
						<>
							<h3>{ctaText}</h3>
							<button className="btn success" onClick={playGame}>
								Start Game
							</button>
						</>
					)}
					{step === EAppStep.Placing && (
						<>
							<h3>{ctaText}</h3>
							{placementError && <p className="error-msg">{placementError}</p>}
							{shipsPlaced ? (
								<>
									<button className="btn success" onClick={startGuessing}>
										Yes <FontAwesomeIcon icon={faCheck} />
									</button>
									<button className="btn info" onClick={handleAutoplace}>
										No <FontAwesomeIcon icon={faRedo} />
									</button>
								</>
							) : (
								<>
									<button className="btn" onClick={handleAutoplace}>
										Autoplace
									</button>
									<ShipsToPlace
										ships={shipsToPlace}
										activeShipToPlace={activeShipBeingPlaced}
										onShipClick={handleShipClick}
										onSwapOrientation={handleSwapShipOrientation}
									/>
								</>
							)}
							<Board
								whoIs="player"
								size="large"
								ocean={playerBoardData}
								step={step}
								onPlaceShip={handlePlaceShipOnBoard}
								onGuess={handleGuess}
							/>
						</>
					)}
					{step === EAppStep.Guessing && (
						<div className="grid">
							<div className="col col-8">
								<h5>Your Fleet</h5>
								<Board
									whoIs="player"
									size="small"
									ocean={playerBoardData}
									step={step}
									onPlaceShip={handlePlaceShipOnBoard}
									onGuess={handleGuess}
								/>
								<h5>Opponent's Ocean</h5>
								<Board
									whoIs="opponent"
									size="guessing"
									ocean={oppBoardData}
									step={step}
									onPlaceShip={handlePlaceShipOnBoard}
									onGuess={handleGuess}
								/>
							</div>
							<div className="col col-4">
								<div className='status-box'>
									<h3>{ctaText}</h3>
									{computerThinking ? <p>Computer thinking...</p> : <p>Your turn!</p>}
									{guessError ? <p className="error-msg">{guessError}</p> : <p />}
								</div>
								<TurnsTable turns={gameTurns} />
							</div>
						</div>
					)}
					{step === EAppStep.Ending && (
						<>
							<div className="grid">
								<div className="col col-8">
									<h4>Your Fleet</h4>
									<Board
										whoIs="player"
										size="end"
										ocean={playerBoardData}
										step={step}
										onPlaceShip={handlePlaceShipOnBoard}
										onGuess={handleGuess}
									/>
									<h4>Opponent's Ocean</h4>
									<Board
										whoIs="opponent"
										size="end"
										ocean={oppBoardData}
										step={step}
										onPlaceShip={handlePlaceShipOnBoard}
										onGuess={handleGuess}
									/>
								</div>
								<div className="col col-4">
									<div className="status-box">
										<h3>{ctaText}</h3>
										<p>{winner} has won the game!</p>
										<button className="btn success" onClick={quitGame}>
											Play Again
										</button>
									</div>
									<TurnsTable turns={gameTurns} />
								</div>
							</div>
						</>
					)}
				</div>
			</main>
		</div>
	)
}

export default App
