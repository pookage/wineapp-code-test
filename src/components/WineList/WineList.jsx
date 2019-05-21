import React, { useContext } from "react";
import { Wine } from "CONTEXTS/Wine.jsx";
import { convertToSafeString } from "SHARED/utils.js";
import WineListItem from "./WineListItem.jsx";
import WineListRadioFilter from "./WineListRadioFilter.jsx";
import Pagination from "COMPONENTS/Pagination/Pagination.jsx";
import s from "./WineList.scss";


export default function WineList(){

	//HOOKS
	//-----------------------
	const { state, dispatch } = useContext(Wine);

	//PRIVATE VARS
	//------------------------
	const { wines: wineData } = state;
	const wines               = wineData.map(renderWines);
	const hasWines            = wines.length > 0;


	// console.log(state)

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
		<article className={s.wrapper}>
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
			{hasWines ? (
				<Pagination>
					{wines}
				</Pagination>
			) : (
				<p>
					Sorry, no wines match those filters!
				</p>
			)}
		</article>
	);

}//WineList