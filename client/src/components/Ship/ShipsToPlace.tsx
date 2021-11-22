import { faArrowsAltH, faArrowsAltV } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Ship.styles.css'

export type ShipData = {
	name: string,
	size: number,
	orientation: 'horizontal' | 'vertical',
}

interface ShipsToPlaceProps {
	ships: ShipData[];
	activeShipToPlace: ShipData | null;
	onShipClick(ship: ShipData): void;
	onSwapOrientation(shp: ShipData): void;
}

const ShipsToPlace = (props: ShipsToPlaceProps) => {
	const { ships, activeShipToPlace, onShipClick, onSwapOrientation } = props

	return (
		<div className="ships-group">
			{ships.map(s => (
				<div key={s.name} className={s === activeShipToPlace ? 'ship active-placing' : 'ship'}>
					<p className="ship-header">
						{s.name}
						<button onClick={() => onSwapOrientation(s)}>
							<FontAwesomeIcon
								icon={s.orientation === 'horizontal' ? faArrowsAltV : faArrowsAltH}
							/>
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