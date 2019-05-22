import React, { useContext } from "react";
import { Router } from "CONTEXTS/Router.jsx";
import s from "./PageSwapper.scss";

export default function PageSwapper(props){

	//HOOKS
	//----------------
	const { 
		page // (string) the id of the page to swap to
	} = useContext(Router).state;

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
		<div className={`${s.wrapper} ${isActive ? s.active : s.inactive} ${s.slide} ${s[direction]} ${className}`}>
			{children}
		</div>
	);
}//PageSwapper