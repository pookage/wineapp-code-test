import React from "react";
import { getAssetUrl } from "SHARED/utils.js";

export default function WineListItem(props){

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

	
	const wineThumbSrc = getAssetUrl(public_id, { w: 300 });
	const price        = new Intl.NumberFormat(navigator.language, { style: "currency", currency }).format(actual);

	return(
		<li>
			<figure>
				<img src={wineThumbSrc} alt={`A bottle of ${wineName}`} />
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
					<p aria-label="Cost per bottle.">
						{price}
					</p>
				</figcaption>
			</figure>
		</li>
	);

}//WineListItem