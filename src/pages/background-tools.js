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
	ColorPicker,
	Tooltip,
	Separator,
	HStack,
	Collapsible,
	CollapsibleTrigger,
	CollapsibleContent,
	Icon,
	VStack,
	ListGroup,
	ListGroupHeader,
	ListGroups,
	TextInput,
	Select,
	Spacer,
	Text,
	View,
} from "@wp-g2/components";
import { useDrag } from "react-use-gesture";
import { FiPlus, FiChevronDown } from "react-icons/fi";
import colorize from "tinycolor2";
import { v4 as uuid } from "uuid";

import Head from "next/head";
import _ from "lodash";

const BackgroundItem = ({ color = "transparent", onRemove, onClick }) => {
	const handleOnRemove = (event) => {
		event.stopPropagation();
		onRemove(event);
	};
	const isTransparent = colorize(color).getAlpha() === 0;
	const isOpaque = colorize(color).getAlpha() === 1;

	let label = isTransparent ? "transparent" : color;
	if (isOpaque) {
		label = colorize(color).toHexString();
	}

	return (
		<HStack spacing={3} onClick={onClick}>
			<ColorCircle color={color} />
			<Spacer>
				<Text>{label}</Text>
			</Spacer>
			<CloseButton size="xSmall" onClick={handleOnRemove} />
		</HStack>
	);
};

const ColorStop = ({
	color = "transparent",
	stop,
	onRemove,
	showRemove,
	onClick,
	id,
	onChangeStop,
}) => {
	const handleOnRemove = (event) => {
		event.stopPropagation();
		onRemove(event);
	};
	const isTransparent = colorize(color).getAlpha() === 0;
	const isOpaque = colorize(color).getAlpha() === 1;

	let label = isTransparent ? "transparent" : color;
	if (isOpaque) {
		label = colorize(color).toHexString();
	}

	return (
		<Grid alignment="center" templateColumns="24px 1fr 1fr 20px">
			<ColorCircle color={color} onClick={onClick} />
			<View>
				<Text>{label}</Text>
			</View>
			<View css={{ maxWidth: 60 }}>
				<TextInput
					value={stop}
					isCommitOnBlurOrEnter
					gap={0}
					onChange={onChangeStop}
					key={id}
					min={0}
					type="number"
					max={100}
					suffix={
						<Text size={10} variant="muted">
							%
						</Text>
					}
				/>
			</View>
			{showRemove && <CloseButton size="xSmall" onClick={handleOnRemove} />}
		</Grid>
	);
};

const GradientStop = ({
	index,
	stop,
	color,
	onDrag,
	onClick,
	setCurrentIndex,
}) => {
	const gestures = useDrag((dragProps) => {
		const parent = dragProps.event.target.parentElement;
		const { xy } = dragProps;
		const [x] = xy;
		const { x: px, width: pw } = parent.getBoundingClientRect();
		const dx = x - px;
		const mx = (dx / pw) * 100;
		const stop = Math.round(_.clamp(mx, 0, 100));
		onDrag(stop);
		setCurrentIndex(index);
	}, []);

	const handleOnClick = (event) => {
		event.stopPropagation();
		event.preventDefault();
		onClick();
	};

	const handleOnKeyDown = (event) => {
		const jump = event.shiftKey ? 10 : 1;
		switch (event.key) {
			case "ArrowLeft":
				event.preventDefault();
				onDrag(_.clamp(stop - jump, 0, 100));
				break;
			case "ArrowRight":
				event.preventDefault();
				onDrag(_.clamp(stop + jump, 0, 100));
				break;
		}
	};

	return (
		<View
			{...gestures()}
			onClick={handleOnClick}
			style={{
				left: `${stop}%`,
			}}
			css={{
				outline: "none",
				width: 16,
				cursor: "move",
				position: "absolute",
				padding: 4,
				left: 0,
				top: -2,
				transform: "translateX(-8px)",
				bottom: -2,
				zIndex: 1,
				"&:focus": {
					zIndex: 2,
				},
			}}
			onKeyDown={handleOnKeyDown}
			tabIndex={0}
		>
			<View
				css={{
					width: 8,
					background: color,
					borderRadius: 9999,
					pointerEvents: "none",
					border: "2px solid white",
					boxShadow: "0 0 4px 1px rgba(0,0,0,0.2)",
					position: "absolute",
					left: 4,
					top: -2,
					bottom: -2,
					zIndex: 1,
					"*:focus > &": {
						boxShadow: "0 0 4px 1px rgba(0,0,0,0.2), 0 0 0 2px rgba(0,0,0,0.4)",
					},
				}}
			/>
		</View>
	);
};

const GradientColorPicker = () => {
	const [colors, setColors] = React.useState([
		{ color: "red", stop: 20, id: uuid() },
		{ color: "blue", stop: 80, id: uuid() },
	]);
	const [currentIndex, setCurrentIndex] = React.useState(0);

	const currentColor = colors[currentIndex].color;
	const handleOnChange = (next) =>
		setColors((prev) => {
			const nextState = _.sortBy([...prev], "stop");
			nextState[currentIndex].color = next;
			return nextState;
		});

	const handleOnChangeColorStop = (index) => (next) =>
		setColors((prev) => {
			const nextState = [...prev];
			nextState[index].stop = next;
			return nextState;
		});

	const handleOnRemove = (id) => () =>
		setColors((prev) => {
			const nextState = prev.filter((c) => c.id !== id);
			return nextState;
		});

	const sortedColors = _.sortBy(colors, "stop");

	const gradientValues = sortedColors
		.map((color) => {
			return `${color.color} ${color.stop}%`;
		})
		.join(",");
	const linearGradient = `linear-gradient(90deg, ${gradientValues})`;

	const addStop = (event) => {
		const { pageX: px } = event;
		const { x, width: w } = event.target.getBoundingClientRect();
		const dx = px - x;
		const mx = (dx / w) * 100;
		const stop = Math.round(_.clamp(mx, 0, 100));

		const asc = colors.sort((a, b) => a.stop - b.stop);
		const desc = [...asc].reverse();

		const _prev = asc.find((i) => i.stop < stop);
		const _next = desc.find((i) => i.stop > stop);

		const prev = _prev || asc[0];
		const next = _next || desc[0];

		const color = colorize.mix(prev.color, next.color, stop).toHexString();
		const nextColor = {
			color,
			stop,
			id: uuid(),
		};
		setColors((prev) => [...prev, nextColor]);
	};

	return (
		<VStack>
			<Collapsible>
				<HStack>
					<Spacer>
						<View
							css={{
								height: 24,
								borderRadius: 4,
								position: "relative",
								cursor: "copy",
								userSelect: "none",
							}}
							style={{ background: linearGradient }}
							onClick={addStop}
						>
							{colors.map((color, index) => (
								<GradientStop
									key={index}
									index={index}
									setCurrentIndex={setCurrentIndex}
									{...color}
									onClick={() => setCurrentIndex(index)}
									onDrag={handleOnChangeColorStop(index)}
								/>
							))}
						</View>
					</Spacer>
					<Tooltip content="Show Gradient Stops">
						<span>
							<CollapsibleTrigger
								as={Button}
								icon={<FiChevronDown />}
								isSubtle
								isControl
								size="small"
							/>
						</span>
					</Tooltip>
				</HStack>
				<CollapsibleContent>
					<Spacer pt={5} m={0} />
					<VStack>
						<Grid alignment="center" templateColumns="24px 1fr 1fr 20px">
							<div />
							<Text variant="muted" weight={600}>
								Color
							</Text>
							<Text variant="muted" weight={600}>
								Stop
							</Text>
						</Grid>
						{sortedColors.map((color, index) => (
							<div key={index}>
								<ColorStop
									{...color}
									onClick={() => setCurrentIndex(index)}
									onChangeStop={handleOnChangeColorStop(index)}
									onRemove={handleOnRemove(color.id)}
									showRemove={colors.length > 1}
								/>
							</div>
						))}
					</VStack>
				</CollapsibleContent>
			</Collapsible>
			<View>
				<Separator />
			</View>
			<ColorPicker color={currentColor} onChange={handleOnChange} />
			<View>
				<Separator />
			</View>
			<View style={{ background: linearGradient, height: 250 }} />
		</VStack>
	);
};

export default function Home() {
	const [colorPickerState, setColorPickerState] = React.useState({
		backgrounds: [],
		mode: "solid ",
		color: null,
		show: false,
		target: "color",
	});

	const setColor = (next) =>
		setColorPickerState((prev) => ({ ...prev, color: next }));

	const setBackgrounds = (fn) =>
		setColorPickerState((prev) => ({
			...prev,
			backgrounds: fn(prev.backgrounds),
		}));

	const setMainColor = () => setColor(colorize.random().toHexString());
	const removeMainColor = () => setColor(null);

	const addBackground = () =>
		setBackgrounds((prev) => [
			...prev,
			{ color: colorize.random().toHexString(), id: uuid() },
		]);
	const removeBackground = (id) => () => {
		setBackgrounds((prev) => [...prev.filter((i) => i.id !== id)]);
	};

	const showColorPicker = (key, next) => () => {
		console.log(key);
		setColorPickerState((prev) => ({
			..._.set(prev, key, next),
			target: key,
			show: true,
		}));
	};
	const hideColorPicker = () => {
		setColorPickerState((prev) => ({ ...prev, show: false }));
	};

	const updateColor = (key) => (next) => {
		setColorPickerState((prev) => ({
			..._.set(prev, key, next),
			target: key,
		}));
	};

	const { color, backgrounds, show, target: _target } = colorPickerState;
	const target = _.get(colorPickerState, _target);

	return (
		<View>
			<ContextSystemProvider>
				<Head>
					<title>G2: Background Tools</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<View css={{ padding: "10vh 10vw" }}>
					<HStack alignment="top" spacing={5}>
						<GradientColorPicker />
						<Spacer />
						<Container width={280}>
							{show && (
								<Card elevation={5}>
									<CardHeader size="small">
										<HStack>
											<View css={{ marginLeft: -8 }}>
												<Select
													size="small"
													value={colorPickerState.mode}
													isSubtle
													isControl
													onChange={(next) =>
														setColorPickerState((prev) => ({
															...prev,
															mode: next,
														}))
													}
													options={[
														{ value: "solid", label: "Solid" },
														{ value: "gradient", label: "Gradient" },
														{ value: "image", label: "Image" },
													]}
												/>
											</View>
											<Spacer />
											<CloseButton size="xSmall" onClick={hideColorPicker} />
										</HStack>
									</CardHeader>
									<CardBody>
										<ColorPicker
											disableAlpha={false}
											color={target}
											onChange={updateColor(_target)}
										/>
									</CardBody>
								</Card>
							)}
						</Container>
						<Container width={280}>
							<ListGroups>
								<ListGroup>
									<ListGroupHeader>
										Color
										{!color && (
											<Button
												size="xSmall"
												isSubtle
												isControl
												icon={<FiPlus />}
												onClick={setMainColor}
											/>
										)}
									</ListGroupHeader>
									{color && (
										<BackgroundItem
											color={color}
											onRemove={removeMainColor}
											onClick={showColorPicker("color", color)}
										/>
									)}
								</ListGroup>
								<ListGroup>
									<ListGroupHeader>
										Fills
										<Button
											size="xSmall"
											isSubtle
											isControl
											icon={<FiPlus />}
											onClick={addBackground}
										/>
									</ListGroupHeader>
									{backgrounds.map((bg, index) => (
										<BackgroundItem
											{...bg}
											onClick={showColorPicker(
												`backgrounds[${index}].color`,
												bg.color
											)}
											onRemove={removeBackground(bg.id)}
											key={bg.id}
										/>
									))}
								</ListGroup>
							</ListGroups>
						</Container>
					</HStack>
				</View>
			</ContextSystemProvider>
		</View>
	);
}
