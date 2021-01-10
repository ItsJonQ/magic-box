import { Text } from "@wp-g2/components";
import React from "react";

export function PrefixText(props) {
	return (
		<Text
			css={{ pointerEvents: "none" }}
			size={10}
			variant="muted"
			isBlock
			lineHeight={1}
			{...props}
		/>
	);
}
