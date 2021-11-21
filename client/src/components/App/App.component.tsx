import { IPoint } from 'battleship-types'
import { useState } from 'react'
import { get, post } from '../../api'
import type { Location } from '../Board/Board.component'
import Board from '../Board/Board.component'
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
	const [step, setStep] = useState<EAppStep>(EAppStep.Intro)

	const playGame = async (): Promise<void> => {
		try {
			await post('/game/start')
			displayBoard()
			setStep(EAppStep.Placing)
			setCtaText('Place your ships onto the board.')
		} catch (ex) {
			console.error('Exception occurred', ex)
		}
	}

	const quitGame = async (): Promise<void> => {
		await post('/game/start')
		setStep(EAppStep.Intro)
		setCtaText('Let\'s start playing!')
		setBoardData(null)
		setShipsPlaced(false)
		setActiveShipBeingPlaced(null)
		setPlacementError(null)
		setShipsToPlace(initialShipsToPlace)
	}

	const displayBoard = async (): Promise<void> => {
		try {
			const res = await get('/board')
			console.log(res)
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

	const handlePlaceShipOnBoard = async (location: Location): Promise<void> => {
		try {
			setPlacementError(null)
			if (!activeShipBeingPlaced) return
			await post('/ship/place', { ship: activeShipBeingPlaced, location: location})
			const res = await get('/board')
			const shipsLeftToPlace = shipsToPlace.filter(s => s.name !== activeShipBeingPlaced.name)

			setBoardData(res.playerBoard)
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

	const startGuessing = (): void => {
		setStep(EAppStep.Guessing)
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
									<ShipsToPlace
										ships={shipsToPlace}
										activeShipToPlace={activeShipBeingPlaced}
										onShipClick={handleShipClick}
										onSwapOrientation={handleSwapShipOrientation}
									/>
								)
							}
							<Board
								size="large"
								ocean={boardData}
								step={step}
								onPlaceShip={handlePlaceShipOnBoard}
							/>
						</>
					)}
					{step === EAppStep.Guessing && (
						<div className="grid">
							<div className="col col-3">
								<h5>Your Board</h5>
								<Board
									size="small"
									ocean={boardData}
									step={step}
									onPlaceShip={handlePlaceShipOnBoard}
								/>
								<p>Ships Sunk: 0</p>
							</div>
							<div className="col col-9">
								<Board
									size="large"
									ocean={oppBoardData}
									step={step}
									onPlaceShip={handlePlaceShipOnBoard}
								/>
							</div>
						</div>
					)}
				</div>
			</main>
		</div>
	)
}

export default App
