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


console.warn("TODO: trap the tab in the details page when active");
console.warn("TODO: replicate the parallax on the scroll.")

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
		details // (object)
	} = state.activeWine;


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
			about: winemakerAbout = ""
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
		const discounted     = original != null;
		const discount       = discounted ? Math.floor((1 - (actual / original)) * 100) : 0;

		//TAGS
		const flavourTags = categories.filter(category => category.type == "primary_flavor");
		const foodTags    = categories.filter(category => category.type == "food_category");
		const miscTags    = categories.filter(category => category.type != "food_category" && category.type != "primary_flavor");


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

		return(
			<article className={`${s.wrapper} ${loaded ? s.visible : s.hidden}`}>
				<button
					className={s.back}
					onClick={backToList}
					aria-label="Back to list." 
				/>
				
				<header className={s.header}>
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

					<section className={`${s.section}`}>
						<h1 className={s.title}>
							About the Winemaker
						</h1>
						<p className={s.body}>
							{winemakerAbout}
						</p>
					</section>
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