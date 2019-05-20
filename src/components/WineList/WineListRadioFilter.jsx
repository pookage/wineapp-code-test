import React, { useContext } from "react";
import * as ACTIONS from "SHARED/actions.js";
import { Wine } from "CONTEXTS/Wine.jsx";

export default function WineListRadioFilter(props){

	//HOOKS
	//----------------------
	const { state, dispatch } = useContext(Wine);

	//PRIVATE VARS
	//----------------------
	const {
		filter,
		value
	} = props;

	const inputId = `${filter}__${value}`;
	updateFilter = updateFilter.bind(true, filter);


	//EVENT HANDLING
	//-----------------------
	function updateFilter(filterKey, event){

		const {
			value
		} = event.target;


		switch(filterKey){
			case "wine_color":
				dispatch({
					type: ACTIONS.FILTER_BY_COLOR, 
					value
				});
				break;
		}
	}//updateFilter


	return(
		<div>
			<label htmlFor={inputId}>
				{value}
			</label>
			<input 
				id={inputId}
				type="radio" 
				name={filter}
				value={value}
				onChange={updateFilter}
			/>
		</div>
	);

}//WineListRadioFilter