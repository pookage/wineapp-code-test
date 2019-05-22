import React from "react";

export default function Price(props){

	const {
		HTMLTag = "p",    // (string) the semantic HTML tag to apply to the component wrapper
		currency,         // (string) the currency to display the price in ("eg. GBP")
		children: number, // (number) the value to convert to the target currency
		...remainingProps // ...any remaining attributes to apply to the component wrapper
	} = props;

	if(number.length > 0) console.warn("WARNING: The <Price> component should only be given a number as a child.");

	const currencySystem = new Intl.NumberFormat(window.navigator.language, { style: "currency", currency });
	const value          = currencySystem.format(number);

	return(
		<HTMLTag 
			{...remainingProps}>
			{value}
		</HTMLTag>
	);



}//Price