import Board from './Board';
import Player from './Player';

class Game {
	public board: Board

	constructor() {
		this.board = new Board()
	}

	public play(): void {
		console.log("Let's play battleship.")

		const p1 = new Player("Drew", this.board)
		const p2 = new Player("Maira", this.board)
		p1.placeShips()
		p2.placeShips()

		console.log(this.board.ocean)
	}
}

export default Game
