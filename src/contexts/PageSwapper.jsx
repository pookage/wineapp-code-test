import React, { createContext, useContext, useRef } from "react";
import { Router } from "CONTEXTS/Router.jsx";
import s from "./PageSwapper.scss";

const PageSwapper = createContext();

function PageSwapperProvider(props){

	//HOOKS
	//----------------
	const { 
		page // (string) the id of the page to swap to
	} = useContext(Router).state;

	const wrapper = useRef();

	//PRIVATE VARS
	//----------------
	const {
		id,             // (string) id of this page
		direction,      // (string)[left, right] which direction the page should slide when inactive
		className = "", // (string) any CSS classes to apply to the component wrapper
		children
	} = props;

	const isActive = page == id;

	return(
		<PageSwapper.Provider 
			value={{ wrapper }}>
			<div 
				className={`${s.wrapper} ${isActive ? s.active : s.inactive} ${s.slide} ${s[direction]} ${className}`}
				ref={wrapper}>
				{children}
			</div>
		</PageSwapper.Provider>
	);
}//PageSwapper

export {
	PageSwapper,
	PageSwapperProvider
};