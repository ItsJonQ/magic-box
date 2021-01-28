import { ContextSystemProvider } from "@components/index";
import {
	Animated,
	Button,
	Card,
	CardBody,
	Image,
	CardHeader,
	CloseButton,
	ControlLabel,
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

import Head from "next/head";
import _ from "lodash";

const blendOptionValues = [
	"normal",
	"multiply",
	"screen",
	"overlay",
	"darken",
	"lighten",
	"color-dodge",
	"color-burn",
	"difference",
	"exclusion",
	"hue",
	"saturation",
	"color",
	"luminosity",
];

const blendOptions = blendOptionValues.map((value) => ({
	value,
	label: _.startCase(value),
}));

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

export default function Home() {
	const [background, setBackground] = React.useState(imageOptions[0]);
	const [blend, setBlend] = React.useState(blendOptions[0]);
	const [opacity, setOpacity] = React.useState(100);
	const [color, setColor] = React.useState("white");

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
							<View
								css={{
									position: "absolute",
									right: "100%",
									marginRight: 12,
									top: 0,
								}}
							>
								<Container width={280} css={{ marginRight: 0, minWidth: 280 }}>
									<Card elevation={5} css={{ minHeight: "100vh" }}>
										<CardBody scrollable={false}>
											<FormGroup label="Image">
												<SelectDropdown
													options={imageOptions}
													isPreviewable
													value={background}
													onChange={(next) => {
														setBackground(next.selectedItem);
													}}
												/>
											</FormGroup>
										</CardBody>
										<Divider />
										<CardBody scrollable={false}>
											<ListGroup>
												<FormGroup label="Blending">
													<SelectDropdown
														options={blendOptions}
														isPreviewable
														value={blend}
														onChange={(next) => {
															setBlend(next.selectedItem);
														}}
													/>
												</FormGroup>
												<FormGroup label="Opacity">
													<Grid>
														<TextInput
															suffix={<PrefixText>%</PrefixText>}
															value={opacity}
															onChange={setOpacity}
															type="number"
															min={0}
															max={100}
														/>
														<Slider
															value={opacity}
															min={0}
															max={100}
															onChange={setOpacity}
														/>
													</Grid>
												</FormGroup>
											</ListGroup>
										</CardBody>
										<Divider />
										<CardBody scrollable={false}>
											<VStack>
												<ControlLabel>Color</ControlLabel>
												<ColorPicker color={color} onChange={setColor} />
											</VStack>
										</CardBody>
									</Card>
								</Container>
							</View>
						</View>
					</ClientRender>
				</View>
			</ContextSystemProvider>
			<View
				style={{
					height: "90vh",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					backgroundImage: `url(/images/${background.value}.jpg)`,
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
				}}
			>
				<View
					style={{
						fontSize: "10vw",
						color,
						fontWeight: 800,
						letterSpacing: -1,
						opacity: `${opacity / 100}`,
						mixBlendMode: blend.value,
					}}
				>
					Hello.
				</View>
			</View>
			<View
				style={{
					height: "300vh",
				}}
			/>
		</View>
	);
}
