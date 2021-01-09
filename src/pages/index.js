import Head from "next/head";
import {
	Animated,
	FormGroup,
	Container,
	Grid,
	Card,
	CardBody,
	ListGroup,
	ListGroupHeader,
	ListGroups,
	SegmentedControl,
	SelectDropdown,
	VStack,
	Slider,
	UnitInput,
	TextInput,
	Text,
	View,
	ContextSystemProvider,
} from "@wp-g2/components";
import { CgAlignTop, CgAlignMiddle, CgAlignBottom } from "react-icons/cg";
import { createStore } from "@wp-g2/substate";
import { css, cx, ui } from "@wp-g2/styles";

const distributionOptions = [
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

const alignOptions = [
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

function TextSliderInput({ type, value, onChange, ...props }) {
	return (
		<Grid>
			<TextInput type={type} value={value} onChange={onChange} {...props} />
			<Slider value={value} onChange={onChange} {...props} />
		</Grid>
	);
}

const appStore = createStore((set) => ({
	stackGap: 10,
	height: "auto",
	width: "auto",
	overflow: "auto",
	align: alignOptions[1],
	distribution: distributionOptions[1],
	setAttribute: (attribute) => (next) => set({ [attribute]: next }),
	padding: 0,
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
	const {
		align,
		distribution,
		height,
		width,
		padding,
		overflow,
		stackGap,
	} = useAppStore();

	const style = {
		"--mb--ai": flexAlignment[align.value],
		"--mb--d": "flex",
		"--mb--d": "flex",
		"--mb--h": height,
		"--mb--jc": flexAlignment[distribution.value],
		"--mb--p": padding,
		"--mb--ov": overflow,
		"--mb--w": width,
		"--mb-ms--sp": ui.value.px(stackGap),
		outline: "2px solid rgba(0, 0, 255, 0.1)",
	};

	return <div {...props} data-magic-box data-magic-stack style={style} />;
};

export default function Home() {
	const {
		align,
		distribution,
		padding,
		overflow,
		stackGap,
		width,
		height,
		setAttribute,
	} = useAppStore();

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
									<ListGroups>
										<ListGroup>
											<ListGroupHeader>Layout</ListGroupHeader>
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
											<FormGroup label="Padding">
												<TextSliderInput
													type="number"
													value={padding}
													min={0}
													onChange={setAttribute("padding")}
												/>
											</FormGroup>
											<FormGroup label="Overflow">
												<SegmentedControl
													value={overflow}
													options={overflowOptions}
													onChange={setAttribute("overflow")}
												/>
											</FormGroup>
										</ListGroup>
										<ListGroup>
											<ContextSystemProvider
												value={{ MenuItem: { isOffset: false } }}
											>
												<ListGroupHeader>Stack</ListGroupHeader>
												<FormGroup label="Align">
													<SelectDropdown
														isPreviewable
														minWidth={160}
														onChange={(next) =>
															setAttribute("align")(next.selectedItem)
														}
														value={align}
														options={alignOptions}
													/>
												</FormGroup>
												<FormGroup label="Distribution">
													<SelectDropdown
														minWidth={160}
														isPreviewable
														onChange={(next) =>
															setAttribute("distribution")(next.selectedItem)
														}
														value={distribution}
														options={distributionOptions}
													/>
												</FormGroup>

												<FormGroup label="Gap">
													<TextSliderInput
														type="number"
														value={stackGap}
														min={0}
														onChange={setAttribute("stackGap")}
													/>
												</FormGroup>
											</ContextSystemProvider>
										</ListGroup>
									</ListGroups>
								</CardBody>
							</Card>
						</Container>
					</Grid>
				</Container>
			</ContextSystemProvider>
		</View>
	);
}
