import React from "react";
import s from "./RebuyMeter.scss";

export default function RebuyMeter(props){

	const {
		HTMLTag   = "aside", // (string) semantic tag to apply to component wrapper
		className = "",      // (string) additional CSS classes to apply to component wrapper
		percentage,          // (number)[0-100] percentage of users who would buy the wine again
		...remainingProps    // any additional attributes to append to the component wrapper
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