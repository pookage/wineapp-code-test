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

	//RENDER
	//--------------------------
	function renderWines(details, index){

		const {
			name: wineName = "", // (string) human-readable name of the wine
			producer       = {}  // (object) containing information about the wine's producer
		} = details;

		const {
			name: producerName = "" // (string) name of the wine's producer
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
				<Pagination>
					{wines}
				</Pagination>
			</div>
		</article>
	);

}//WineList