import Head from "next/head";
import {
	Animated,
	FormGroup,
	Container,
	Grid,
	Card,
	CardBody,
	Button,
	Icon,
	ListGroup,
	ListGroupHeader,
	ListGroups,
	SegmentedControl,
	SelectDropdown,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownMenuItem,
	HStack,
	VStack,
	Slider,
	FlexBlock,
	UnitInput,
	TextInput,
	Separator,
	Spacer,
	Text,
	View,
	ContextSystemProvider,
} from "@wp-g2/components";
import {
	FiArrowUp,
	FiArrowDown,
	FiArrowLeft,
	FiArrowRight,
	FiMoreHorizontal,
	FiLayout,
	FiTrello,
	FiLoader,
	FiAperture,
	FiLayers,
	FiPlus,
	FiMinus,
} from "react-icons/fi";
import { createStore } from "@wp-g2/substate";
import { css, cx, ui } from "@wp-g2/styles";
import _ from "lodash";

const justifyContentOptions = [
	{
		label: "Start",
		value: "start",
	},
	{
		label: "Center",
		value: "center",
	},
	{
		label: "End",
		value: "end",
	},
];

const alignItemsOptions = [
	{
		label: "Start",
		value: "start",
	},
	{
		label: "Center",
		value: "center",
	},
	{
		label: "End",
		value: "end",
	},
];

const flexDirectionOptions = [
	{
		label: "Horizontal",
		value: "row",
	},
	{
		label: "Vertical",
		value: "column",
	},
];

function TextSliderInput({ type, value, onChange, ...props }) {
	return (
		<Grid gap={2}>
			<TextInput type={type} value={value} onChange={onChange} {...props} />
			<Slider value={value} onChange={onChange} {...props} />
		</Grid>
	);
}

function UnitSliderInput({ type, value, onChange, ...props }) {
	return (
		<Grid gap={2}>
			<UnitInput type={type} value={value} onChange={onChange} {...props} />
			<Slider value={value} onChange={onChange} {...props} />
		</Grid>
	);
}

const defaultStackAttributes = {
	display: "flex",
	alignItems: alignItemsOptions[1],
	justifyContent: justifyContentOptions[1],
	flexDirection: "row",
	gap: "10px",
};

const defaultPaddingAttributes = {
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
};

const defaultMarginAttributes = {
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
};

const appStore = createStore((set, get) => ({
	attributes: {
		height: "auto",
		width: "auto",
		overflow: null,
		margin: null,
		padding: null,
		stack: null,
	},
	setAttribute: (attribute) => (next) => {
		const nextAttributes = _.set(get().attributes, attribute, next);
		set({
			attributes: {
				...nextAttributes,
			},
		});
	},
}));

const useAppStore = appStore;

const flexAlignment = {
	start: "flex-start",
	center: "center",
	end: "flex-end",
	top: "flex-start",
	bottom: "flex-end",
};

const overflowOptions = [
	{
		value: "auto",
		label: "Auto",
	},
	{
		value: "hidden",
		label: "Hidden",
	},
];

const ViewBox = ({ children, ...props }) => {
	return <div {...props}>{children}</div>;
};

const MagicBox = (props) => {
	const { attributes } = useAppStore();
	const {
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
};

const AppIcon = ({ icon = <FiLayers />, color = "green" }) => {
	return (
		<View
			css={{
				borderRadius: 8,
				width: 30,
				height: 30,
				padding: 8,
				backgroundColor: ui.get(`color${_.upperFirst(color)}50`),
				color: ui.get(`color${_.upperFirst(color)}500`),
			}}
		>
			<Icon icon={icon} size={14} />
		</View>
	);
};

const PrefixText = (props) => (
	<Text size={10} variant="muted" isBlock lineHeight={1} {...props} />
);

const BoxControl = ({ label, value, ...otherProps }) => {
	const { attributes: _attributes, setAttribute } = useAppStore();
	const attributes = _attributes[value];

	return (
		<FormGroup label={label}>
			<Grid
				css={{
					columnGap: ui.space(2),
					rowGap: ui.space(1),
				}}
			>
				<UnitInput
					gap={1}
					value={attributes?.top}
					onChange={setAttribute(`${value}.top`)}
					cssProp={value}
					prefix={
						<PrefixText>
							<Icon icon={<FiArrowUp />} size={8} />
						</PrefixText>
					}
					{...otherProps}
				/>
				<UnitInput
					gap={1}
					value={attributes?.bottom}
					onChange={setAttribute(`${value}.bottom`)}
					cssProp={value}
					prefix={
						<PrefixText>
							<Icon icon={<FiArrowDown />} size={8} />
						</PrefixText>
					}
					{...otherProps}
				/>
				<UnitInput
					gap={1}
					cssProp={value}
					value={attributes?.left}
					onChange={setAttribute(`${value}.left`)}
					prefix={
						<PrefixText>
							<Icon icon={<FiArrowLeft />} size={8} />
						</PrefixText>
					}
					{...otherProps}
				/>
				<UnitInput
					gap={1}
					cssProp={value}
					value={attributes?.right}
					onChange={setAttribute(`${value}.right`)}
					prefix={
						<PrefixText>
							<Icon icon={<FiArrowRight />} size={8} />
						</PrefixText>
					}
					{...otherProps}
				/>
			</Grid>
		</FormGroup>
	);
};

export default function Home() {
	const { attributes, setAttribute } = useAppStore();

	const {
		margin,
		padding,
		opacity,
		overflow,
		width,
		stack,
		height,
	} = attributes;

	const hasStack = !!stack;

	const toggleSize = () => {
		setAttribute("height")("auto");
		setAttribute("width")("auto");
	};

	const toggleStack = () =>
		setAttribute("stack")(stack ? null : { ...{}, ...defaultStackAttributes });

	const togglePadding = () =>
		setAttribute("padding")(
			padding ? null : { ...{}, ...defaultPaddingAttributes }
		);
	const toggleMargin = () =>
		setAttribute("margin")(
			margin ? null : { ...{}, ...defaultMarginAttributes }
		);

	const toggleOverflow = () =>
		setAttribute("overflow")(overflow ? null : "auto");

	const toggleOpacity = () =>
		setAttribute("opacity")(!_.isNil(opacity) ? null : 100);

	const stackIcon = !hasStack ? <FiPlus /> : <FiMinus />;

	return (
		<View>
			<ContextSystemProvider value={{ FormGroup: { horizontal: true } }}>
				<Head>
					<title>G2</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Container>
					<Grid css={{ padding: 50 }}>
						<View>
							<MagicBox>
								<ViewBox>
									<div
										style={{ height: 50, background: ui.get("colorBlue50") }}
									>
										hello
									</div>
								</ViewBox>
								<ViewBox>
									<div
										style={{
											height: 100,
											width: 100,
											background: ui.get("colorRed50"),
										}}
									>
										hello
									</div>
								</ViewBox>
							</MagicBox>
						</View>
						<Container width={280}>
							<Card isBorderless elevation={5}>
								<CardBody>
									<VStack spacing={1}>
										<ListGroup>
											<HStack spacing={3}>
												<AppIcon icon={<FiLayers />} color="blue" />
												<Text weight={600}>Layout</Text>
												<FlexBlock />
												<Dropdown placement="bottom-end">
													{({ toggle }) => (
														<>
															<DropdownTrigger
																size="small"
																icon={<FiMoreHorizontal />}
																isSubtle
																isControl
															/>
															<DropdownMenu minWidth={80} maxWidth={160}>
																<DropdownMenuItem
																	onClick={() => {
																		toggleSize();
																		toggle();
																	}}
																>
																	Size
																</DropdownMenuItem>
																<DropdownMenuItem
																	isSelected={!!margin}
																	onClick={() => {
																		toggleMargin();
																		toggle();
																	}}
																>
																	Margin
																</DropdownMenuItem>
																<DropdownMenuItem
																	isSelected={!!padding}
																	onClick={() => {
																		togglePadding();
																		toggle();
																	}}
																>
																	Padding
																</DropdownMenuItem>
																<DropdownMenuItem
																	isSelected={!!overflow}
																	onClick={() => {
																		toggleOverflow();
																		toggle();
																	}}
																>
																	Overflow
																</DropdownMenuItem>
															</DropdownMenu>
														</>
													)}
												</Dropdown>
											</HStack>
											<FormGroup label="Size">
												<Grid align="center" gap={2}>
													<UnitInput
														prefix={<PrefixText>W</PrefixText>}
														gap={1.5}
														cssProp="width"
														value={width}
														min={0}
														onChange={setAttribute("width")}
													/>

													<UnitInput
														prefix={<PrefixText>H</PrefixText>}
														gap={1.5}
														value={height}
														cssProp="height"
														min={0}
														onChange={setAttribute("height")}
													/>
												</Grid>
											</FormGroup>

											{margin && <BoxControl label="Margin" value="margin" />}

											{padding && (
												<BoxControl label="Padding" value="padding" min={0} />
											)}

											{!_.isNil(overflow) && (
												<FormGroup label="Overflow">
													<SegmentedControl
														value={overflow}
														options={overflowOptions}
														onChange={setAttribute("overflow")}
													/>
												</FormGroup>
											)}
										</ListGroup>
										<View>
											<Separator css={{ opacity: 0.6 }} />
										</View>
										<ListGroup>
											<HStack spacing={3}>
												<AppIcon icon={<FiTrello />} color="yellow" />
												<Text weight={600}>Stack</Text>
												<FlexBlock />
												<Button
													size="small"
													icon={stackIcon}
													isSubtle
													isControl
													onClick={toggleStack}
												/>
											</HStack>
											{hasStack && (
												<>
													<FormGroup label="Direction">
														<SegmentedControl
															value={stack?.flexDirection}
															options={flexDirectionOptions}
															onChange={setAttribute("stack.flexDirection")}
														/>
													</FormGroup>
													<FormGroup label="Align">
														<SelectDropdown
															isPreviewable
															minWidth={160}
															onChange={(next) =>
																setAttribute("stack.alignItems")(
																	next.selectedItem
																)
															}
															value={stack?.alignItems}
															options={alignItemsOptions}
														/>
													</FormGroup>
													<FormGroup label="Distribution">
														<SelectDropdown
															minWidth={160}
															isPreviewable
															onChange={(next) =>
																setAttribute("stack.justifyContent")(
																	next.selectedItem
																)
															}
															value={stack?.justifyContent}
															options={justifyContentOptions}
														/>
													</FormGroup>
													<FormGroup label="Gap">
														<UnitSliderInput
															value={stack?.gap}
															min={0}
															onChange={setAttribute("stack.gap")}
														/>
													</FormGroup>
												</>
											)}
										</ListGroup>
										<View>
											<Separator css={{ opacity: 0.6 }} />
										</View>
										<ListGroup>
											<HStack spacing={3}>
												<AppIcon icon={<FiLoader />} color="green" />
												<Text weight={600}>Styles</Text>
												<FlexBlock />
												<Dropdown placement="bottom-end">
													<DropdownTrigger
														size="small"
														icon={<FiMoreHorizontal />}
														isSubtle
														isControl
													/>
													<DropdownMenu minWidth={120}>
														<DropdownMenuItem>Background</DropdownMenuItem>
														<DropdownMenuItem>Border</DropdownMenuItem>
													</DropdownMenu>
												</Dropdown>
											</HStack>
										</ListGroup>
										<View>
											<Separator css={{ opacity: 0.6 }} />
										</View>
										<ListGroup>
											<HStack spacing={3}>
												<AppIcon icon={<FiAperture />} color="indigo" />
												<Text weight={600}>Effects</Text>
												<FlexBlock />
												<Dropdown placement="bottom-end">
													{({ toggle }) => (
														<>
															<DropdownTrigger
																size="small"
																icon={<FiMoreHorizontal />}
																isSubtle
																isControl
															/>
															<DropdownMenu minWidth={120}>
																<DropdownMenuItem
																	isSelected={!_.isNil(opacity)}
																	onClick={() => {
																		toggleOpacity();
																		toggle();
																	}}
																>
																	Opacity
																</DropdownMenuItem>
																<DropdownMenuItem>Scale</DropdownMenuItem>
															</DropdownMenu>
														</>
													)}
												</Dropdown>
											</HStack>
											{!_.isNil(opacity) && (
												<FormGroup label="Opacity">
													<TextSliderInput
														type="number"
														min={0}
														max={100}
														value={opacity}
														suffix={<PrefixText>%</PrefixText>}
														onChange={setAttribute("opacity")}
													/>
												</FormGroup>
											)}
										</ListGroup>
										<View />
									</VStack>
								</CardBody>
							</Card>
						</Container>
					</Grid>
				</Container>
			</ContextSystemProvider>
		</View>
	);
}
