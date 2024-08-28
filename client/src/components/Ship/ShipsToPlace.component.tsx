/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react'
import { faRedo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Ship.styles.css'
// import styles from './Ship.styles'
// css={styles}

export type ShipData = {
	name: string
	size: number
	orientation: 'horizontal' | 'vertical'
}

interface ShipsToPlaceProps {
	ships: ShipData[]
	activeShipToPlace: ShipData | null
	onShipClick(ship: ShipData): void
	onSwapOrientation(shp: ShipData): void
}

const ShipsToPlace = (props: ShipsToPlaceProps) => {
	const { ships, activeShipToPlace, onShipClick, onSwapOrientation } = props

	return (
		<div className="ships-group">
			{ships.map(s => (
				<div
					key={s.name}
					className={s === activeShipToPlace ? 'ship active-placing' : 'ship'}
					data-shipblocks={s.name}
				>
					<p className="ship-header">
						{s.name}
						<button onClick={() => onSwapOrientation(s)}>
							<FontAwesomeIcon icon={faRedo} />
						</button>
					</p>
					<div className={`ship-blocks ${s.orientation}`} onClick={() => onShipClick(s)}>
						<div>
							{Array(s.size)
								.fill(0)
								.map((_, idx) => (
									<span key={idx} />
								))}
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default ShipsToPlace
