import React, { useContext, useState } from "react";
import { Wine } from "CONTEXTS/Wine.jsx";
import { Router } from "CONTEXTS/Router.jsx";
import { Client } from "CONTEXTS/Client.jsx";
import { getAssetUrl } from "SHARED/utils.js";
import * as ACTIONS from "SHARED/actions.js";
import Price from "COMPONENTS/Price/Price.jsx";
import DiscountSticker from "COMPONENTS/DiscountSticker/DiscountSticker.jsx";
import RebuyMeter from "COMPONENTS/RebuyMeter/RebuyMeter.jsx";
import s from "./WineListItem.scss";
import shared from "SHARED/shared.scss";

export default function WineListItem(props){

	//HOOKS
	//----------------------
	const { state, dispatch: dispatchWine } = useContext(Wine);
	const { sizeBucket }                    = useContext(Client).state;
	const { dispatch: dispatchRouter }      = useContext(Router);
	const [ loaded, setLoaded ]             = useState(false);


	//EVENT HANDLING
	//----------------------
	function showDetails(id){
		dispatchWine({
			type: ACTIONS.SET_ACTIVE_WINE,
			value: id
		});
		dispatchRouter({
			type: ACTIONS.SET_ACTIVE_PAGE,
			value: "details"
		});
	}//showDetails
	
	function reveal(){
		setLoaded(true);
	}//reveal


	//UTILS
	//----------------------
	function getThumbSize(bucket){
		switch(bucket){
			//mobile
			case 0:
				return 125;
			//tablet
			case 1:
				return 300;
			//desktop
			default:
				return 400;
		}
	}//getThumbSize


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
	

	const thumbSize      = getThumbSize(sizeBucket);
	const wineThumbSrc   = getAssetUrl(public_id, { w: thumbSize });
	const discounted     = original != null;
	const discount       = discounted ? Math.floor((1 - (actual / original)) * 100) : 0;
	
	//give the event handler the id
	showDetails          = showDetails.bind(true, id);


	return(
		<li
			className={`${s.wrapper} ${shared.roundedBox} ${loaded ? s.visible : s.hidden}`} 
			onClick={showDetails}
			aria-label="Read more details."
			tabIndex="0">
			<figure className={s.container}>
				<div className={s.thumb}>
					<img
						className={s.image} 
						src={wineThumbSrc} 
						alt={`A bottle of ${wineName}`}
						onLoad={reveal}
					/>
				</div>
				<figcaption className={s.details}>
					<header className={s.names}>
						<h2 className={s.producer}>
							{producerName}
						</h2>
						<h1 className={s.wine}>
							{wineName}
						</h1>
					</header>
					<RebuyMeter 
						className={s.rebuyRating}
						percentage={rebuy_rating} 
					/>
					<div className={s.prices}>
						<Price  
							className={`${s.price} ${s.actual}`}
							currency={currency}
							aria-label="Actual cost per bottle.">
							{actual}
						</Price>
						{discounted && (
							<Price
								className={`${s.price} ${s.original}`}
								currency={currency}   
								aria-label="Original cost per bottle">
								{original}
							</Price>
						)}
					</div>
					{discounted && (
						<DiscountSticker 
							className={s.discount}
							discount={discount}
						/>
						
					)}
				</figcaption>
			</figure>
		</li>
	);

}//WineListItem