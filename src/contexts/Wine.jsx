import React, { createContext, useReducer, useEffect, useContext } from "react";
import { placeholder__wines, fetchWines, fetchWineDetails } from "SHARED/data.js";
import * as ACTIONS from "SHARED/actions.js";

const Wine         = createContext();
const initialState = {
	activeWine: {
		id: "",
		details: {}
	},
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

		case ACTIONS.SET_ACTIVE_WINE:
			return {
				...state,
				activeWine: {
					id: value,
					details: {}
				}
			};

		case ACTIONS.SET_ACTIVE_WINE_DETAILS:
			return {
				...state,
				activeWine: {
					id: state.activeWine.id,
					details: value
				}
			};

		default:
			return { ...state };
	}

}//reducer

function WineProvider(props){

	//HOOKS
	//----------------------
	const [ state, dispatch ]         = useReducer(reducer, initialState);
	const { filters, activeWine } = state;

	useEffect(syncWinesByColorFilter, [ filters.color ]);
	useEffect(syncWineDetails, [ activeWine.id ]);


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
	function syncWineDetails(){
		if(activeWine.id){
			updateWineDetails(activeWine.id);
			
		} else {
			// dispatchRoute({
			// 	type: ACTIONS.SET_ACTIVE_PAGE,
			// 	value: "list"
			// });
		}
	}//syncWineDetails


	//UTILS
	//---------------------
	async function updateWineList(parameters){
		const result = await fetchWines(parameters);
		dispatch({ 
			type: ACTIONS.UPDATE_WINES,
			value: result
		});
	}//updateWineList
	async function updateWineDetails(id){
		const details = await fetchWineDetails(id);

		dispatch({
			type: ACTIONS.SET_ACTIVE_WINE_DETAILS,
			value: details
		});
		// dispatchRoute({
		// 	type: ACTIONS.SET_ACTIVE_PAGE,
		// 	value: "details"
		// });
	}//updateWineDetails

	

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