import Head from "next/head";
import {
	Container,
	Grid,
	Card,
	CardBody,
	Button,
	ListGroup,
	SegmentedControl,
	SelectDropdown,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownMenuItem,
	HStack,
	VStack,
	FlexBlock,
	UnitInput,
	Separator,
	Text,
	View,
} from "@wp-g2/components";
import {
	FiMoreHorizontal,
	FiLayout,
	FiTrello,
	FiType,
	FiLoader,
	FiAperture,
	FiPlus,
	FiMinus,
} from "react-icons/fi";
import { ui } from "@wp-g2/styles";
import {
	BoxControl,
	ContextSystemProvider,
	MagicBox,
	PrefixText,
	SectionFormGroup,
	SoftIcon,
	TextInputSlider,
	UnitInputSlider,
} from "@components/index";
import _ from "lodash";
import {
	alignItemsOptions,
	flexDirectionOptions,
	justifyContentOptions,
	overflowOptions,
	useAppStore,
} from "@lib/appStore";

function LayoutSection() {
	const {
		attributes,
		setAttribute,
		getHasAttribute,
		toggleSize,
		togglePadding,
		toggleMargin,
		toggleOverflow,
	} = useAppStore();

	const { margin, padding, overflow, width, height } = attributes;

	const hasMargin = getHasAttribute("margin");
	const hasOverflow = getHasAttribute("overflow");
	const hasPadding = getHasAttribute("padding");

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
			<SectionFormGroup label="Size">
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
			</SectionFormGroup>

			{hasMargin && <BoxControl label="Margin" value="margin" />}

			{hasPadding && <BoxControl label="Padding" value="padding" min={0} />}

			{hasOverflow && (
				<SectionFormGroup label="Overflow">
					<SegmentedControl
						value={overflow}
						options={overflowOptions}
						onChange={setAttribute("overflow")}
					/>
				</SectionFormGroup>
			)}
		</ListGroup>
	);
}

function StackSection() {
	const {
		attributes,
		setAttribute,
		getHasAttribute,
		toggleStack,
	} = useAppStore();

	const { stack } = attributes;

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
			{hasStack && (
				<>
					<SectionFormGroup label="Direction">
						<SegmentedControl
							value={stack?.flexDirection}
							options={flexDirectionOptions}
							onChange={setAttribute("stack.flexDirection")}
						/>
					</SectionFormGroup>
					<SectionFormGroup label="Align">
						<SelectDropdown
							isPreviewable
							minWidth={160}
							onChange={(next) =>
								setAttribute("stack.alignItems")(next.selectedItem)
							}
							value={stack?.alignItems}
							options={alignItemsOptions}
						/>
					</SectionFormGroup>
					<SectionFormGroup label="Distribution">
						<SelectDropdown
							minWidth={160}
							isPreviewable
							onChange={(next) =>
								setAttribute("stack.justifyContent")(next.selectedItem)
							}
							value={stack?.justifyContent}
							options={justifyContentOptions}
						/>
					</SectionFormGroup>
					<SectionFormGroup label="Gap">
						<UnitInputSlider
							value={stack?.gap}
							min={0}
							onChange={setAttribute("stack.gap")}
						/>
					</SectionFormGroup>
				</>
			)}
		</ListGroup>
	);
}

function TypographySection() {
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
								<DropdownMenuItem
									onClick={() => {
										toggle();
									}}
								>
									Font Family
								</DropdownMenuItem>
							</DropdownMenu>
						</>
					)}
				</Dropdown>
			</HStack>
		</ListGroup>
	);
}

function StylesSection() {
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
}

function EffectsSection() {
	const {
		attributes,
		setAttribute,
		getHasAttribute,
		toggleBlur,
		toggleOpacity,
	} = useAppStore();

	const { blur, opacity } = attributes;

	const hasBlur = getHasAttribute("blur");
	const hasOpacity = getHasAttribute("opacity");

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
								<DropdownMenuItem
									isSelected={!_.isNil(opacity)}
									onClick={() => {
										toggleOpacity();
										toggle();
									}}
								>
									Opacity
								</DropdownMenuItem>
								<DropdownMenuItem
									isSelected={!_.isNil(blur)}
									onClick={() => {
										toggleBlur();
										toggle();
									}}
								>
									Blur
								</DropdownMenuItem>
							</DropdownMenu>
						</>
					)}
				</Dropdown>
			</HStack>
			{hasOpacity && (
				<SectionFormGroup label="Opacity">
					<TextInputSlider
						type="number"
						min={0}
						max={100}
						value={opacity}
						suffix={<PrefixText>%</PrefixText>}
						onChange={setAttribute("opacity")}
					/>
				</SectionFormGroup>
			)}
			{hasBlur && (
				<SectionFormGroup label="Blur">
					<UnitInputSlider
						min={0}
						max={100}
						value={blur}
						sliderMax={20}
						onChange={setAttribute("blur")}
					/>
				</SectionFormGroup>
			)}
		</ListGroup>
	);
}

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
				<div style={{ height: 50, background: ui.get("colorBlue50") }}>
					hello
				</div>
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
		<Container width={280}>
			<Card isBorderless elevation={5}>
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
						</View>
					</Grid>
				</Container>
			</ContextSystemProvider>
		</View>
	);
}
