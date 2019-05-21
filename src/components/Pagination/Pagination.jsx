import React, { useState, useEffect } from "react";

export default function Pagination(props){

	//HOOKS
	//---------------------------
	const [ offset, setOffset ] = useState(0);
	useEffect(resetOffset, [ props.children.length ]);


	//EFFECT HANDLING
	//---------------------------
	function resetOffset(){
		setOffset(0);
	}//resetOffset


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
		maxItems = 25,   // (number) maximum no. of items per page
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
		<HTMLTag>
			{items}
			<header>
				<p>
					Page {page} of {pages}
				</p>
				<nav>
					<button 
						onClick={previousPage}
						disabled={page == 1}>
						Previous
					</button>
					{renderNumberedButtons()}
					<button 
						onClick={nextPage}
						disabled={page == pages}>
						Next
					</button>
				</nav>
			</header>
		</HTMLTag>
	);
}//Pagination