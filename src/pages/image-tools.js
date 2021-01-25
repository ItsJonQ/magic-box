import { ContextSystemProvider } from "@components/index";
import {
	Animated,
	Button,
	Card,
	CardBody,
	CardHeader,
	CloseButton,
	ColorCircle,
	Container,
	AnimatedContainer,
	Grid,
	FormGroup,
	Divider,
	ColorPicker,
	MenuItem,
	Tooltip,
	Separator,
	HStack,
	Slider,
	Collapsible,
	CollapsibleTrigger,
	CollapsibleContent,
	Icon,
	VStack,
	ListGroup,
	Scrollable,
	SelectDropdown,
	ListGroupHeader,
	ListGroups,
	TextInput,
	Switch,
	Select,
	SegmentedControl,
	Spacer,
	Text,
	View,
} from "@wp-g2/components";
import { useDrag } from "react-use-gesture";
import { FiPlus, FiChevronDown } from "react-icons/fi";
import colorize from "tinycolor2";
import { v4 as uuid } from "uuid";
import {
	AngleInput,
	ClientRender,
	PivotControl,
	PrefixText,
} from "components/index";
import { styled } from "@wp-g2/styles";
import { interpolate } from "@wp-g2/utils";

import Head from "next/head";
import _ from "lodash";

const GridLine = styled.div`
	background: rgba(255, 255, 255, 0.6);
	box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.1);
	opacity: 0.4;
	position: absolute;
	pointer-events: none;
	z-index: 1;
`;

function getBackgroundStyles({
	attachment,
	size,
	scale,
	px,
	py,
	x,
	y,
	image,
	repeat,
	file = "/images/potato.jpg",
}) {
	const backgroundPosition = `calc(${px}% + ${x}px) calc(${py}% + ${y}px)`;

	let styles = {
		backgroundAttachment: attachment,
		backgroundImage: `url(${file || image})`,
		backgroundRepeat: repeat,
		backgroundPosition,
	};

	if (size === "custom") {
		styles = {
			...styles,
			backgroundSize: `${scale * 100}%`,
		};
	}

	if (size === "fill") {
		styles = {
			...styles,
			backgroundSize: "cover",
		};
	}

	if (size === "fit") {
		styles = {
			...styles,
			backgroundSize: "contain",
		};
	}

	return styles;
}

const repeatOptions = [
	{
		label: "None",
		value: "no-repeat",
	},
	{
		label: "Repeat",
		value: "repeat",
	},
	{
		label: "Horizontally",
		value: "repeat-x",
	},
	{
		label: "Vertically",
		value: "repeat-y",
	},
	{
		label: "Space",
		value: "space",
	},
];

function ImageControls({
	image,
	position,
	scale,
	size,
	px,
	py,
	x,
	y,
	attachment,
	repeat,
	file,
	onChange,
}) {
	const [showGrid, setGrid] = React.useState(true);
	const dropzoneRef = React.useRef();

	const isSizeCustom = size === "custom";
	const isSizeFill = size === "fill";

	const handleOnUpload = () => {
		const file = dropzoneRef.current.files[0];
		const reader = new FileReader();
		reader.onloadend = function () {
			onChange({ file: reader.result });
		};
		if (file) {
			reader.readAsDataURL(file);
		}
	};

	const baseDragGestures = useDrag((dragProps) => {
		if (!dragProps.dragging) return;

		const [x, y] = dragProps.offset;
		handleOnPositionChange({
			x: Math.round(x),
			y: Math.round(y),
		});
	});
	const dragGestures = isSizeCustom ? baseDragGestures() : {};

	const backgroundStyles = getBackgroundStyles({
		image,
		attachment,
		position,
		size,
		file,
		file,
		x,
		y,
		px,
		py,
		scale,
		repeat,
	});

	const handleOnPositionChange = (next) => {
		onChange(next);
	};

	const handleOnPivotChange = (next) => {
		onChange({ px: next.x, py: next.y });
	};

	const handleOnChangeSize = (next) => {
		const nextState = { size: next };
		if (next !== "custom") {
			nextState.x = 0;
			nextState.y = 0;
		}
		onChange(nextState);
	};

	const handleOnChangeScale = (next) => {
		onChange({ scale: next });
	};

	const handleOnChangeRepeat = (next) => {
		onChange({ repeat: next });
	};

	const handleOnChangeAttachment = (next) => {
		onChange({ attachment: next });
	};
	const pivotPosition = `${py} ${px}`;

	return (
		<View>
			<Card>
				<CardBody
					css={{
						width: 280,
						height: 200,
						position: "relative",
					}}
				>
					{showGrid && (
						<>
							<GridLine
								css={{ top: 0, left: "33%", height: "100%", width: 1 }}
							/>
							<GridLine
								css={{ top: 0, left: "66%", height: "100%", width: 1 }}
							/>
							<GridLine
								css={{ left: 0, top: "33%", width: "100%", height: 1 }}
							/>
							<GridLine
								css={{ left: 0, top: "66%", width: "100%", height: 1 }}
							/>
						</>
					)}

					<View
						{...dragGestures}
						css={{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							cursor: "grab",
							"&:active": {
								cursor: "grabbing",
							},
						}}
					/>
					<View
						style={{
							...backgroundStyles,
							backgroundAttachment: null,
							pointerEvents: "none",
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
						}}
					/>
				</CardBody>
				<Divider />
				<CardBody>
					<ListGroup>
						<FormGroup label="Image">
							<input type="file" onChange={handleOnUpload} ref={dropzoneRef} />
						</FormGroup>
						<Divider />
						<FormGroup label="Grid">
							<Switch checked={showGrid} onChange={setGrid} />
						</FormGroup>
						<Divider />
						<FormGroup label="Size">
							<SegmentedControl
								value={size}
								onChange={handleOnChangeSize}
								options={[
									{ label: "Fill", value: "fill" },
									{ label: "Fit", value: "fit" },
									{ label: "Custom", value: "custom" },
								]}
							/>
						</FormGroup>
						<FormGroup label="Position">
							<PivotControl
								value={pivotPosition}
								onChange={handleOnPivotChange}
							/>
						</FormGroup>
						{isSizeCustom && (
							<FormGroup label="Offset">
								<Grid>
									<TextInput
										value={x}
										prefix={<PrefixText>X</PrefixText>}
										placeholder="--"
										suffix={<PrefixText>PX</PrefixText>}
										type="number"
										gap={1}
										arrows={false}
										onChange={(next) => handleOnPositionChange({ x: next })}
									/>
									<TextInput
										value={y}
										prefix={<PrefixText>Y</PrefixText>}
										suffix={<PrefixText>PX</PrefixText>}
										placeholder="--"
										type="number"
										gap={1}
										arrows={false}
										onChange={(next) => handleOnPositionChange({ y: next })}
									/>
								</Grid>
							</FormGroup>
						)}
						{isSizeCustom && (
							<FormGroup label="Scale">
								<Grid>
									<TextInput
										step={1}
										min={1}
										suffix={<PrefixText>%</PrefixText>}
										type="number"
										value={Math.round(
											interpolate(scale, [0.01, 10], [1, 1000])
										)}
										onChange={(next) =>
											handleOnChangeScale(
												interpolate(next, [1, 1000], [0.01, 10])
											)
										}
									/>
									<Slider
										value={scale}
										onChange={handleOnChangeScale}
										step={0.01}
										min={0.01}
										max={3}
									/>
								</Grid>
							</FormGroup>
						)}
						<Divider />
						{!isSizeFill && (
							<FormGroup label="Repeat">
								<Select
									options={repeatOptions}
									value={repeat}
									onChange={handleOnChangeRepeat}
								/>
							</FormGroup>
						)}
						<FormGroup label="Fixed">
							<SegmentedControl
								value={attachment}
								onChange={handleOnChangeAttachment}
								options={[
									{
										label: "Fixed",
										value: "fixed",
									},
									{
										label: "None",
										value: "initial",
									},
								]}
							/>
						</FormGroup>
					</ListGroup>
				</CardBody>
			</Card>
		</View>
	);
}

export default function Home() {
	const [background, setBackground] = React.useState({
		image: "/images/potato.jpg",
		size: "fill",
		repeat: "no-repeat",
		x: 0,
		y: 0,
		px: 50,
		py: 50,
		scale: 1,
		attachment: "initial",
	});

	const position = { x: background.x, y: background.y };

	const handleOnChange = (next) =>
		setBackground((prev) => ({ ...prev, ...next }));

	const backgroundStyles = getBackgroundStyles({
		...background,
		position,
	});

	return (
		<View>
			<ContextSystemProvider>
				<Head>
					<title>G2: Background Tools</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<View
					css={{ padding: "10vh 10vw", position: "fixed", top: 0, right: 0 }}
				>
					<Container width={280} css={{ marginRight: 0 }}>
						<ClientRender>
							<ImageControls
								{...background}
								position={position}
								onChange={handleOnChange}
							/>
						</ClientRender>
					</Container>
				</View>
			</ContextSystemProvider>
			<View
				style={{
					...backgroundStyles,
					height: "100vh",
				}}
			/>
			<View
				style={{
					height: "300vh",
				}}
			/>
		</View>
	);
}
