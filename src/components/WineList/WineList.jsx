import React, { useContext } from "react";
import { Wine } from "CONTEXTS/Wine.jsx";
import { convertToSafeString } from "SHARED/utils.js";
import WineListItem from "./WineListItem.jsx";
import WineListRadioFilter from "./WineListRadioFilter.jsx";
import Pagination from "COMPONENTS/Pagination/Pagination.jsx";
import s from "./WineList.scss";

console.warn("TODO: scroll to the top whenever the wine list is updated.");
console.warn("TODO: create a component to handle the slide in/out state of the list");

export default function WineList(){

	//HOOKS
	//-----------------------
	const { state, dispatch } = useContext(Wine);

	//PRIVATE VARS
	//------------------------
	const { wines: wineData } = state;
	const wines               = wineData.map(renderWines);
	const hasWines            = wines.length > 0;

	//RENDER FUNCTIONS
	//--------------------------
	function renderWines(details, index){

		const {
			name: wineName = "", // (string) Human-readable name of the wine
			producer       = {}
		} = details;

		const {
			name: producerName = ""
		} = producer;

		const key = convertToSafeString(`wine_list__${producerName}__${wineName}`);

		return (
			<WineListItem
				key={key} 
				{...details } 
			/>
		);
	}//renderWines

	return(
		<article className={`${s.wrapper}`}>
			<header className={s.header}>
				<form className={s.filters}>
					<div className={s.colourOptions}>

						<WineListRadioFilter 
							filter="wine_color"
							value="red"
						/>
						<WineListRadioFilter 
							filter="wine_color"
							value="white"
						/>
						<WineListRadioFilter 
							filter="wine_color"
							value="rose"
						/>
						<WineListRadioFilter 
							filter="wine_color"
							value="sparkling"
						/>
					</div>
				</form>
			</header>
			<div className={s.container}>
				{hasWines && (
					<Pagination>
						{wines}
					</Pagination>
				)}
			</div>
		</article>
	);

}//WineList