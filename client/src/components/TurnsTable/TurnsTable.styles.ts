import { css } from '@emotion/react'

const styles = css`
	.turns-table {
		text-align: center;
	}

	.turns-table h4 {
		margin: 0 0 15px;
	}

	.turns-table p {
		font-size: 14px;
		font-style: italic;
	}

	/* Table */
	.turns-table .table-wrapper {
		overflow-y: auto;
		height: 490px;
		border: 1px solid #ccc;
		border-radius: 8px;
	}

	.turns-table table {
		table-layout: fixed;
		border-collapse: collapse;
		width: 100%;
		border: 1px solid #ccc;
	}

	/* Head */
	.turns-table table thead {
		position: sticky;
		top: 0;
		background: #555;
		color: #fff;
		border: 1px solid #ccc;
	}

	/* Cells */
	.turns-table table th,
	.turns-table table td {
		border: 1px solid #ccc;
		padding: 5px;
		text-align: center;
	}

	.turns-table table td {
		font-size: 14px;
	}

	/* ID Cell */
	.turns-table table th:nth-of-type(1),
	.turns-table table td:nth-of-type(1) {
		width: 10%;
	}

	/* Player Cell */
	.turns-table table th:nth-of-type(2),
	.turns-table table td:nth-of-type(2) {
		width: 40%;
	}

	/* Guess Cell */
	.turns-table table th:nth-of-type(3),
	.turns-table table td:nth-of-type(3) {
		width: 25%;
	}

	/* Result Cell */
	.turns-table table th:nth-of-type(4),
	.turns-table table td:nth-of-type(4) {
		width: 25%;
	}

	/* Striping */
	.turns-table table tbody tr:nth-of-type(odd) {
		background: #efefef;
	}

	/* Caption */
	.turns-table table caption {
		font-size: small;
		margin: 0 0 10px;
	}
`

export default styles
