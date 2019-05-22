import React, { useContext, useRef } from "react";
import * as ACTIONS from "SHARED/actions.js";
import { Wine } from "CONTEXTS/Wine.jsx";
import s from "./WineListRadioFilter.scss";
import shared from "SHARED/shared.scss";

export default function WineListRadioFilter(props){

	//HOOKS
	//----------------------
	const { state, dispatch } = useContext(Wine);
	const input               = useRef();


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

		input.current.blur();
		
	}//updateFilter


	//PRIVATE VARS
	//----------------------
	const {
		filter,
		value
	} = props;

	const {
		color
	} = state.filters;

	const inputId  = `${filter}__${value}`;
	const checked = color == value;

	updateFilter   = updateFilter.bind(true, filter, value);

	

	return(
		<div className={s.wrapper}>
			<input
				className={s.input} 
				id={inputId}
				type="radio" 
				name={filter}
				value={value}
				onChange={updateFilter}
				tabIndex="0"
				checked={checked}
				ref={input}
			/>
			<label 
				htmlFor={inputId}
				className={`${s.button} ${shared.roundedBox} ${s[`glass_${value}`]}`}>
				<span className={s.label}>
					<span className={s.text}>
						{value}
					</span>
				</span>
			</label>
		</div>
	);

}//WineListRadioFilter