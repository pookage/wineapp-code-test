import React, { createContext, useReducer, useEffect } from "react";
import * as ACTIONS from "SHARED/actions.js";

const Router       = createContext();
const initialState = {
	page: "home",
	filters: []
};

function reducer(state, action){

	const {
		type,    // (string) which action to perform (from SHARED/actions.js)
		value    // (???) TBD
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
	console.warn("TODO: sync browser history with page / filters etc");

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