import { css } from '@emotion/react'

const styles = css`
	.board {
		margin: 30px auto;
		border-radius: 8px;
		overflow: hidden;
		border-collapse: collapse;
	}

	.board__square {
		background: #ccc;
		padding: 5px;
		text-align: center;
		font-size: 0.8rem;
	}

	.board-small .board__square {
		width: 12px;
		height: 12px;
	}

	.board-guessing .board__square {
		width: 28px;
		height: 28px;
	}

	.board-large .board__square {
		width: 40px;
		height: 40px;
	}

	.board-end .board__square {
		width: 25px;
		height: 25px;
	}

	.board-small .board__header,
	.board-small th {
		font-size: 0.8rem;
	}

	/* Player Board */
	.player-board table {
		background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
			url('../../images/ocean.jpg');
		background-size: contain;
		background-position: center center;
	}

	.player-board .board__square {
		opacity: 0.7;
		border: 1px solid #aaa;
	}

	.player-board .board-small .board__square {
		opacity: 0.7;
		border: 0.5px solid #aaa;
	}

	.player-board .board__square[data-status='Empty'] {
		opacity: 0.4;
	}

	.player-board .board-large .board__square[data-status='Empty']:hover {
		cursor: pointer;
		background: #fff;
		opacity: 0.6;
	}

	.board__square[data-status='Empty'],
	.board-guessing .board__square[data-status='Ship'] {
		background: #61bdf3;
	}

	.board__square[data-status='Ship'] {
		background: #184a67;
	}

	.board__square[data-status='Miss'] {
		background: #848482;
	}

	.board__square[data-status='Hit'] {
		background: #e3a702;
	}

	.board__square[data-status='Sunk'] {
		background: #d41f1f;
	}

	/* Opponent Board */
	.opponent-board table {
		background-image: url('../../images/radar.jpg');
		background-size: contain;
		background-position: center center;
	}

	.opponent-board .board__square {
		opacity: 0;
		border: 1px solid #555;
	}

	.opponent-board .board__square[data-status='Miss'] {
		opacity: 0.8;
		background: #848482;
	}

	.opponent-board .board__square[data-status='Hit'] {
		opacity: 0.8;
		background: #e3a702;
	}

	.opponent-board .board__square[data-status='Sunk'] {
		opacity: 0.8;
		background: #d41f1f;
	}

	.opponent-board .board-end .board__square[data-status='Miss'],
	.opponent-board .board-end .board__square[data-status='Hit'],
	.opponent-board .board-end .board__square[data-status='Sunk'] {
		opacity: 0.7;
		cursor: unset;
	}

	.opponent-board .board-guessing .board__square[data-status='Empty']:hover,
	.opponent-board .board-guessing .board__square[data-status='Empty']:hover,
	.opponent-board .board-guessing .board__square[data-status='Ship']:hover {
		opacity: 0.7;
		background: #fff;
		cursor: pointer;
	}

	.opponent-board .board-end .board__square:hover {
		cursor: unset;
	}

	.opponent-board .board-end .board__square[data-status='Empty']:hover {
		opacity: 0;
	}
`

export default styles
