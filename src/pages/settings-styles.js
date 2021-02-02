import { ContextSystemProvider } from "@components/index";
import {
	Card,
	CardBody,
	Container,
	Panel,
	PanelBody,
	PanelHeader,
	SegmentedControl,
	Divider,
	Tab,
	TabList,
	TabPanel,
	Heading,
	View,
	Spacer,
	Text,
	VStack,
	HStack,
	Tabs,
} from "@wp-g2/components";
import { useDrag } from "react-use-gesture";
import { FiPlus, FiChevronDown, FiMenu } from "react-icons/fi";
import colorize from "tinycolor2";
import { v4 as uuid } from "uuid";
import { ClientRender, PrefixText } from "components/index";
import { styled, ui } from "@wp-g2/styles";

import Head from "next/head";
import _ from "lodash";

const BlockSettingsView = () => {
	return (
		<>
			<Panel visible>
				<PanelHeader>Text Settings</PanelHeader>
				<PanelBody>Hello</PanelBody>
			</Panel>
		</>
	);
};

const BlockAppearanceView = () => {
	return (
		<>
			<Panel>
				<PanelHeader>Layout</PanelHeader>
			</Panel>
			<Panel>
				<PanelHeader>Typography</PanelHeader>
			</Panel>
			<Panel>
				<PanelHeader>Background</PanelHeader>
			</Panel>
			<Panel>
				<PanelHeader>Styles</PanelHeader>
			</Panel>
			<Panel>
				<PanelHeader>Effects</PanelHeader>
			</Panel>
		</>
	);
};

const Sidebar = () => {
	const [innerView, setInnerView] = React.useState("settings");
	const isSettingsView = innerView === "settings";
	return (
		<Tabs selectedId="block">
			<TabList>
				<Tab id="post">Post</Tab>
				<Tab id="block">Block</Tab>
			</TabList>
			<TabPanel>
				<CardBody>Post</CardBody>
			</TabPanel>
			<TabPanel>
				<CardBody>
					<HStack alignment="top">
						<Text css={{ width: 30 }} size={30}>
							🚀
						</Text>
						<VStack spacing={1}>
							<Heading size={5}>Paragraph</Heading>
							<Text>Start with the building block of all narrative.</Text>
						</VStack>
					</HStack>
				</CardBody>
				<Divider />

				<View css={{ padding: ui.space(1) }}>
					<HStack alignment="center">
						<SegmentedControl
							value={innerView}
							onChange={setInnerView}
							options={[
								{ value: "settings", label: "Settings" },
								{ value: "appearance", label: "Appearance" },
							]}
						/>
					</HStack>
				</View>
				<Divider />

				{isSettingsView ? <BlockSettingsView /> : <BlockAppearanceView />}
			</TabPanel>
		</Tabs>
	);
};

export default function Home() {
	return (
		<View>
			<ContextSystemProvider>
				<Head>
					<title>G2: Settings/Styles</title>
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
									<Card elevation={5} css={{ minHeight: "80vh" }}>
										<Sidebar />
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
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
				}}
			>
				<View
					style={{
						fontSize: "10vw",
						fontWeight: 800,
						letterSpacing: -1,
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
