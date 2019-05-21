import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Wine } from "CONTEXTS/Wine.jsx";
import * as ACTIONS from "SHARED/actions.js";

console.warn("TODO: update useEffects to listen for more than just colour changes");
console.warn("TODO: handle unknown values for the id / filters if the user changes them.");

const Router       = createContext();
const initialState = {
	page: "list"
};

function reducer(state, action){

	const {
		type,    // (string) which action to perform (from SHARED/actions.js)
		value    // (???) TBD
	} = action;

	switch(type){
		case ACTIONS.SET_ACTIVE_PAGE:

			console.log("setting page to : ", value);

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
	const { 
		state: wineState, 
		dispatch: dispatchWine 
	} = useContext(Wine);
	
	//sync all of the wine filters with the url
	useEffect(applyUrlParams, [])
	useEffect(syncBrowserNavigation);
	useEffect(pushFiltersToHistory, [ wineState.filters.color ]);
	useEffect(pushWineToHistory, [ wineState.activeWine.id ]);

	//update view-state when switching from list to details
	useEffect(updatePage, [ wineState.activeWine.id ]);


	//EFFECT HANDLING
	//-------------------
	function applyUrlParams(){
		const url    = new URL(window.location.href);
		const params = new URLSearchParams(url.search);
		const color  = params.get("color");
		const id     = params.get("id");

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
		}
	}//applyUrlParams

	function syncBrowserNavigation(){
		window.addEventListener("popstate", handleHistoryChange);
		return () => { window.removeEventListener("popstate", handleHistoryChange) }
	}//syncBrowserNavigation

	function pushFiltersToHistory(){
		const { color } = wineState.filters;
		if(color) window.history.pushState({ color }, "", `?color=${color}`);
	}//pushFiltersToHistory

	function pushWineToHistory(){
		const { id } = wineState.activeWine;
		if(id) window.history.pushState({ id }, "", `?id=${id}`);
	}//pushWineToHistory

	function updatePage(){
		if(!!wineState.activeWine.id){
			dispatch({
				type: ACTIONS.SET_ACTIVE_PAGE,
				value: "details"
			});
		}
	}//updatePage


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
				})
			}
		}
	}//handleHistoryChange
	

	//PRIVATE VARS
	//--------------------
	const { children } = props;

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