import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Wine } from "CONTEXTS/Wine.jsx";
import { getUrlParams } from "SHARED/utils.js";
import * as ACTIONS from "SHARED/actions.js";

const Router       = createContext();
const initialState = {
	page: "list"
};

function reducer(state, action){

	const {
		type,
		value
	} = action;

	switch(type){
		case ACTIONS.SET_ACTIVE_PAGE:
			return {
				...state,
				page: value
			};

		default:
			console.error(`Action: ${type} does not exist in the <Router> context.`);
			return { ...state };
	}

}//reducer

function RouterProvider(props){

	//HOOKS
	//--------------------
	const [ state, dispatch ] = useReducer(reducer, initialState);
	const { state: wineState, dispatch: dispatchWine } = useContext(Wine);
	
	//maintain sync between the page and wine details / filters
	useEffect(applyUrlParams, [])
	useEffect(syncBrowserNavigation);
	useEffect(pushWineToHistory, [ wineState.activeWine.id ]);
	useEffect(pushFiltersToHistory, [ wineState.filters.color ]);
	useEffect(syncParamsWithWines, [ state.page ]);


	//EFFECT HANDLING
	//-------------------
	function applyUrlParams(){

		//apply any parameters that exist in the url on page load
		const [ color, id ] = getUrlParams("color", "id");

		if(color){
			dispatchWine({
				type: ACTIONS.FILTER_BY_COLOR,
				value: color
			});
		}

		if(id){
			dispatchWine({
				type: ACTIONS.SET_ACTIVE_WINE,
				value: id
			});
			dispatch({
				type: ACTIONS.SET_ACTIVE_PAGE,
				value: "details"
			});
		}
	}//applyUrlParams

	function syncBrowserNavigation(){
		//update filters with history back/forward
		window.addEventListener("popstate", handleHistoryChange);
		return () => { window.removeEventListener("popstate", handleHistoryChange) }
	}//syncBrowserNavigation

	function pushFiltersToHistory(){
		//if the history / url params / wine filters are are out of sync; sync'em
		const [ paramColor ] = getUrlParams("color");
		const { color }      = wineState.filters;

		if(color != paramColor){
			window.history.pushState({ color }, "", `?color=${color}`);	
		}
	}//pushFiltersToHistory

	function pushWineToHistory(){
		//if the history / url params / active wine are are out of sync; sync'em
		const [ paramId ] = getUrlParams("id");
		const { id }      = wineState.activeWine;

		if(id != paramId){
			window.history.pushState({ id }, "", `?id=${id}`);
		}
	}//pushWineToHistory

	function syncParamsWithWines(){
		//make sure that the appropriate url params are shown for the current page
		switch(state.page){
			case "list":
				pushFiltersToHistory();
				break;
			case "details":
				pushWineToHistory();
				break;
		}
	}//syncParamsWithWines


	//EVENT HANDLING
	//--------------------
	function handleHistoryChange(event){
		if(event.state){
			const {
				color,
				id
			} = event.state;
			if(color){
				dispatchWine({
					type: ACTIONS.FILTER_BY_COLOR,
					value: color
				});
			}
			if(id){
				dispatchWine({
					type: ACTIONS.SET_ACTIVE_WINE,
					value: id
				});
				dispatch({
					type: ACTIONS.SET_ACTIVE_PAGE,
					value: "details"
				});
			} else {
				dispatch({
					type: ACTIONS.SET_ACTIVE_PAGE,
					value: "list"
				});
			}
		}
	}//handleHistoryChange
	

	//PRIVATE VARS
	//--------------------
	const { children } = props;


	//RENDER
	//-------------------
	return(
		<Router.Provider 
			value={{ state, dispatch }}>
			{children}
		</Router.Provider>
	);
}//RouterProvider

export {
	Router,
	RouterProvider
};