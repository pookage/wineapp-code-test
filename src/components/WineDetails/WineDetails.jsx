import React, { useContext, useState } from "react";
import * as ACTIONS from "SHARED/actions.js";
import { Wine } from "CONTEXTS/Wine.jsx";
import { Client } from "CONTEXTS/Client.jsx";
import { Router } from "CONTEXTS/Router.jsx";
import { getAssetUrl } from "SHARED/utils.js";
import Price from "COMPONENTS/Price/Price.jsx";
import DiscountSticker from "COMPONENTS/DiscountSticker/DiscountSticker.jsx";
import RebuyMeter from "COMPONENTS/RebuyMeter/RebuyMeter.jsx";
import s from "./WineDetails.scss";

export default function WineDetails(props){

	//HOOKS
	//-------------------------
	const { state, dispatch: dispatchWine } = useContext(Wine);
	const { dispatch: dispatchRouter }      = useContext(Router);
	const [ loaded, setLoaded ]             = useState(false)

	const { 
		sizeBucket, // (number)[0-4] whate size bucket the user's viewport dimensions fit into
		orientation // (string)[landscape, desktop]
	} = useContext(Client).state;

	const { 
		details // (object) from server containing details about the current wine
	} = state.activeWine;


	//UTILS
	//-------------------------
	function getHeaderSize(bucket){
		switch(bucket){
			case 0:
				return 500;
			case 1:
				return 768;
			default:
				return 1024;
		}
	}//getHeaderSize


	//EVENT HANDLING
	//-------------------------
	function backToList(){
		dispatchRouter({
			type: ACTIONS.SET_ACTIVE_PAGE,
			value: "list"
		});
	}//backToList
	function reveal(){
		setLoaded(true);
	}//reveal


	if(Object.values(details).length > 0){

		//PRIVATE VARS
		//--------------------------
		
		const {
			name: wineName = "", // (string) name of the wine
			producer       = {}, // (object) containing details about the wine's producer
			price          = {}, // (object) containing the prices and currency for the wine
			media          = [], // (array) of objects containing cloudinary ids for associated media
			categories     = [], // (array) of tags / categories that the wine fits into
			rebuy_rating,        // (number)[0-100] percentage of users who would buy the wine again
			year,                // (number)[yyyy] Year the wine was made
			quantity,            // (number) volume per bottle
			measure,             // (string) units used for the quantity
			strength,            // (number) APV for the wine
			food_matching  = "", // (string) descriptive text for what food pairs with the wine
			tasting_note   = ""  // (string) descriptive text for the wine's flavours
		} = details;

		const {
			name: producerName    = "", // (string) name of the producer
			about: winemakerAbout = ""  // (string) history / about text for the producer
		} = producer;

		const {
			actual,   // (number) current price of the wine
			original, // (number) previous price of the wine if discounted (0 if not discounted)
			currency  // (string) currency code of for the actual / original price values
		} = price;

		const {
			public_id // (string) id used to retrieve asset from cloudinary
		} = media[0];

		//asset retrieval
		const headerImageSize = getHeaderSize(sizeBucket, orientation);
		const headerImageSrc  = getAssetUrl(public_id, { w: headerImageSize });

		//pricing
		const discounted     = original != null;
		const discount       = discounted ? Math.floor((1 - (actual / original)) * 100) : 0;

		//tags
		const flavourTags = categories.filter(category => category.type == "primary_flavor");
		const foodTags    = categories.filter(category => category.type == "food_category");
		const miscTags    = categories.filter(category => category.type != "food_category" && category.type != "primary_flavor");

		//orientation flag used for selective rendering
		const isLandscape = orientation == "landscape";

		//RENDER
		//---------------------------
		function renderTag(tag){
			return(
				<li 
					key={`tag__${tag.type}__${tag.name}`}
					className={s.tag}>
					{tag.name}
				</li>
			);
		}//renderTag
		function renderSummary(){
			return(
				<div className={s.summary}>
					<h2 className={`${s.name} ${s.producer}`}>
						{producerName}
					</h2>
					<h1 className={`${s.name} ${s.wine}`}>
						{wineName}
					</h1>
					<div className={s.prices}>
						<Price
							className={s.actual} 
							currency={currency}
							aria-label="Actual price.">
							{actual}
						</Price>
						{discounted && (
							<Price
								className={s.original}
								currency={currency} 
								aria-label="Previous price.">
								{original}
							</Price>
						)}
					</div>
				</div>
			);
		}//renderSummary

		return(
			<article className={`${s.wrapper} ${loaded ? s.visible : s.hidden}`}>
				<button
					className={s.back}
					onClick={backToList}
					aria-label="Back to list." 
				/>
				
				<header className={s.header}>
					{(sizeBucket < 2 && !isLandscape) && renderSummary()}
					<div className={s.hero}>
						<figure className={s.figure}>
							<img
								className={`${s.image}`} 
								src={headerImageSrc} 
								alt={`${wineName} by ${producerName}`}
								onLoad={reveal} 
							/>
						</figure>
						<aside className={s.sellingPoints}>
							<RebuyMeter
								className={s.rebuyRating} 
								HTMLTag="p"
								percentage={rebuy_rating} 
							/>
							{discounted && (
								<DiscountSticker
									className={s.discount} 
									HTMLTag="p"
									discount={discount} 
								/>
							)}
						</aside>
					</div>
				</header>
				
				<div className={s.info}>
					{(sizeBucket >= 2 || isLandscape) && renderSummary()}
					<section className={`${s.section} ${s.wine}`}>
						<section className={`${s.section} ${s.about}`}>
							<h1 className={s.title}>
								About this wine
							</h1>
							<dl className={s.details}>
								<div className={s.property}>
									<dt className={s.key}>Year</dt>
									<dd className={s.value}>{year}</dd>
								</div>
								<div className={s.property}>
									<dt className={s.key}>Size</dt>
									<dd className={s.value}>{quantity}{measure}</dd>
								</div>
								<div className={s.property}>
									<dt className={s.key}>
										<abbr title="Alchol by Volume">ABV</abbr>
									</dt>
									<dd className={s.value}>{strength}%</dd>
								</div>
							</dl>

							<ul className={s.tags} 
								aria-label="Related tags.">
								{miscTags.map(renderTag)}
							</ul>
						</section>

						<section className={`${s.section} ${s.flavours}`}>
							<h1 className={s.title}>
								Flavours
							</h1>
							<p className={s.body}>
								{tasting_note}
							</p>
							<ul className={s.tags}
								aria-label="Flavours.">
								{flavourTags.map(renderTag)}
							</ul>
						</section>

						<section className={`${s.section} ${s.foodPairing}`}>
							<h1 className={s.title}>
								Food Pairing
							</h1>
							<p className={s.body}>
								{food_matching}
							</p>
							<ul className={s.tags}
								aria-label="Good food pairings.">
								{foodTags.map(renderTag)}
							</ul>
						</section>
					</section>

					{winemakerAbout && (
						<section className={`${s.section}`}>
							<h1 className={s.title}>
								About the Winemaker
							</h1>
							<p className={s.body}>
								{winemakerAbout}
							</p>
						</section>
					)}
				</div>

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