import React from "react";
import { ui } from "@wp-g2/styles";
import _ from "lodash";
import { useAppStore, flexAlignment } from "@lib/appStore";

export function MagicBox(props) {
	const { attributes } = useAppStore();
	const {
		blur,
		opacity,
		height,
		margin,
		width,
		padding,
		overflow,
		stack,
	} = attributes;

	const style = {
		"--mb--ai": flexAlignment[stack?.alignItems?.value],
		"--mb--blr": blur,
		"--mb--d": stack?.display,
		"--mb--fxd": stack?.flexDirection,
		"--mb--h": height,
		"--mb--jc": flexAlignment[stack?.justifyContent?.value],
		"--mb--mt": margin?.top,
		"--mb--mb": margin?.bottom,
		"--mb--ml": margin?.left,
		"--mb--mr": margin?.right,
		"--mb--pt": padding?.top,
		"--mb--pb": padding?.bottom,
		"--mb--pl": padding?.left,
		"--mb--pr": padding?.right,
		"--mb--op": _.isNil(opacity) ? null : opacity / 100,
		"--mb--ov": overflow,
		"--mb--w": width,
		"--mb-ms--sp": ui.value.px(stack?.gap),
		outline: "2px solid rgba(0, 0, 255, 0.1)",
	};

	const isColumn = stack?.flexDirection === "column";

	return (
		<div
			{...props}
			data-magic-box
			data-magic-stack={isColumn ? "column" : "row"}
			style={style}
		/>
	);
}
