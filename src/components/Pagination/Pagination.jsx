import React, { useState, useEffect, useContext } from "react";
import { PageSwapper } from "CONTEXTS/PageSwapper.jsx";
import s from "./Pagination.scss";

export default function Pagination(props){

	console.warn("TODO: scroll the active page no. to the center of the pagination.");

	//HOOKS
	//---------------------------
	const [ offset, setOffset ]   = useState(0);
	const { wrapper: pageWrapper} = useContext(PageSwapper);
	useEffect(resetOffset, [ props.children.length ]);
	useEffect(scrollToTop, [ offset ]);


	//EFFECT HANDLING
	//---------------------------
	function resetOffset(){
		setOffset(0);
	}//resetOffset
	function scrollToTop(){
		pageWrapper.current.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}//scrollToTop	


	//EVENT HANDLING
	//--------------------------
	function updatePage(direction){
		setOffset(offset + direction);
	}//updatePage
	function setPage(index){
		setOffset(index);
	}//setPage


	//PRIVATE VARS
	//---------------------------
	const {
		maxItems = 10,   // (number) maximum no. of items per page
		HTMLTag  = "ol", // (string) which semantic tag should be used for the component wrapper
		children         // (array) of elements to paginate
	} = props;

	const startIndex   = offset * maxItems;
	const endIndex     = startIndex + maxItems;
	const items        = children.slice(startIndex, endIndex);
	const page         = offset + 1;
	const pages        = Math.ceil(children.length / maxItems);
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

	return (
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
}//Pagination