import React, { useReducer, createContext, useEffect } from "react";
import { detectOrientation, detectSizeBucket, detectOS, detectBrowser } from "SHARED/utils.js";
import * as ACTIONS from "SHARED/actions.js";


const Client       = createContext();
const initialState = {
	sizeBucket: 0,
	orientation: "portrait",
	os: "android",
	browser: "chrome",
	isTouch: true,
	language: window.navigator.language
};

function reducer(state, action){

	const {
		type,
		value
	} = action;

	switch(type){

		case ACTIONS.UPDATE_DIMENSION_PROPERTIES:
			const { orientation, sizeBucket } = value;
			return {
				...state,
				orientation, sizeBucket
			};


		case ACTIONS.UPDATE_ENVIRONMENT:
			const { os,browser } = value;
			return {
				...state,
				os, browser
			};

		default:
			return { ...state };
	}

}//reducer

function ClientProvider(props){

	//HOOKS
	//----------------
	const [ state, dispatch ] = useReducer(reducer, initialState);
	useEffect(updateDimensions, [ window.innerWidth, window.innerHeight ]);
	useEffect(updateEnvironment, [ window.navigator.userAgent, window.navigator.appVersion ]);


	//HOOK HANDLING
	//-----------------
	function updateDimensions(){

		console.warn("TODO: Add a debounced resize listener to sync updateDimensions");

		const orientation = detectOrientation(window)
		const sizeBucket  = detectSizeBucket(window, orientation);

		dispatch({
			type: ACTIONS.UPDATE_DIMENSION_PROPERTIES,
			value: {
				orientation,
				sizeBucket
			}
		});
	}//updateDimensions

	function updateEnvironment(){

		const {
			userAgent,
			appVersion
		} = window.navigator;

		const browser = detectBrowser(userAgent);
		const os      = detectOS(appVersion);

		dispatch({
			type: ACTIONS.UPDATE_ENVIRONMENT,
			value: {
				browser,
				os
			}
		})

	}//updateEnvironment


	//PRIVATE VARS
	//----------------
	const { children } = props;

	return(
		<Client.Provider
			value={{ state, dispatch }}>
			{children}
		</Client.Provider>
	);
}//ClientProvider

export {
	Client,
	ClientProvider
};