import React from "react";
import s from "./DiscountSticker.scss";

export default function DiscountSticker(props){
	const {
		HTMLTag = "aside",
		className = "",
		discount,
		...remainingProps
	} = props;

	return(
		<HTMLTag
			className={`${s.wrapper} ${className}`}
			{...remainingProps}>
			<span>{discount}%</span> off
		</HTMLTag>
	);
}//DiscountSticker