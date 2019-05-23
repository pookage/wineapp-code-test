import React, { useState, useEffect, useContext } from "react";
import { Client } from "CONTEXTS/Client.jsx";
import { PageSwapper } from "CONTEXTS/PageSwapper.jsx";
import s from "./Pagination.scss";

export default function Pagination(props){

	//HOOKS
	//---------------------------
	const [ offset, setOffset ]   = useState(0);
	const { 
		wrapper: pageWrapper // (HTMLElement) reference to the page's scrollable outer wrapper
	} = useContext(PageSwapper);
	const { 
		sizeBucket // (number)[0-4] which size bucket the user's viewport fits into
	} = useContext(Client).state;

	useEffect(resetOffset, [ props.children.length ]);
	useEffect(scrollToTop, [ offset ]);


	//EFFECT HANDLING
	//---------------------------
	function resetOffset(){
		setOffset(0);
	}//resetOffset
	function scrollToTop(){

		try {
			pageWrapper.current.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		} catch(error){
			pageWrapper.current.scrollTop = 0;
		}

	}//scrollToTop	


	//EVENT HANDLING
	//--------------------------
	function updatePage(direction){
		setOffset(offset + direction);
	}//updatePage
	function setPage(index){
		setOffset(index);
	}//setPage

	//UTILS
	//---------------------------
	function getDefaultMaxItems(bucket){
		switch(bucket){
			case 0:
			case 1:
				return 10;
			case 2:
				return 24;
			case 3:
				return 35;
			default:
				return 20;
		}
	}//getDefaultMaxItems


	//PRIVATE VARS
	//---------------------------
	const {
		maxItems = getDefaultMaxItems(sizeBucket),   // (number) maximum no. of items per page
		HTMLTag  = "ol", // (string) which semantic tag should be used for the component wrapper
		children         // (array) of elements to paginate
	} = props;

	//calculate which children to show
	const startIndex   = offset * maxItems;
	const endIndex     = startIndex + maxItems;
	const items        = children.slice(startIndex, endIndex);

	//derive pagination labels
	const page         = offset + 1;
	const pages        = Math.ceil(children.length / maxItems);

	//rebind update function for more readable use later
	const nextPage     = updatePage.bind(true, +1);
	const previousPage = updatePage.bind(true, -1);


	//RENDER FUNCTIONS
	//--------------------------
	function renderNumberedButtons(){
		const buttons = new Array(pages);

		for(let i = 0; i < pages; i++){

			buttons[i] = (
				<button
					className={s.button}
					onClick={setPage.bind(true, i)}
					disabled={offset == i}
					key={`pagination__quick_link__page_${i}`}>
					{i + 1}
				</button>
			);
		}

		return buttons;
	}//renderNumberedButtons


	//render the pagination if there's any results to show...
	if(items.length > 0) {
		return(
			<HTMLTag className={s.wrapper}>
				<div className={s.items}>
					{items}
				</div>
				<header className={s.navigation}>		
					<nav className={s.controls}>
						<button
							className={`${s.button} ${s.previous}`} 
							onClick={previousPage}
							disabled={page == 1}
							aria-label="Previous page of results." 
						/>
						<div className={s.pageList}>
							{renderNumberedButtons()}
						</div>
						<button
							className={`${s.button} ${s.next}`} 
							onClick={nextPage}
							disabled={page == pages}
							aria-label="Next page of results."
						/>
					</nav>
					<p className={s.currentPage}>
						Page <span className={s.number}>{page}</span> of <span className={s.number}>{pages}</span>
					</p>
				</header>
			</HTMLTag>
		);
	} 

	//...show a cheeky message when there's no results
	else {
		return (
			<HTMLTag className={s.wrapper}>
				<p className={s.noResults}>
					Looks like we're dry!
				</p>
			</HTMLTag>
		)
	}
}//Pagination