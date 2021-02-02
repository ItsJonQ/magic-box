import {
	BoxControl,
	ClientRender,
	ContextSystemProvider,
	MagicBox,
	PrefixText,
	SectionFormGroup,
	SoftIcon,
	TextInputSlider,
	UnitInputSlider,
} from "@components/index";
import {
	Button,
	Card,
	CardBody,
	Container,
	Dropdown,
	DropdownMenu,
	DropdownMenuItem,
	DropdownTrigger,
	FlexBlock,
	Grid,
	HStack,
	Icon,
	ListGroup,
	SegmentedControl,
	SelectDropdown,
	Separator,
	Text,
	TextInput,
	Tooltip,
	UnitInput,
	VStack,
	View,
} from "@wp-g2/components";
import { CgFontHeight, CgFontSpacing } from "react-icons/cg";
import {
	FiAperture,
	FiLayout,
	FiLoader,
	FiMinus,
	FiMoreHorizontal,
	FiPlus,
	FiTrello,
	FiType,
} from "react-icons/fi";
import {
	alignItemsOptions,
	flexDirectionOptions,
	fontAlignOptions,
	fontDecorationOptions,
	fontWeightOptions,
	justifyContentOptions,
	overflowOptions,
	useAppStore,
	useAttribute,
} from "@lib/appStore";

import Head from "next/head";
import _ from "lodash";
import { ui } from "@wp-g2/styles";
import shallow from "zustand/shallow";

const RenderControl = React.memo(({ attribute, children }) => {
	const { getHasAttribute } = useAppStore();
	const hasControl = getHasAttribute(attribute);

	return hasControl ? children : null;
});

const ControlDropdownItem = React.memo(
	({ children, toggle, attribute, toggleAttribute }) => {
		const [handleOnToggle, getHasAttribute] = useAppStore(
			(state) => [state[toggleAttribute], state.getHasAttribute],
			shallow
		);
		const hasAttribute = getHasAttribute(attribute);

		const handleOnClick = React.useCallback(() => {
			toggle();
			if (handleOnToggle) {
				handleOnToggle();
			}
		}, []);

		return (
			<DropdownMenuItem isSelected={hasAttribute} onClick={handleOnClick}>
				{children}
			</DropdownMenuItem>
		);
	}
);

const SizeControl = React.memo(() => {
	const [width, setWidth] = useAttribute("width");
	const [height, setHeight] = useAttribute("height");

	return (
		<SectionFormGroup label="Size">
			<Grid align="center" gap={2}>
				<UnitInput
					prefix={<PrefixText>W</PrefixText>}
					gap={1.5}
					cssProp="width"
					value={width}
					min={0}
					onChange={setWidth}
				/>
				<UnitInput
					prefix={<PrefixText>H</PrefixText>}
					gap={1.5}
					value={height}
					cssProp="height"
					min={0}
					onChange={setHeight}
				/>
			</Grid>
		</SectionFormGroup>
	);
});

const MarginControl = React.memo(() => {
	return (
		<RenderControl attribute="margin">
			<BoxControl label="Margin" value="margin" />
		</RenderControl>
	);
});

const PaddingControl = React.memo(() => {
	return (
		<RenderControl attribute="padding">
			<BoxControl label="Padding" value="padding" />
		</RenderControl>
	);
});

const OverflowControl = React.memo(() => {
	const [value, setValue] = useAttribute("overflow");

	return (
		<RenderControl attribute="overflow">
			<SectionFormGroup label="Overflow">
				<SegmentedControl
					value={value}
					options={overflowOptions}
					onChange={setValue}
				/>
			</SectionFormGroup>
		</RenderControl>
	);
});

const LayoutSection = React.memo(() => {
	return (
		<ListGroup>
			<HStack spacing={3}>
				<SoftIcon icon={<FiLayout />} color="blue" />
				<Text weight={600}>Layout</Text>
				<FlexBlock />
				<Dropdown placement="bottom-end">
					{({ toggle }) => (
						<>
							<DropdownTrigger icon={<FiMoreHorizontal />} />
							<DropdownMenu>
								<ControlDropdownItem
									toggle={toggle}
									toggleAttribute="toggleSize"
								>
									Size
								</ControlDropdownItem>
								<ControlDropdownItem
									toggle={toggle}
									toggleAttribute="toggleMargin"
									attribute="margin"
								>
									Margin
								</ControlDropdownItem>
								<ControlDropdownItem
									toggle={toggle}
									toggleAttribute="togglePadding"
									attribute="padding"
								>
									Padding
								</ControlDropdownItem>
								<ControlDropdownItem
									toggle={toggle}
									toggleAttribute="toggleOverflow"
									attribute="overflow"
								>
									Overflow
								</ControlDropdownItem>
							</DropdownMenu>
						</>
					)}
				</Dropdown>
			</HStack>

			<SizeControl />
			<MarginControl />
			<PaddingControl />
			<OverflowControl />
		</ListGroup>
	);
});

const StackDirectionControl = React.memo(() => {
	const [value, setValue] = useAttribute("stack.flexDirection");
	return (
		<SectionFormGroup label="Direction">
			<SegmentedControl
				value={value}
				options={flexDirectionOptions}
				onChange={setValue}
			/>
		</SectionFormGroup>
	);
});

const StackAlignControl = React.memo(() => {
	const [value, setValue] = useAttribute("stack.alignItems");
	return (
		<SectionFormGroup label="Align">
			<SelectDropdown
				isPreviewable
				minWidth={160}
				onChange={(next) => setValue(next.selectedItem)}
				value={value}
				options={alignItemsOptions}
			/>
		</SectionFormGroup>
	);
});

const StackDistributionControl = React.memo(() => {
	const [value, setValue] = useAttribute("stack.justifyContent");
	return (
		<SectionFormGroup label="Distribution">
			<SelectDropdown
				minWidth={160}
				isPreviewable
				onChange={(next) => setValue(next.selectedItem)}
				value={value}
				options={justifyContentOptions}
			/>
		</SectionFormGroup>
	);
});

const StackGapControl = React.memo(() => {
	const [value, setValue] = useAttribute("stack.gap");
	return (
		<SectionFormGroup label="Gap">
			<UnitInputSlider value={value} min={0} onChange={setValue} />
		</SectionFormGroup>
	);
});

const StackSection = React.memo(() => {
	const { getHasAttribute, toggleStack } = useAppStore();

	const hasStack = getHasAttribute("stack");
	const stackIcon = !hasStack ? <FiPlus /> : <FiMinus />;

	return (
		<ListGroup>
			<HStack spacing={3}>
				<SoftIcon icon={<FiTrello />} color="yellow" />
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
			<RenderControl attribute="stack">
				<StackDirectionControl />
				<StackAlignControl />
				<StackDistributionControl />
				<StackGapControl />
			</RenderControl>
		</ListGroup>
	);
});

const FontControl = React.memo(() => {
	const [fontFamily, setFontFamily] = useAttribute("font.family");
	const [fontWeight, setFontWeight] = useAttribute("font.weight");
	const [fontSize, setFontSize] = useAttribute("font.size");

	return (
		<RenderControl attribute="font">
			<SectionFormGroup label="Font">
				<VStack spacing={1}>
					<TextInput value={fontFamily} onChange={setFontFamily} />
					<Grid gap={2}>
						<SelectDropdown
							isPreviewable
							minWidth={160}
							onChange={(next) => setFontWeight(next.selectedItem)}
							value={fontWeight}
							options={fontWeightOptions}
						/>
						<UnitInput
							cssProp="fontSize"
							value={fontSize}
							onChange={setFontSize}
						/>
					</Grid>
				</VStack>
			</SectionFormGroup>
		</RenderControl>
	);
});

const LetterSpacingControl = React.memo(() => {
	const [lineHeight, setLineHeight] = useAttribute("lineHeight");
	const [letterSpacing, setLetterSpacing] = useAttribute("letterSpacing");

	return (
		<RenderControl attribute="letterSpacing">
			<SectionFormGroup label="Spacing">
				<Grid gap={2}>
					<UnitInput
						cssProp="lineHeight"
						onChange={setLineHeight}
						value={lineHeight}
						min={_}
						gap={1}
						step={0.1}
						prefix={
							<PrefixText>
								<Tooltip content="Line Height">
									<View>
										<Icon icon={<CgFontHeight />} size={10} />
									</View>
								</Tooltip>
							</PrefixText>
						}
					/>
					<UnitInput
						cssProp="letterSpacing"
						onChange={setLetterSpacing}
						value={letterSpacing}
						step={0.1}
						gap={1}
						prefix={
							<PrefixText>
								<Tooltip content="Letter Spacing">
									<View>
										<Icon icon={<CgFontSpacing />} size={10} />
									</View>
								</Tooltip>
							</PrefixText>
						}
					/>
				</Grid>
			</SectionFormGroup>
		</RenderControl>
	);
});

const TextAlignControl = React.memo(() => {
	const [value, setValue] = useAttribute("textAlign");

	return (
		<RenderControl attribute="textAlign">
			<SectionFormGroup label="Align">
				<SegmentedControl
					options={fontAlignOptions}
					value={value}
					onChange={setValue}
				/>
			</SectionFormGroup>
		</RenderControl>
	);
});

const TextDecorationControl = React.memo(() => {
	const [value, setValue] = useAttribute("textDecoration");

	return (
		<RenderControl attribute="textDecoration">
			<SectionFormGroup label="Decoration">
				<SegmentedControl
					options={fontDecorationOptions}
					value={value}
					onChange={setValue}
				/>
			</SectionFormGroup>
		</RenderControl>
	);
});

const TypographySection = React.memo(() => {
	return (
		<ListGroup>
			<HStack spacing={3}>
				<SoftIcon icon={<FiType />} color="pink" />
				<Text weight={600}>Typography</Text>
				<FlexBlock />
				<Dropdown placement="bottom-end">
					{({ toggle }) => (
						<>
							<DropdownTrigger icon={<FiMoreHorizontal />} />
							<DropdownMenu>
								<ControlDropdownItem
									toggle={toggle}
									toggleAttribute="toggleFont"
									attribute="font"
								>
									Font
								</ControlDropdownItem>
								<ControlDropdownItem
									toggle={toggle}
									toggleAttribute="toggleLetterSpacing"
									attribute="letterSpacing"
								>
									Spacing
								</ControlDropdownItem>
								<ControlDropdownItem
									toggle={toggle}
									toggleAttribute="toggleTextAlign"
									attribute="textAlign"
								>
									Align
								</ControlDropdownItem>
								<ControlDropdownItem
									toggle={toggle}
									toggleAttribute="toggleTextDecoration"
									attribute="textDecoration"
								>
									Decoration
								</ControlDropdownItem>
							</DropdownMenu>
						</>
					)}
				</Dropdown>
			</HStack>
			<FontControl />
			<LetterSpacingControl />
			<TextAlignControl />
			<TextDecorationControl />
		</ListGroup>
	);
});

const StylesSection = React.memo(() => {
	return (
		<ListGroup>
			<HStack spacing={3}>
				<SoftIcon icon={<FiLoader />} color="green" />
				<Text weight={600}>Styles</Text>
				<FlexBlock />
				<Dropdown placement="bottom-end">
					{({ toggle }) => (
						<>
							<DropdownTrigger icon={<FiMoreHorizontal />} />
							<DropdownMenu>
								<DropdownMenuItem onClick={toggle}>Background</DropdownMenuItem>
								<DropdownMenuItem onClick={toggle}>Border</DropdownMenuItem>
							</DropdownMenu>
						</>
					)}
				</Dropdown>
			</HStack>
		</ListGroup>
	);
});

const BlurControl = React.memo(() => {
	const [value, setValue] = useAttribute("blur");

	return (
		<RenderControl attribute="blur">
			<SectionFormGroup label="Blur">
				<UnitInputSlider
					min={0}
					max={100}
					value={value}
					sliderMax={20}
					onChange={setValue}
				/>
			</SectionFormGroup>
		</RenderControl>
	);
});

const OpacityControl = React.memo(() => {
	const [value, setValue] = useAttribute("opacity");

	return (
		<RenderControl attribute="opacity">
			<SectionFormGroup label="Opacity">
				<TextInputSlider
					type="number"
					min={0}
					max={100}
					suffix={<PrefixText>%</PrefixText>}
					onChange={setValue}
					value={value}
				/>
			</SectionFormGroup>
		</RenderControl>
	);
});

const EffectsSection = React.memo(() => {
	return (
		<ListGroup>
			<HStack spacing={3}>
				<SoftIcon icon={<FiAperture />} color="indigo" />
				<Text weight={600}>Effects</Text>
				<FlexBlock />
				<Dropdown placement="bottom-end">
					{({ toggle }) => (
						<>
							<DropdownTrigger icon={<FiMoreHorizontal />} />
							<DropdownMenu>
								<ControlDropdownItem
									toggle={toggle}
									toggleAttribute="toggleOpacity"
									attribute="opacity"
								>
									Opacity
								</ControlDropdownItem>
								<ControlDropdownItem
									toggle={toggle}
									toggleAttribute="toggleBlur"
									attribute="blur"
								>
									Blur
								</ControlDropdownItem>
							</DropdownMenu>
						</>
					)}
				</Dropdown>
			</HStack>
			<OpacityControl />
			<BlurControl />
		</ListGroup>
	);
});

function SectionSeparator() {
	return (
		<View>
			<Separator />
		</View>
	);
}

function DemoContent() {
	return (
		<MagicBox>
			<div>
				<MagicBox attributes={{}}>
					<div style={{ height: 50, background: ui.get("colorBlue50") }}>
						hello
					</div>
				</MagicBox>
			</div>
			<div>
				<div
					style={{
						height: 100,
						width: 100,
						background: ui.get("colorRed50"),
					}}
				>
					hello
				</div>
			</div>
		</MagicBox>
	);
}

function ContainerCard({ children }) {
	return (
		<Container
			width={280}
			css={{ position: "fixed", top: 0, bottom: 0, right: 0 }}
		>
			<Card isBorderless elevation={3} css={{ height: "100%" }}>
				<CardBody>
					<VStack spacing={1}>{children}</VStack>
				</CardBody>
			</Card>
		</Container>
	);
}

export default function Home() {
	return (
		<View>
			<ContextSystemProvider>
				<Head>
					<title>G2</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Container>
					<Grid css={{ padding: 50 }}>
						<View>
							<DemoContent />
						</View>
						<View>
							<ClientRender>
								<ContainerCard>
									<LayoutSection />
									<SectionSeparator />

									<StackSection />
									<SectionSeparator />

									<TypographySection />
									<SectionSeparator />

									<StylesSection />
									<SectionSeparator />

									<EffectsSection />
								</ContainerCard>
							</ClientRender>
						</View>
					</Grid>
				</Container>
			</ContextSystemProvider>
		</View>
	);
}
