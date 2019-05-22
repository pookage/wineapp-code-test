import React, { useContext } from "react";
import { Wine } from "CONTEXTS/Wine.jsx";
import { Router } from "CONTEXTS/Router.jsx";
import { Client } from "CONTEXTS/Client.jsx";
import { getAssetUrl } from "SHARED/utils.js";
import * as ACTIONS from "SHARED/actions.js";
import s from "./WineListItem.scss";
import shared from "SHARED/shared.scss";

export default function WineListItem(props){

	//HOOKS
	//----------------------
	const { state, dispatch: dispatchWine } = useContext(Wine);
	const { sizeBucket }                    = useContext(Client).state;
	const { dispatch: dispatchRouter }      = useContext(Router);


	//EVENT HANDLING
	//----------------------
	function showDetails(id){

		console.log("set wine ID to : ", id);

		dispatchWine({
			type: ACTIONS.SET_ACTIVE_WINE,
			value: id
		});
		dispatchRouter({
			type: ACTIONS.SET_ACTIVE_PAGE,
			value: "details"
		});
	}//showDetails


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
	const currencySystem = new Intl.NumberFormat(navigator.language, { style: "currency", currency });
	const price_original = currencySystem.format(original);
	const price_actual   = currencySystem.format(actual);
	const discounted     = original != null;
	const discount       = discounted ? Math.floor((1 - (actual / original)) * 100) : 0;
	
	//give the event handler the id
	showDetails          = showDetails.bind(true, id);


	return(
		<li
			className={`${s.wrapper} ${shared.roundedBox}`} 
			onClick={showDetails}
			aria-label="Read more details."
			tabIndex="0">
			<figure className={s.container}>
				<div className={s.thumb}>
					<img
						className={s.image} 
						src={wineThumbSrc} 
						alt={`A bottle of ${wineName}`}
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
					<p className={s.rebuyRating}>
						<span className={s.percentage}>
							{rebuy_rating}%
						</span>
						would rebuy
					</p>
					<div className={s.prices}>
						<p  className={`${s.price} ${s.actual}`}
							aria-label="Actual cost per bottle.">
							{price_actual}
						</p>
						{discounted && (
							<p  className={`${s.price} ${s.original}`} 
								aria-label="Original cost per bottle">
								{price_original}
							</p>
						)}
					</div>
					{discounted && (
						<aside className={s.discount}>
							<span>
								{discount}%
							</span>
							off
						</aside>
					)}
				</figcaption>
			</figure>
		</li>
	);

}//WineListItem