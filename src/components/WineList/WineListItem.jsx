import React, { useContext } from "react";
import { Wine } from "CONTEXTS/Wine.jsx";
import { getAssetUrl } from "SHARED/utils.js";
import * as ACTIONS from "SHARED/actions.js";

export default function WineListItem(props){

	//HOOKS
	//----------------------
	const { state, dispatch } = useContext(Wine);


	//EVENT HANDLING
	//----------------------
	function showDetails(id){
		dispatch({
			type: ACTIONS.SET_ACTIVE_WINE,
			value: id
		});
	}//showDetails


	//PRIVATE VARS
	//---------------------
	const {
		name: wineName   = "",   // (string) Human-readable name of the wine
		media: wineMedia = [{}], // (array) of objects containing data needed to request related media
		producer         = {},   // (object) containing media / information about the wine's producer
		price: priceData = {},   // (object) containing price value and currency for the wine
		rebuy_rating     = -1,   // (number)[0-100] % of users who have indicated they would buy the wine again
		id                       // (string) unique ID for the wine
	} = props;

	const {
		background_color,
		public_id,
		type,
		subtype
	} = wineMedia[0];

	const {
		name: producerName   = "",
		about                = "",
		media: producerMedia = [{}],
	} = producer;

	const {
		actual,
		original,
		currency
	} = priceData;

	console.log(priceData)

	
	const wineThumbSrc   = getAssetUrl(public_id, { w: 300 });
	const currencySystem = new Intl.NumberFormat(navigator.language, { style: "currency", currency });
	const price_original = currencySystem.format(original);
	const price_actual   = currencySystem.format(actual);
	const discounted     = original != null;
	const discount       = discounted ? Math.floor((1 - (actual / original)) * 100) : 0;
	
	//give the event handler the id
	showDetails          = showDetails.bind(true, id);


	return(
		<li onClick={showDetails}>
			<figure>
				<img 
					src={wineThumbSrc} 
					alt={`A bottle of ${wineName}`}
				/>
				<figcaption>
					<header>
						<h2>
							{producerName}
						</h2>
						<h1>
							{wineName}
						</h1>
					</header>
					<p>
						{rebuy_rating}% would rebuy
					</p>
					<p aria-label="Actual cost per bottle.">
						{price_actual}
					</p>
					{discounted && (
						<p aria-label="Original cost per bottle">
							{price_original}
						</p>
					)}
					{discounted && (
						<aside>
							{discount}% off
						</aside>
					)}
				</figcaption>
			</figure>
		</li>
	);

}//WineListItem