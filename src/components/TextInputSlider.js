import React from "react";
import { Grid, TextInput, Slider } from "@wp-g2/components";

export function TextInputSlider({ type, value, onChange, ...props }) {
	return (
		<Grid gap={2}>
			<TextInput type={type} value={value} onChange={onChange} {...props} />
			<Slider value={value} onChange={onChange} {...props} />
		</Grid>
	);
}
