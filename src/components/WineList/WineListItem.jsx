import React, { useContext } from "react";
import { Wine } from "CONTEXTS/Wine.jsx";
import { getAssetUrl } from "SHARED/utils.js";

export default function WineListItem(props){

	//HOOKS
	//----------------------
	const { state, dispatch } = useContext(Wine);

	//PRIVATE VARS
	//---------------------
	const {
		name: wineName   = "",   // (string) Human-readable name of the wine
		media: wineMedia = [{}], // (array) of objects containing data needed to request related media
		producer         = {},   // (object) containing media / information about the wine's producer
		price: priceData = {},   // (object) containing price value and currency for the wine
		rebuy_rating     = -1    // (number)[0-100] % of users who have indicated they would buy the wine again
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

	
	const wineThumbSrc     = getAssetUrl(public_id, { w: 300 });
	const currencySystem   = new Intl.NumberFormat(navigator.language, { style: "currency", currency });
	const price_original   = currencySystem.format(original);
	const price_discounted = currencySystem.format(actual);
	const discount         = Math.floor((1 - (actual / original)) * 100);
	

	return(
		<li>
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
					<p aria-label="Discounted cost per bottle.">
						{price_discounted}
					</p>
					<p aria-label="Cost per bottle">
						{price_original}
					</p>
					<aside>
						{discount}% off
					</aside>
				</figcaption>
			</figure>
		</li>
	);

}//WineListItem