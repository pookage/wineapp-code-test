import React, { useContext } from "react";
import * as ACTIONS from "SHARED/actions.js";
import { Wine } from "CONTEXTS/Wine.jsx";
import { Client } from "CONTEXTS/Client.jsx";
import { Router } from "CONTEXTS/Router.jsx";
import { getAssetUrl } from "SHARED/utils.js";
import s from "./WineDetails.scss";


console.warn("TODO : create a client provider to put regional currency stuff into");
console.warn("TODO: refactor using under_score naming convention instead of camelCase");
console.warn("TODO: move render maps into their own named functions");

export default function WineDetails(props){


	/* NOTE:
	------------------------------------
	
		You'll need to change the order of the header-items with
		flex to maintain the correct semantic order whilst adopting
		the correct styles

	*/

	//HOOKS
	//-------------------------
	const { state, dispatch } = useContext(Wine);
	const { state: routerState, dispatch: routerDispatch } = useContext(Router);

	const { 
		sizeBucket, // (number)[0-4] whate size bucket the user's viewport dimensions fit into
		orientation // (string)[landscape, desktop]
	} = useContext(Client).state;

	const { 
		details // (object)
	} = state.activeWine;

	const isActive = routerState.page == "details";


	//UTILS
	//-------------------------
	function getHeaderSize(bucket, orientation){
		switch(bucket){
			case 0:
				return 500;
			case 1:
				return orientation == "portrait" ? 768 : 1024;
			default:
				return 1024;
		}
	}//getHeaderSize


	//EVENT HANDLING
	//-------------------------
	function backToList(){
		routerDispatch({
			type: ACTIONS.SET_ACTIVE_PAGE,
			value: "list"
		});
	}//backToList


	if(Object.values(details).length > 0){

		//PRIVATE VARS
		//--------------------------
		
		const {
			name: wineName = "",
			producer       = {},
			price          = {},
			media          = [],
			categories     = [],
			rebuy_rating,
			year,
			quantity,
			measure,
			strength,
			food_matching  = "",
			tasting_note   = ""
		} = details;

		const {
			name: producerName = "",
			about: about_winemaker
		} = producer;

		const {
			actual,
			original,
			currency
		} = price;

		const {
			public_id
		} = media[0];

		const headerImageSize = getHeaderSize(sizeBucket, orientation);
		const headerImageSrc  = getAssetUrl(public_id, { w: headerImageSize });

		//PRICING
		//NOTE : this is repeated - might be worth putting some of this in a <Client> provider
		const currencySystem = new Intl.NumberFormat(navigator.language, { style: "currency", currency });
		const price_original = currencySystem.format(original);
		const price_actual   = currencySystem.format(actual);
		const discounted     = original != null;
		const discount       = discounted ? Math.floor((1 - (actual / original)) * 100) : 0;

		//TAGS
		const flavourTags = categories.filter(category => category.type == "primary_flavor");
		const foodTags    = categories.filter(category => category.type == "food_category");
		const miscTags    = categories.filter(category => category.type != "food_category" && category.type != "primary_flavor");

		return(
			<article className={`${s.wrapper} ${isActive ? s.active : s.inactive}`}>
				<header>
					<div>
						<h2>
							{producerName}
						</h2>
						<h1>
							{name}
						</h1>
						<p aria-label="Actual price.">
							{price_actual}
						</p>
						{discounted && (
							<p aria-label="Previous price.">
								{price_original}
							</p>
						)}
					</div>
					<div>
						<img src={headerImageSrc} alt={`${wineName} by ${producerName}`} />
						<aside>
							<p>
								{rebuy_rating}% would rebuy
							</p>
							{discounted && (
								<p>
									{discount}% off
								</p>
							)}
						</aside>
					</div>
				</header>
				
				<section>
					<h1>
						About this wine
					</h1>
					<dl>
						<div>
							<dt>Year</dt>
							<dd>{year}</dd>
						</div>
						<div>
							<dt>Size</dt>
							<dd>{quantity}{measure}</dd>
						</div>
						<div>
							<dt>
								<abbr title="Alchol by Volume">ABV</abbr>
							</dt>
							<dd>{strength}%</dd>
						</div>
					</dl>

					<ul aria-label="Related tags.">
						{miscTags.map(tag => (
							<li>
								{tag.name}
							</li>
						))}
					</ul>
				</section>

				<section>
					<h1>
						Flavours
					</h1>
					<p>
						{tasting_note}
					</p>

					<ul aria-label="Flavours.">
						{flavourTags.map(tag => (
							<li>
								{tag.name}
							</li>
						))}
					</ul>
				</section>

				<section>
					<h1>
						Food Pairing
					</h1>
					<p>
						{food_matching}
					</p>

					<ul aria-label="Good food pairings.">
						{foodTags.map(tag => (
							<li>
								{tag.name}
							</li>
						))}
					</ul>
				</section>

				<section>
					<h1>
						About the Winemaker
					</h1>
					<p>
						{about_winemaker}
					</p>
					<a href="">
						See more wines from here
					</a>
				</section>

				<aside>
					<h1>
						You may also like
					</h1>
					<ol>
						<li>~~look in the endpoints to see if there's any 'recommended_wines' section~~</li>
					</ol>
				</aside>

				<button
					className={s.back}
					onClick={backToList}>
					Back
				</button>

			</article>
		);
	} else {
		return (
			<p>
				No Wine Selected
			</p>
		);
	}
}//WineDetails