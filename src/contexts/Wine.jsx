import React, { createContext, useReducer, useEffect } from "react";
import { placeholder__wines, fetchWines } from "SHARED/data.js";
import * as ACTIONS from "SHARED/actions.js";

const Wine         = createContext();
const initialState = {
	wines: [],
	filters: {
		color: "",
		advanced: []
	}
};

function reducer(state, action){

	const {
		type,
		value
	} = action;



	switch(type){
		case ACTIONS.UPDATE_WINES:
			return {
				...state,
				wines: value
			};

		case ACTIONS.FILTER_BY_COLOR:
			return {
				...state,
				filters: {
					advanced: state.filters.advanced,
					color: value
				}
			};
		default:
			return { ...state };
	}

}//reducer

function WineProvider(props){

	//HOOKS
	//----------------------
	const [ state, dispatch ] = useReducer(reducer, initialState);
	const { filters }         = state;

	useEffect(syncWinesByColorFilter, [ filters.color ])
	// useEffect(updateFilteredWines, [ filters ]);


	//EFFECT HANDLING
	//----------------------
	function syncWinesByColorFilter(){

		if(filters.color){
			updateWineList({ 
				filters: {
					wine_color: filters.color,
				},
				limit: 25
			});
		}
	}//syncWinesByColorFilter


	//UTILS
	//---------------------
	async function updateWineList(parameters){
		const result = await fetchWines(parameters);

		console.log(result)

		dispatch({ 
			type: ACTIONS.UPDATE_WINES,
			value: result
		});
	}//updateWineList

	

	//PRIVATE VARS
	//----------------------
	const { children } = props;

	return(
		<Wine.Provider
			value={{ state, dispatch }}>
			{children}
		</Wine.Provider>
	);
}//WineProvider


export {
	Wine,
	WineProvider
};