import { css } from '@emotion/react'

export const tableStyles = css`
	table {
		background: #fff;
		table-layout: fixed;
		border-collapse: collapse;
		width: 100%;
		border: 1px solid #ccc;
		margin-bottom: 30px;
		text-align: center;
	}

	table thead {
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

	/* Striping */
	tbody tr:nth-of-type(odd) {
		background: #efefef;
	}
`
