import React, { useState } from "react";

export default function Pagination(props){

	//HOOKS
	//---------------------------
	const [ offset, setOffset ] = useState(0);


	//EVENT HANDLING
	//--------------------------
	function updatePage(direction){
		setOffset(offset + direction);
	}//updatePage


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

	return (
		<HTMLTag>
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
					<button 
						onClick={nextPage}
						disabled={page == pages}>
						Next
					</button>
				</nav>
			</header>
			{items}
		</HTMLTag>
	);
}//Pagination