import React, { useContext } from "react";
import { Wine } from "CONTEXTS/Wine.jsx";
import { convertToSafeString } from "SHARED/utils.js";
import WineListItem from "./WineListItem.jsx";


export default function WineList(){

	//HOOKS
	//-----------------------
	const { state, dispatch } = useContext(Wine);

	//PRIVATE VARS
	//------------------------
	const { wines: wineData } = state;
	const wines               = wineData.map(renderWines);


	//RENDER FUNCTIONS
	//--------------------------
	function renderWines(details){

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
		<article>
			<header>
				<form>
					<fieldset>
						<legend>
							Colour
						</legend>

						<div>
							<label htmlFor="wine_color__red">Red</label>
							<input id="wine_color__red" type="radio" name="wine_color" value="red" />
						</div>

						<div>
							<label htmlFor="wine_color__white">White</label>
							<input id="wine_color__white" type="radio" name="wine_color" value="white" />
						</div>

						<div>
							<label htmlFor="wine_color__rose">Rose</label>
							<input id="wine_color__rose" type="radio" name="wine_color" value="rose" />
						</div>

						<div>
							<label htmlFor="wine_color__sparkling">Sparkling</label>
							<input id="wine_color__sparkling" type="radio" name="wine_color" value="sparkling" />
						</div>
						
					</fieldset>
				</form>
			</header>
			<ol>
				{wines}
			</ol>
		</article>
	);

}//WineList