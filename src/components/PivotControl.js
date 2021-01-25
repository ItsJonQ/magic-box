import {
	BaseField,
	Container,
	Grid,
	HStack,
	View,
	Text,
} from "@wp-g2/components";
import { useControlledValue } from "@wp-g2/utils";
import { ui } from "@wp-g2/styles";
import Head from "next/head";
import _ from "lodash";
import { useDrag } from "react-use-gesture";

const isWithinBounds = ({ bounds = {}, x, y }) => {
	return (
		x >= bounds.left &&
		x <= bounds.right &&
		y >= bounds.top &&
		y <= bounds.bottom
	);
};

const positionLabel = [
	"Top Left",
	"Top Center",
	"Top Right",
	"Left",
	"Center",
	"Right",
	"Bottom Left",
	"Bottom Center",
	"Bottom Right",
];

const Line = ({ css = {} }) => {
	return (
		<View
			css={{
				...css,
				pointerEvents: "none",
				background: "rgba(0,0,0,0.04)",
				position: "absolute",
				transform: "translate(-0.5px,-0.5px)",
			}}
		/>
	);
};

const PivotDot = ({ css = {}, isSelected, ...props }) => {
	return (
		<View
			{...props}
			css={{
				width: 6,
				height: 6,
				cursor: "pointer",
				transform: "translate(-50%, -50%)",
				borderRadius: "50%",
				background: isSelected ? ui.color.admin : "white",
				boxShadow: isSelected
					? `0 0 0 1px ${ui.color.admin}`
					: "0 0 0 1px rgba(0, 0, 0, 0.2)",
				position: "absolute",
				zIndex: isSelected ? 1 : 0,
				transition: isSelected ? "all 100ms linear" : null,
				...css,
			}}
		/>
	);
};

const getPivotCoords = (position) => {
	switch (position) {
		case 0:
			return { top: 0, left: 0 };
		case 1:
			return { top: 0, left: "50%" };
		case 2:
			return { top: 0, left: "100%" };
		case 3:
			return { top: "50%", left: 0 };
		case 4:
			return { top: "50%", left: "50%" };
		case 5:
			return { top: "50%", left: "100%" };
		case 6:
			return { top: "100%", left: 0 };
		case 7:
			return { top: "100%", left: "50%" };
		case 8:
			return { top: "100%", left: "100%" };
	}
};

const positions = {
	"top left": 0,
	"top center": 1,
	"top right": 2,
	"center left": 3,
	center: 4,
	"center center": 4,
	"center right": 5,
	"bottom left": 6,
	"bottom center": 7,
	"bottom right": 8,
};
const positionIndices = _.invert(positions);

const getPositionIndex = (position) => {
	return positions[position];
};

export function PivotControl({ onChange: onChangeProp, value: valueProp }) {
	const [value, onChange] = useControlledValue({
		onChange: onChangeProp,
		value: valueProp,
	});
	const position = getPositionIndex(value);
	const label = positionLabel[position] || "Custom";
	const isCustom = typeof position !== "number";

	const handleOnChange = (next) => {
		const [y, x] = next.split(" ");
		onChange({ x, y });
	};

	const dragGestures = useDrag(
		(dragProps) => {
			if (!dragProps.dragging) return;

			const node = dragProps.event.target;

			const { clientWidth, clientHeight } = node;
			const w = Math.round(clientWidth / 3);
			const h = Math.round(clientHeight / 3);
			const bounds = node.getBoundingClientRect();

			const [x, y] = dragProps.xy;
			const coords = [
				new DOMRect(bounds.x, bounds.y, w / 2, h),
				new DOMRect(bounds.x + w, bounds.y, w, h),
				new DOMRect(bounds.x + w * 2.5, bounds.y, w / 2, h),

				new DOMRect(bounds.x, bounds.y + h, w / 2, h),
				new DOMRect(bounds.x + w, bounds.y + h, w, h),
				new DOMRect(bounds.x + w * 2.5, bounds.y + h, w / 2, h),

				new DOMRect(bounds.x, bounds.y + h * 2, w / 2, h),
				new DOMRect(bounds.x + w, bounds.y + h * 2, w, h),
				new DOMRect(bounds.x + w * 2.5, bounds.y + h * 2, w / 2, h),
			];
			const regions = coords.map((c) => isWithinBounds({ bounds: c, x, y }));
			const nextPosition = regions.indexOf(true);

			if (nextPosition >= 0) {
				handleOnChange(positionIndices[nextPosition]);
			}
		},
		{ threshold: 5 }
	);

	const handleOnPivotClick = (next) => (event) => {
		handleOnChange(positionIndices[next]);
	};

	return (
		<Grid alignment="center">
			<BaseField css={{ padding: 0 }}>
				<View
					{...dragGestures()}
					css={{
						height: ui.get("controlHeight"),
						width: "100%",
						position: "relative",
						cursor: "grab",
						"&:active": {
							cursor: "grabbing",
						},
					}}
				>
					<Line
						css={{
							top: 0,
							left: "50%",
							height: "100%",
							width: 1,
						}}
					/>
					<Line
						css={{
							top: "50%",
							left: 0,
							width: "100%",
							height: 1,
						}}
					/>
					{!isCustom && <PivotDot isSelected css={getPivotCoords(position)} />}
					<PivotDot css={{ top: 0, left: 0 }} onClick={handleOnPivotClick(0)} />
					<PivotDot
						css={{ top: 0, left: "50%" }}
						onClick={handleOnPivotClick(1)}
					/>
					<PivotDot
						css={{ top: 0, left: "100%" }}
						onClick={handleOnPivotClick(2)}
					/>
					<PivotDot
						css={{ top: "50%", left: 0 }}
						onClick={handleOnPivotClick(3)}
					/>
					<PivotDot
						css={{ top: "50%", left: "50%" }}
						onClick={handleOnPivotClick(4)}
					/>
					<PivotDot
						css={{ top: "50%", left: "100%" }}
						onClick={handleOnPivotClick(5)}
					/>
					<PivotDot
						css={{ top: "100%", left: 0 }}
						onClick={handleOnPivotClick(6)}
					/>
					<PivotDot
						css={{ top: "100%", left: "50%" }}
						onClick={handleOnPivotClick(7)}
					/>
					<PivotDot
						css={{ top: "100%", left: "100%" }}
						onClick={handleOnPivotClick(8)}
					/>
				</View>
			</BaseField>
			<View>
				<Text variant="muted" size={11} isBlock align="center">
					{label}
				</Text>
			</View>
		</Grid>
	);
}
