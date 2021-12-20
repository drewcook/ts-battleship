import { css } from '@emotion/react/macro'

export const tableStyles = css`
	table {
		table-layout: fixed;
		border-collapse: collapse;
		width: 100%;
		border: 1px solid #ccc;
		margin-bottom: 30px;
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
	tbody tr:nth-child(odd) {
		background: #efefef;
	}
`
