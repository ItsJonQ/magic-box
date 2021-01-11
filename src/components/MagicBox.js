import { flexAlignment, useAppStore } from "@lib/appStore";

import React from "react";
import _ from "lodash";
import { ui } from "@wp-g2/styles";

export function MagicBox(props) {
	const { attributes } = useAppStore();
	const {
		blur,
		font,
		height,
		letterSpacing,
		lineHeight,
		margin,
		opacity,
		overflow,
		padding,
		width,
		stack,
		textAlign,
		textDecoration,
	} = attributes;

	const style = {
		"--mb--fx-blr": blur,
		"--mb--d": stack?.display,
		"--mb--flx-ai": flexAlignment[stack?.alignItems?.value],
		"--mb--flx-d": stack?.flexDirection,
		"--mb--flx-jc": flexAlignment[stack?.justifyContent?.value],
		"--mb--flx-sp": ui.value.px(stack?.gap),
		"--mb--ftf": font?.family,
		"--mb--fts": font?.size,
		"--mb--ftw": font?.weight?.value,
		"--mb--h": height,
		"--mb--lh": lineHeight,
		"--mb--ls": letterSpacing,
		"--mb--mb": margin?.bottom,
		"--mb--ml": margin?.left,
		"--mb--mr": margin?.right,
		"--mb--mt": margin?.top,
		"--mb--op": _.isNil(opacity) ? null : opacity / 100,
		"--mb--ov": overflow,
		"--mb--pb": padding?.bottom,
		"--mb--pl": padding?.left,
		"--mb--pr": padding?.right,
		"--mb--pt": padding?.top,
		"--mb--txa": textAlign,
		"--mb--txd": textDecoration,
		"--mb--w": width,
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
