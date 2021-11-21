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

const App = () => {
	const [ctaText, setCtaText] = useState('Let\'s start playing!')
	const [gameStarted, setGameStarted] = useState(false)
	const [shipsPlaced, setShipsPlaced] = useState(false)
	const [board, setBoard] = useState<IPoint[][] | null>(null)
	const [activeShipBeingPlaced, setActiveShipBeingPlaced] = useState<ShipData | null>(null)
	const [shipsToPlace, setShipsToPlace] = useState<ShipData[]>(initialShipsToPlace)
	const [placementError, setPlacementError] = useState(null)

	const playGame = async (): Promise<void> => {
		try {
			await post('/game/start')
			displayBoard()
			setGameStarted(true)
			setCtaText('Place your ships onto the board.')
		} catch (ex) {
			console.error('Exception occurred', ex)
		}
	}

	const quitGame = async (): Promise<void> => {
		await post('/game/start')
		setPlacementError(null)
		setGameStarted(false)
		setBoard(null)
		setShipsPlaced(false)
		setActiveShipBeingPlaced(null)
		setShipsToPlace(initialShipsToPlace)
		setCtaText('Let\'s start playing!')
	}

	const displayBoard = async (): Promise<void> => {
		try {
			const res = await get('/board')
			setBoard(res)
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
			if (!activeShipBeingPlaced) return
			await post('/ship/place', { ship: activeShipBeingPlaced, location: location})
			const res = await get('/board')
			const shipsLeftToPlace = shipsToPlace.filter(s => s.name !== activeShipBeingPlaced.name)

			setBoard(res)
			setShipsToPlace(shipsLeftToPlace)
			setActiveShipBeingPlaced(null)

			// All ships have been placed, start guessing
			if (shipsLeftToPlace.length === 0) {
				setShipsPlaced(true)
				setCtaText('Great! Now it\'s time to search for your opponents ships. Make a guess!')
			}
		} catch (ex: any) {
			setPlacementError(ex.response.data.error)
		}
	}

	return (
		<div className="app">
			<header className="app-header">
				<div className="container">
					<h1>The Game of Battleship!</h1>
					{gameStarted && (
						<button className="btn quitGameBtn" onClick={quitGame}>
							Quit Game
						</button>
					)}
				</div>
			</header>
			<main className="app-content">
				<div className="container">
					<h3>{ctaText}</h3>
					{placementError && <p className="error-msg">{placementError}</p>}
					{gameStarted && !shipsPlaced && (
						<ShipsToPlace
							ships={shipsToPlace}
							activeShipToPlace={activeShipBeingPlaced}
							onShipClick={handleShipClick}
							onSwapOrientation={handleSwapShipOrientation}
						/>
					)}
					{gameStarted && board !== null && (
						<Board
							ocean={board}
							onPlaceShip={handlePlaceShipOnBoard}
							placingShips={!shipsPlaced}
							shipToPlace={activeShipBeingPlaced}
						/>
					)}
					{!gameStarted && (
						<button className="btn" onClick={playGame}>
							Start Game
						</button>
					)}
				</div>
			</main>
		</div>
	)
}

export default App
