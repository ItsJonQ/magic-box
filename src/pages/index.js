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
		label: "Top",
		value: "top",
	},
	{
		label: "Center",
		value: "center",
	},
	{
		label: "Bottom",
		value: "bottom",
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
		<Grid>
			<TextInput type={type} value={value} onChange={onChange} {...props} />
			<Slider value={value} onChange={onChange} {...props} />
		</Grid>
	);
}

const defaultStackAttributes = {
	display: "flex",
	alignItems: alignItemsOptions[1],
	justifyContent: justifyContentOptions[1],
	flexDirection: "row",
	gap: 10,
};

const appStore = createStore((set, get) => ({
	attributes: {
		height: "auto",
		width: "auto",
		overflow: null,
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
	const { height, width, padding, overflow, stack } = attributes;

	const style = {
		"--mb--ai": flexAlignment[stack?.alignItems?.value],
		"--mb--d": stack?.display,
		"--mb--fxd": stack?.flexDirection,
		"--mb--h": height,
		"--mb--jc": flexAlignment[stack?.justifyContent?.value],
		"--mb--p": ui.value.px(padding),
		"--mb--ov": overflow,
		"--mb--w": width,
		"--mb-ms--sp": ui.value.px(stack?.gap),
		outline: "2px solid rgba(0, 0, 255, 0.1)",
	};

	return <div {...props} data-magic-box data-magic-stack style={style} />;
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

export default function Home() {
	const { attributes, setAttribute } = useAppStore();

	const { padding, overflow, width, stack, height } = attributes;

	const hasStack = !!stack;

	const toggleStack = () =>
		setAttribute("stack")(stack ? null : defaultStackAttributes);
	const togglePadding = () => setAttribute("padding")(padding ? null : 0);
	const toggleOverflow = () =>
		setAttribute("overflow")(overflow ? null : "auto");
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
						<MagicBox>
							<ViewBox>
								<div style={{ height: 50, background: ui.get("colorBlue50") }}>
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
													<DropdownTrigger
														size="small"
														icon={<FiPlus />}
														isSubtle
														isControl
													/>
													<DropdownMenu minWidth={80} maxWidth={160}>
														<DropdownMenuItem>Margin</DropdownMenuItem>
														<DropdownMenuItem onClick={togglePadding}>
															Padding
														</DropdownMenuItem>
														<DropdownMenuItem onClick={toggleOverflow}>
															Overflow
														</DropdownMenuItem>
													</DropdownMenu>
												</Dropdown>
											</HStack>
											<FormGroup label="Width">
												<UnitInput
													arrows
													cssProp="width"
													value={width}
													min={0}
													onChange={setAttribute("width")}
												/>
											</FormGroup>
											<FormGroup label="Height">
												<UnitInput
													arrows
													value={height}
													cssProp="height"
													min={0}
													onChange={setAttribute("height")}
												/>
											</FormGroup>
											{!_.isNil(padding) && (
												<FormGroup label="Padding">
													<TextSliderInput
														type="number"
														value={padding}
														min={0}
														onChange={setAttribute("padding")}
													/>
												</FormGroup>
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
														<TextSliderInput
															type="number"
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
														icon={<FiPlus />}
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
													<DropdownTrigger
														size="small"
														icon={<FiPlus />}
														isSubtle
														isControl
													/>
													<DropdownMenu minWidth={120}>
														<DropdownMenuItem>Opacity</DropdownMenuItem>
														<DropdownMenuItem>Scale</DropdownMenuItem>
													</DropdownMenu>
												</Dropdown>
											</HStack>
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
