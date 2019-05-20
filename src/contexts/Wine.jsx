import React, { createContext, useReducer } from "react";
import { placeholder__wines } from "SHARED/data.js";
import * as ACTIONS from "SHARED/actions.js";

const Wine         = createContext();
const initialState = {
	wines: placeholder__wines,
	filters: []
};

function reducer(state, action){

	const {
		type,
		value
	} = action;

	switch(type){
		default:
			return { ...state };
	}

}//reducer

function WineProvider(props){

	//HOOKS
	//----------------------
	const [ state, dispatch ] = useReducer(reducer, initialState);

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