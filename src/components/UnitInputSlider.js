import React from "react";
import { Grid, UnitInput, Slider } from "@wp-g2/components";

export function UnitInputSlider({
	arrows = true,
	type,
	value,
	onChange,
	min,
	max,
	sliderMin,
	sliderMax,
	...props
}) {
	return (
		<Grid gap={2}>
			<UnitInput
				arrows={arrows}
				type={type}
				value={value}
				onChange={onChange}
				min={min}
				max={max}
				{...props}
			/>
			<Slider
				value={value}
				onChange={onChange}
				min={sliderMin || min}
				max={sliderMax || max}
				{...props}
			/>
		</Grid>
	);
}
