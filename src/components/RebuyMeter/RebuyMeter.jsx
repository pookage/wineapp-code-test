import React from "react";
import s from "./RebuyMeter.scss";

console.warn("TODO: Style the rebuy meter as a meter instead of just a ring");

export default function RebuyMeter(props){

	const {
		HTMLTag = "aside",
		className = "",
		percentage,
		...remainingProps
	} = props;

	return(
		<HTMLTag 
			className={`${s.wrapper} ${className}`}
			{...remainingProps}>
			<span className={s.percentage}>{percentage}%</span>
			<span className={s.label}>would rebuy</span>
		</HTMLTag>
	);
}//RebuyMeter