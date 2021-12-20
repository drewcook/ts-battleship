import { css } from '@emotion/react'

const styles = css`
	.ships-group {
		padding: 0 15px;
	}

	.ships-group .ship {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 0;
		border-bottom: 1px solid #ccc;
	}

	.ships-group .ship.active-placing .ship-blocks span {
		opacity: 0.7;
	}

	.ships-group .ship .ship-header button {
		font-size: 0.6rem;
		border: none;
		display: block;
		background: #333;
		color: #fff;
		border-radius: 4px;
		width: 25px;
		height: 25px;
		margin-top: 5px;
	}

	.ships-group .ship .ship-blocks {
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* Destroyer Blocks */
	.ships-group .ship[data-shipblocks='Destroyer'] .ship-blocks {
		height: 50px;
		width: 50px;
	}

	/* Submarine & Cruiser Blocks */
	.ships-group .ship[data-shipblocks='Submarine'] .ship-blocks,
	.ships-group .ship[data-shipblocks='Cruiser'] .ship-blocks {
		height: 70px;
		width: 70px;
	}

	/* Battleship Blocks */
	.ships-group .ship[data-shipblocks='Battleship'] .ship-blocks {
		height: 90px;
		width: 90px;
	}

	/* Carrier Blocks */
	.ships-group .ship[data-shipblocks='Carrier'] .ship-blocks {
		height: 120px;
		width: 120px;
	}

	.ships-group .ship .ship-blocks span {
		display: inline-block;
		border: 1px solid black;
		background-color: #6030ff;
		width: 20px;
		height: 20px;
	}

	.ships-group .ship .ship-blocks.vertical span {
		display: block;
	}
`

export default styles
