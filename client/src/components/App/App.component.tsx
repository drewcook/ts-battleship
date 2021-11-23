import { IPoint } from 'battleship-types'
import { useState } from 'react'
import { get, post } from '../../api'
import Board, { Location } from '../Board/Board.component'
import ShipsToPlace, { ShipData } from '../Ship/ShipsToPlace'
import './App.styles.css'

const initialShipsToPlace: ShipData[] = [
	{ size: 2, name: 'Destroyer', orientation: 'horizontal' },
	{ size: 3, name: 'Submarine', orientation: 'horizontal' },
	{ size: 3, name: 'Cruiser', orientation: 'horizontal' },
	{ size: 4, name: 'Battleship', orientation: 'horizontal' },
	{ size: 5, name: 'Carrier', orientation: 'horizontal' },
];

export enum EAppStep { Intro, Placing, Guessing, Ending }

const App = () => {
	const [ctaText, setCtaText] = useState('Let\'s start playing!')
	const [shipsPlaced, setShipsPlaced] = useState(false)
	const [boardData, setBoardData] = useState<IPoint[][] | null>(null)
	const [oppBoardData, setOppBoardData] = useState<IPoint[][] | null>(null)
	const [activeShipBeingPlaced, setActiveShipBeingPlaced] = useState<ShipData | null>(null)
	const [shipsToPlace, setShipsToPlace] = useState<ShipData[]>(initialShipsToPlace)
	const [placementError, setPlacementError] = useState(null)
	const [guessResult, setGuessResult] = useState(null)
	const [guessError, setGuessError] = useState(null)
	const [step, setStep] = useState<EAppStep>(EAppStep.Intro)
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
		setBoardData(null)
		setShipsPlaced(false)
		setActiveShipBeingPlaced(null)
		setPlacementError(null)
		setGuessResult(null)
		setGuessError(null)
		setWinner(null)
		setShipsToPlace(initialShipsToPlace)

		// set step
		setCtaText('Let\'s start playing!')
		setStep(EAppStep.Intro)
	}

	const displayBoards = async (): Promise<void> => {
		try {
			const res = await get('/boards')
			setBoardData(res.playerBoard)
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
			setBoardData(res.playerBoard)
			setShipsPlaced(true)
				setCtaText('Great! Now it\'s time to search for your opponents ships.')
		} catch (ex: any) {
			console.error('Exception occurred handleAutoplace()', ex)
		}
	}

	const handlePlaceShipOnBoard = async (location: Location): Promise<void> => {
		try {
			setPlacementError(null)
			if (!activeShipBeingPlaced) return
			await post('/player/place', { ship: activeShipBeingPlaced, location: location})

			// Update board
			const res = await get('/boards')
			setBoardData(res.playerBoard)

			// Update ships to place
			const shipsLeftToPlace = shipsToPlace.filter(s => s.name !== activeShipBeingPlaced.name)
			setShipsToPlace(shipsLeftToPlace)
			setActiveShipBeingPlaced(null)

			// All ships have been placed, start guessing
			if (shipsLeftToPlace.length === 0) {
				setShipsPlaced(true)
				setCtaText('Great! Now it\'s time to search for your opponents ships.')
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
		} catch (ex: any) {
			console.error('Exception occurred', ex)
		}
	}

	const handleGuess = async (loc: Location): Promise<void> => {
		try {
			setGuessError(null)
			setGuessResult(null)
			const res = await post('/player/guess', loc)
			// Update UI based off of result
			setGuessResult(res.lastTurn.result)
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
						<button className="btn quitGameBtn" onClick={quitGame}>
							Quit Game
						</button>
					)}
				</div>
			</header>
			<main className="app-content">
				<div className="container">
					<h3>{ctaText}</h3>
					{step === EAppStep.Intro && (
						<button className="btn" onClick={playGame}>
							Start Game
						</button>
					)}
					{step === EAppStep.Placing && (
						<>
							{placementError && <p className="error-msg">{placementError}</p>}
							{shipsPlaced
								? (
									<button className="btn" onClick={startGuessing}>
										Let's Go!
									</button>
								)
								: (
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
								)
							}
							<Board
								size="large"
								ocean={boardData}
								step={step}
								onPlaceShip={handlePlaceShipOnBoard}
								onGuess={handleGuess}
							/>
						</>
					)}
					{step === EAppStep.Guessing && (
						<div className="grid">
							<div className="col col-3">
								<h5>Your Board</h5>
								{computerThinking
									? (
										<p>Computer thinking...</p>
									)
									: (
										<Board
											size="small"
											ocean={boardData}
											step={step}
											onPlaceShip={handlePlaceShipOnBoard}
											onGuess={handleGuess}
										/>
									)
								}
								{/* <p>Ships Sunk: 0</p> */}
							</div>
							<div className="col col-9">
								{guessError && <p className="error-msg">{guessError}</p>}
								<h5>Last Result: {guessResult || 'N/A'}</h5>
								<Board
									size="guessing"
									ocean={oppBoardData}
									step={step}
									onPlaceShip={handlePlaceShipOnBoard}
									onGuess={handleGuess}
								/>
							</div>
						</div>
					)}
					{step === EAppStep.Ending && (
						<>
							<p>{winner} has won the game!</p>
							<div className="grid">
								<div className="col col-6">
									<h4>Opponent's Board</h4>
									<Board
										size="end"
										ocean={boardData}
										step={step}
										onPlaceShip={handlePlaceShipOnBoard}
										onGuess={handleGuess}
									/>
								</div>
								<div className="col col-6">
									<h4>Your Board</h4>
									<Board
										size="end"
										ocean={oppBoardData}
										step={step}
										onPlaceShip={handlePlaceShipOnBoard}
										onGuess={handleGuess}
									/>
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
