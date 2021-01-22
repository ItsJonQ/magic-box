import React, { useEffect, useRef, useState } from "react";
import { View } from "@wp-g2/components";
import { useControlledValue } from "@wp-g2/utils";
import { styled, ui, css } from "@wp-g2/styles";
import { useDrag } from "react-use-gesture";
import { noop } from "lodash";

export function AngleInput({
	value: valueProp,
	onChange: onChangeProp,
	...otherProps
}) {
	const [value, onChange] = useControlledValue({
		value: valueProp,
		onChange: onChangeProp,
	});

	const increment = (boost = 1) => {
		console.log(Math.min(value + boost, 360));
		onChange(Math.min(value + boost, 360));
	};
	const decrement = (boost = 1) => {
		onChange(Math.max(value - boost, 0));
	};

	const handleOnKeyDown = (event) => {
		const boost = event.shiftKey ? 10 : 1;

		switch (event.key) {
			case "ArrowUp":
				event.preventDefault();
				increment(boost);
				break;
			case "ArrowDown":
				event.preventDefault();
				decrement(boost);
				break;
			case "ArrowLeft":
				event.preventDefault();
				decrement(boost);
				break;
			case "ArrowRight":
				event.preventDefault();
				increment(boost);
				break;
		}
	};

	const angleCircleRef = useRef();
	const angleCircleCenter = useRef();
	const [isDragging, setDragging] = useState(false);

	const setAngleCircleCenter = () => {
		const rect = angleCircleRef.current.getBoundingClientRect();
		angleCircleCenter.current = {
			x: rect.x + rect.width / 2,
			y: rect.y + rect.height / 2,
		};
	};

	const gestures = useDrag((dragProps) => {
		setDragging(dragProps.dragging);

		const { event } = dragProps;
		const { x: centerX, y: centerY } = angleCircleCenter.current;
		const { ownerDocument } = angleCircleRef.current;
		// Prevent (drag) mouse events from selecting and accidentally
		// triggering actions from other elements.
		event.preventDefault();
		// Ensure the input isn't focused as preventDefault would leave it
		ownerDocument.activeElement.blur();
		onChange(getAngle(centerX, centerY, event.clientX, event.clientY));
	});

	useEffect(() => {
		setAngleCircleCenter();
	}, [isDragging]);

	useEffect(() => {
		const { ownerDocument } = angleCircleRef.current;
		if (isDragging) {
			ownerDocument.body.classList.add(globalGrabbing);
		} else {
			ownerDocument.body.classList.remove(globalGrabbing);
		}
	}, [isDragging]);

	return (
		<CircleRoot
			ref={angleCircleRef}
			className="components-angle-picker-control__angle-circle"
			aria-hidden="true"
			tabIndex={0}
			{...gestures()}
			{...otherProps}
			onClick={(e) => e.target.focus()}
			onKeyDown={handleOnKeyDown}
		>
			<CircleIndicatorWrapper
				style={value ? { transform: `rotate(${value}deg)` } : undefined}
				className="components-angle-picker-control__angle-circle-indicator-wrapper"
			>
				<CircleIndicator className="components-angle-picker-control__angle-circle-indicator" />
			</CircleIndicatorWrapper>
		</CircleRoot>
	);
}

function getAngle(centerX, centerY, pointX, pointY) {
	const y = pointY - centerY;
	const x = pointX - centerX;

	const angleInRadians = Math.atan2(y, x);
	const angleInDeg = Math.round(angleInRadians * (180 / Math.PI)) + 90;
	if (angleInDeg < 0) {
		return 360 + angleInDeg;
	}
	return angleInDeg;
}

export const CircleRoot = styled.div`
	border-radius: 50%;
	border: 1px solid ${ui.get("colorTextMuted")};
	box-sizing: border-box;
	cursor: grab;
	height: ${ui.get("controlHeight")};
	overflow: hidden;
	width: ${ui.get("controlHeight")};
	outline: none;

	&:focus {
		border-color: ${ui.color.admin};
		box-shadow: ${ui.get("controlBoxShadowFocus")};
	}
`;

export const CircleIndicatorWrapper = styled.div`
	box-sizing: border-box;
	position: relative;
	width: 100%;
	pointer-events: none;
	height: 100%;
`;

export const CircleIndicator = styled.div`
	background: ${ui.get("colorText")};
	border-radius: 50%;
	border: 3px solid ${ui.get("colorText")};
	bottom: 0;
	box-sizing: border-box;
	pointer-events: none;
	display: block;
	height: 1px;
	left: 0;
	margin: auto;
	position: absolute;
	right: 0;
	top: ${ui.flow.calc(ui.get("controlHeight"), " / 2 * -1")};
	width: 1px;

	*:focus > * > & {
		background: ${ui.color.admin};
		border-color: ${ui.color.admin};
	}
`;

const globalGrabbing = css`
	cursor: grabbing;
	* {
		cursor: grabbing;
	}
`;
