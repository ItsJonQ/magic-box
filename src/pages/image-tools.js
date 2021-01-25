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
import { AngleInput, ClientRender } from "components/index";

import Head from "next/head";
import _ from "lodash";

function PrefixLabel(props) {
	return <Text size={10} variant="muted" isBlock lineHeight="1" {...props} />;
}

function getBackgroundStyles({
	attachment,
	size,
	scale,
	position,
	image,
	repeat,
	file = "/images/potato.jpg",
}) {
	let styles = {
		backgroundAttachment: attachment,
		backgroundImage: `url(${file || image})`,
		backgroundRepeat: repeat,
		backgroundPosition: `calc(50% + ${position.x}px) calc(50% + ${position.y}px)`,
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
	attachment,
	repeat,
	file,
	onChange,
}) {
	const dropzoneRef = React.useRef();

	const isSizeCustom = size === "custom";

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
	const dragGestures = baseDragGestures();

	const backgroundStyles = getBackgroundStyles({
		image,
		attachment,
		position,
		size,
		file,
		file,
		scale,
		repeat,
	});

	const handleOnPositionChange = (next) => {
		onChange(next);
	};

	const handleOnChangeSize = (next) => {
		const nextState = { size: next };
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
					<View
						{...dragGestures}
						css={{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
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
							<Grid>
								<TextInput
									value={position.x}
									prefix={<PrefixLabel>X</PrefixLabel>}
									suffix={<PrefixLabel>PX</PrefixLabel>}
									type="number"
									gap={1}
									arrows={false}
									onChange={(next) => handleOnPositionChange({ x: next })}
								/>
								<TextInput
									value={position.y}
									prefix={<PrefixLabel>Y</PrefixLabel>}
									suffix={<PrefixLabel>PX</PrefixLabel>}
									type="number"
									gap={1}
									arrows={false}
									onChange={(next) => handleOnPositionChange({ y: next })}
								/>
							</Grid>
						</FormGroup>
						{isSizeCustom && (
							<FormGroup label="Scale">
								<Slider
									value={scale}
									onChange={handleOnChangeScale}
									step={0.01}
									min={0}
									max={3}
								/>
							</FormGroup>
						)}
						<FormGroup label="Repeat">
							<Select
								options={repeatOptions}
								value={repeat}
								onChange={handleOnChangeRepeat}
							/>
						</FormGroup>
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
