import { ContextSystemProvider } from "@components/index";
import {
	Animated,
	Button,
	Card,
	CardBody,
	Image,
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
	UnitInput,
	TextInput,
	Switch,
	Select,
	SegmentedControl,
	Spacer,
	Text,
	View,
} from "@wp-g2/components";
import { useDrag } from "react-use-gesture";
import { FiPlus, FiChevronDown, FiMenu } from "react-icons/fi";
import colorize from "tinycolor2";
import { v4 as uuid } from "uuid";
import {
	AngleInput,
	ClientRender,
	PivotControl,
	PrefixText,
} from "components/index";
import { styled } from "@wp-g2/styles";
import {
	interpolate,
	add,
	parseUnitValue,
	createUnitValue,
} from "@wp-g2/utils";
import {
	sortableContainer,
	sortableElement,
	sortableHandle,
} from "react-sortable-hoc";
import arrayMove from "array-move";

const DragHandle = sortableHandle(() => (
	<span>
		<Text
			variant="muted"
			isBlock
			css={{ cursor: "move", "&:active": { cursor: "move" } }}
		>
			<Icon size={12} icon={<FiMenu />} />
		</Text>
	</span>
));
const SortableItem = sortableElement(({ children }) => <div>{children}</div>);

const SortableContainer = sortableContainer(({ children }) => {
	return <div>{children}</div>;
});

import Head from "next/head";
import _ from "lodash";

const imageOptions = [
	{
		value: "potato",
		label: "Potato",
	},
	{
		value: "boba",
		label: "Boba",
	},
	{
		value: "sand",
		label: "Sand",
	},
	{
		value: "leaves",
		label: "Leaves",
	},
	{
		value: "egg",
		label: "Egg",
	},
];
const imageOptionsValues = imageOptions.map((o) => o.value);

const GridLine = styled.div`
	background: rgba(255, 255, 255, 0.6);
	box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.1);
	opacity: 0.4;
	position: absolute;
	pointer-events: none;
	z-index: 1;
`;

function getCompleteBackgroundStyles(backgrounds) {
	const styles = backgrounds.map(getBackgroundStyles);
	if (styles.length <= 1) return styles[0];

	const combinedStyles = styles.reduce((combined, current) => {
		const entries = Object.entries(current);
		entries.forEach(([k, v]) => {
			combined[k] = combined[k] ? [combined[k], v].join(",") : v;
		});
		return combined;
	}, {});

	return combinedStyles;
}

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
}) {
	const backgroundPosition = `calc(${px}% + ${x}px) calc(${py}% + ${y}px)`;
	const imageUrl = `/images/${image}.jpg`;

	const styles = {
		backgroundAttachment: attachment,
		backgroundImage: `url(${imageUrl})`,
		backgroundRepeat: repeat,
		backgroundPosition,
	};

	if (size === "custom") {
		styles.backgroundSize = `${scale * 100}%`;
	}

	if (size === "fill") {
		styles.backgroundSize = `cover`;
	}

	if (size === "fit") {
		styles.backgroundSize = `contain`;
	}

	return styles;
}

const repeatOptions = [
	{
		label: "None",
		value: "no-repeat",
	},
	{
		label: "Tiled",
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
		label: "Spaced Apart",
		value: "space",
	},
];

function ImageControls({
	image,
	scale,
	size,
	blockRef,
	showPreview = true,
	px,
	py,
	x,
	y,
	attachment,
	repeat,
	onChange,
	onCloseModal,
}) {
	const [showGrid, setGrid] = React.useState(true);
	const position = { x: px, y: py };
	const [previewSizeRatio, setPreviewSizeRatio] = React.useState(null);
	const [previewSize, setPreviewSize] = React.useState({ width: 0, height: 0 });
	const [imageSize, setImageSize] = React.useState({ width: 0, height: 0 });

	const isSizeCustom = size === "custom";
	const isSizeFill = size === "fill";

	const handleOnImageChange = (next) => {
		onChange({ image: next });
	};

	const currentBackground = { px, py };

	const baseDragGestures = useDrag((dragProps) => {
		if (!dragProps.dragging) return;

		const { target } = dragProps.event;
		const [x, y] = dragProps.delta;
		const { clientWidth, clientHeight } = target;

		const rt = clientWidth / imageSize.width;

		const cw = Math.round(imageSize.width * scale * rt);
		const ch = Math.round(imageSize.height * scale * rt);

		const qx = (x / clientWidth) * 100;
		const qy = (y / clientHeight) * 100;

		const tx = isSizeCustom ? (cw > clientWidth ? -1 : 1) : 1;
		const ty = isSizeCustom ? (ch > clientHeight ? -1 : 1) : 1;

		const nxpx = Math.round(add(px, qx * tx) * 1e2) / 1e2;
		const nxpy = Math.round(add(py, qy * ty) * 1e2) / 1e2;

		const next = {
			px: nxpx,
			py: nxpy,
		};

		onChange(next);
	});
	const dragGestures = baseDragGestures();

	const backgroundStyles = getBackgroundStyles({
		image,
		attachment,
		position,
		size,
		px,
		py,
		x,
		y,
		scale,
		repeat,
	});

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
	const pivotPosition = `${parseUnitValue(py)[0]} ${parseUnitValue(px)[0]}`;

	const updatePreviewSizeRatio = React.useCallback(() => {
		if (!blockRef.current) return;
		const { clientHeight, clientWidth } = blockRef.current;
		setPreviewSizeRatio((clientHeight / clientWidth) * 100);
		setPreviewSize({ width: clientWidth, height: clientHeight });
	}, []);

	React.useLayoutEffect(updatePreviewSizeRatio, []);
	React.useLayoutEffect(() => {
		const imageNode = document.createElement("img");
		imageNode.onload = () => {
			const { naturalWidth, naturalHeight } = imageNode;
			setImageSize({ width: naturalWidth, height: naturalHeight });
		};
		imageNode.src = `/images/${image}.jpg`;
	}, [image]);

	React.useEffect(() => {
		window.addEventListener("resize", updatePreviewSizeRatio);
		return () => {
			window.removeEventListener("resize", updatePreviewSizeRatio);
		};
	});

	return (
		<View>
			<Card>
				<CardHeader size="small">
					<Text weight={600}>Background Image</Text>
					<CloseButton
						size="small"
						css={{ marginRight: -4 }}
						onClick={onCloseModal}
					/>
				</CardHeader>
				{showPreview && (
					<>
						<View
							{...dragGestures}
							css={{
								width: "100%",
								height: 180,
								position: "relative",
								padding: 4,
								background: "#eee",
								position: "relative",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								overflow: "hidden",
								cursor: "grab",
								"&:active": {
									cursor: "grabbing",
								},
							}}
						>
							<View
								css={{
									position: "relative",
									height: 0,
									paddingBottom: `${previewSizeRatio}%`,
									width: "100%",
									overflow: "hidden",
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
									css={{
										background: "rgba(0,0,0,0.1)",
										position: "absolute",
										borderRadius: 4,
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
							</View>
						</View>
						<Divider />
					</>
				)}
				<CardBody>
					<ListGroup>
						<FormGroup label="Image">
							<Select
								options={imageOptions}
								onChange={handleOnImageChange}
								value={image}
							/>
						</FormGroup>
						<Divider />
						<FormGroup label="Grid">
							<Switch checked={showGrid} onChange={setGrid} />
						</FormGroup>
						<Divider />
						<FormGroup label="Fit">
							<SegmentedControl
								value={size}
								onChange={handleOnChangeSize}
								options={[
									{ label: "Filled", value: "fill" },
									{ label: "Fitted", value: "fit" },
									{ label: "Custom", value: "custom" },
								]}
							/>
						</FormGroup>
						<FormGroup label="Position">
							<VStack>
								<PivotControl
									value={pivotPosition}
									onChange={handleOnPivotChange}
								/>
								<Grid>
									<TextInput
										value={px}
										prefix={<PrefixText>X</PrefixText>}
										placeholder="--"
										suffix={<PrefixText>%</PrefixText>}
										type="number"
										gap={1}
										arrows={false}
										onChange={(next) => onChange({ px: next })}
									/>
									<TextInput
										value={py}
										prefix={<PrefixText>Y</PrefixText>}
										suffix={<PrefixText>%</PrefixText>}
										placeholder="--"
										type="number"
										gap={1}
										arrows={false}
										onChange={(next) => onChange({ py: next })}
									/>
								</Grid>
							</VStack>
						</FormGroup>

						{isSizeCustom && (
							<FormGroup label="Size">
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
										max={2}
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
										value: "scroll",
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

function createBackgroundData(props) {
	return {
		image: "potato",
		size: "fill",
		repeat: "no-repeat",
		px: 50,
		py: 50,
		x: 0,
		y: 0,
		scale: 1,
		attachment: "scroll",
		id: uuid(),
		...props,
	};
}

function BackgroundList({
	onAddBackground,
	backgrounds,
	currentBackgroundId,
	onRemoveBackground,
	onSetBackgrounds,
	showModal,
}) {
	const handleOnSortEnd = ({ oldIndex, newIndex }) => {
		onSetBackgrounds((prev) => arrayMove(prev, oldIndex, newIndex));
	};

	return (
		<Card>
			<CardHeader>
				<Text weight={600}>Images</Text>
				<Button
					icon={<FiPlus />}
					isSubtle
					isControl
					size="small"
					onClick={onAddBackground}
				/>
			</CardHeader>
			<CardBody>
				<SortableContainer onSortEnd={handleOnSortEnd} useDragHandle>
					{backgrounds.map((bg, index) => (
						<SortableItem key={bg.id} index={index}>
							<View
								key={bg.id}
								onClick={() => {
									showModal(bg.id);
								}}
								css={{
									cursor: "pointer",
									borderRadius: 4,
									background:
										currentBackgroundId === bg.id ? "rgba(0,0,0,0.08)" : null,
									padding: 4,
								}}
							>
								<HStack>
									<DragHandle />
									<View css={{ width: 24 }}>
										<Image
											src={`/images/${bg.image}.jpg`}
											aspectRatio={1 / 1}
											css={{ borderRadius: 4 }}
										/>
									</View>
									<Spacer>
										<Text variant="muted">{bg.image}.jpg</Text>
									</Spacer>
									<CloseButton
										size="xSmall"
										onClick={(e) => {
											e.stopPropagation();
											onRemoveBackground(bg.id);
										}}
									/>
								</HStack>
							</View>
						</SortableItem>
					))}
				</SortableContainer>
			</CardBody>
		</Card>
	);
}

export default function Home() {
	const [backgrounds, setBackgrounds] = React.useState([
		createBackgroundData({ image: "potato" }),
		createBackgroundData({ image: "sand" }),
	]);
	const [currentBackgroundId, setCurrentBackgroundId] = React.useState(
		backgrounds[0].id
	);
	const blockRef = React.useRef();

	const handleOnChange = (next) => {
		setBackgrounds((prev) => {
			return prev.map((bg) => {
				if (bg.id !== currentBackgroundId) return bg;
				return {
					...bg,
					...next,
				};
			});
		});
	};

	const handleOnCloseModal = () => setCurrentBackgroundId(null);
	const combinedStyles = getCompleteBackgroundStyles(backgrounds);
	const currentBackground =
		backgrounds.find((bg) => bg.id === currentBackgroundId) || {};

	const addBackground = () => {
		setBackgrounds((prev) => [
			createBackgroundData({ image: _.sample(imageOptionsValues) }),
			...prev,
		]);
	};

	const removeBackground = (id) => {
		handleOnCloseModal();
		setBackgrounds((prev) => prev.filter((bg) => bg.id !== id));
	};

	const dragGestures = useDrag((dragProps) => {
		if (!dragProps.dragging) return;
		const [x, y] = dragProps.delta;
		const { pageX, pageY, target } = dragProps.event;
		const { clientWidth, clientHeight } = target;
		const { px, py } = currentBackground;
		// const next = {
		// 	px: `${(pageX / clientWidth) * 100}%`,
		// 	py: `${(pageY / clientHeight) * 100}%`,
		// };

		const next = {
			px: add(px, (x / clientWidth) * 100),
			py: add(py, (y / clientHeight) * 100),
		};
		handleOnChange(next);
	});

	return (
		<View>
			<ContextSystemProvider>
				<Head>
					<title>G2: Background Tools</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<View
					css={{ padding: "2vh 2vw 0 0", position: "fixed", top: 0, right: 0 }}
				>
					<ClientRender>
						<View css={{ position: "relative" }}>
							<Container width={280} css={{ marginRight: 0, minWidth: 280 }}>
								<BackgroundList
									onSetBackgrounds={setBackgrounds}
									onAddBackground={addBackground}
									currentBackgroundId={currentBackgroundId}
									backgrounds={backgrounds}
									onRemoveBackground={removeBackground}
									showModal={setCurrentBackgroundId}
								/>
							</Container>
							<View
								css={{
									position: "absolute",
									right: "100%",
									marginRight: 12,
									top: 0,
								}}
							>
								<Container width={280} css={{ marginRight: 0, minWidth: 280 }}>
									{!!currentBackgroundId && (
										<ImageControls
											{...currentBackground}
											blockRef={blockRef}
											onChange={handleOnChange}
											onCloseModal={handleOnCloseModal}
										/>
									)}
								</Container>
							</View>
						</View>
					</ClientRender>
				</View>
			</ContextSystemProvider>
			<View
				ref={blockRef}
				style={{
					...combinedStyles,
					height: "90vh",
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
