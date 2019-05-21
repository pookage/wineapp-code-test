import React, { useContext } from "react";
import * as ACTIONS from "SHARED/actions.js";
import { Wine } from "CONTEXTS/Wine.jsx";
import s from "./WineListRadioFilter.scss";
import shared from "SHARED/shared.scss";

export default function WineListRadioFilter(props){

	//HOOKS
	//----------------------
	const { state, dispatch } = useContext(Wine);


	//EVENT HANDLING
	//-----------------------
	function updateFilter(filterKey, value){
		
		switch(filterKey){
			case "wine_color":
				dispatch({
					type: ACTIONS.FILTER_BY_COLOR, 
					value
				});
				break;
		}
	}//updateFilter


	//PRIVATE VARS
	//----------------------
	const {
		filter,
		value
	} = props;

	const inputId = `${filter}__${value}`;
	updateFilter  = updateFilter.bind(true, filter, value);

	console.warn("TODO: add icons to the wine filters");

	return(
		<div className={s.wrapper}>
			<input
				className={s.input} 
				id={inputId}
				type="radio" 
				name={filter}
				value={value}
				onChange={updateFilter}
			/>
			<label 
				htmlFor={inputId}
				className={`${s.button} ${shared.roundedBox}`}>
				<span className={s.label}>
					{value}
				</span>
			</label>
		</div>
	);

}//WineListRadioFilter