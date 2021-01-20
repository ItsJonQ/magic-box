import { AiOutlineStrikethrough, AiOutlineUnderline } from "react-icons/ai";
import {
	BsJustify,
	BsTextCenter,
	BsTextLeft,
	BsTextRight,
} from "react-icons/bs";

import { BiFont } from "react-icons/bi";
import { Icon } from "@wp-g2/components";
import _ from "lodash";
import createStore from "zustand";

export const appStore = createStore((set, get) => ({
	attributes: {
		font: null,
		height: "auto",
		letterSpacing: null,
		lineHeight: null,
		margin: null,
		overflow: null,
		padding: null,
		stack: null,
		textDecoration: null,
		width: "auto",
	},

	// Setters
	setAttribute: (attribute) => (next) => {
		const nextAttributes = _.set(get().attributes, attribute, next);
		set({
			attributes: {
				...nextAttributes,
			},
		});
	},

	// Selectors
	getHasAttribute: (attribute) => {
		const attr = get().attributes[attribute];
		return !_.isNil(attr);
	},

	// Actions
	toggleAttribute: (attribute, on, off = null) => {
		const { setAttribute, attributes } = get();
		const target = attributes[attribute];

		if (!_.isNil(target)) {
			setAttribute(attribute)(off);
		} else {
			setAttribute(attribute)(on);
		}
	},

	toggleSize: () => {
		const { setAttribute } = get();
		setAttribute("height")("auto");
		setAttribute("width")("auto");
	},

	toggleStack: () => {
		const { toggleAttribute } = get();
		const next = { ...{}, ...defaultStackAttributes };
		toggleAttribute("stack", next);
	},

	togglePadding: () => {
		const { toggleAttribute } = get();
		const next = { ...{}, ...defaultPaddingAttributes };
		toggleAttribute("padding", next);
	},

	toggleMargin: () => {
		const { toggleAttribute } = get();
		const next = { ...{}, ...defaultMarginAttributes };
		toggleAttribute("margin", next);
	},

	toggleOverflow: () => {
		const { toggleAttribute } = get();
		const next = "auto";
		toggleAttribute("overflow", next);
	},

	toggleFont: () => {
		const { toggleAttribute } = get();
		const next = { ...{}, ...defaultFontAttributes };
		toggleAttribute("font", next);
	},

	toggleLetterSpacing: () => {
		const { toggleAttribute } = get();
		const next = "0";
		toggleAttribute("letterSpacing", "0");
		toggleAttribute("lineHeight", "1.6em");
	},

	toggleTextDecoration: () => {
		const { toggleAttribute } = get();
		const next = "none";
		toggleAttribute("textDecoration", next);
	},

	toggleTextAlign: () => {
		const { toggleAttribute } = get();
		const next = "left";
		toggleAttribute("textAlign", next);
	},

	toggleBlur: () => {
		const { toggleAttribute } = get();
		const next = 0;
		toggleAttribute("blur", next);
	},

	toggleOpacity: () => {
		const { toggleAttribute } = get();
		const next = 100;
		toggleAttribute("opacity", next);
	},
}));

export const useAppStore = appStore;

export const justifyContentOptions = [
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

export const alignItemsOptions = justifyContentOptions;

export const flexDirectionOptions = [
	{
		label: "Horizontal",
		value: "row",
	},
	{
		label: "Vertical",
		value: "column",
	},
];

export const fontAlignOptions = [
	{
		label: <Icon icon={<BsTextLeft />} size={14} aria-label="Left" />,
		value: "left",
	},
	{
		label: <Icon icon={<BsTextCenter />} size={14} aria-label="Center" />,
		value: "center",
	},
	{
		label: <Icon icon={<BsTextRight />} size={14} aria-label="Right" />,
		value: "right",
	},
	{
		label: <Icon icon={<BsJustify />} size={14} aria-label="Justify" />,
		value: "justify",
	},
];

export const fontDecorationOptions = [
	{
		label: <Icon icon={<BiFont />} size={14} aria-label="None" />,
		value: "none",
	},
	{
		label: (
			<Icon icon={<AiOutlineUnderline />} size={14} aria-label="Underline" />
		),
		value: "underline",
	},
	{
		label: (
			<Icon
				icon={<AiOutlineStrikethrough />}
				size={14}
				aria-label="Line Through"
			/>
		),
		value: "line-through",
	},
];

export const fontWeightOptions = [
	{
		label: "100",
		value: 100,
	},
	{
		label: "200",
		value: 200,
	},
	{
		label: "300",
		value: 300,
	},
	{
		label: "400",
		value: 400,
	},
	{
		label: "500",
		value: 500,
	},
	{
		label: "600",
		value: 600,
	},
	{
		label: "700",
		value: 700,
	},
	{
		label: "800",
		value: 800,
	},
	{
		label: "900",
		value: 900,
	},
];

export const defaultStackAttributes = {
	display: "flex",
	alignItems: alignItemsOptions[1],
	justifyContent: justifyContentOptions[1],
	flexDirection: "row",
	gap: "10px",
};

export const overflowOptions = [
	{
		value: "auto",
		label: "Auto",
	},
	{
		value: "hidden",
		label: "Hidden",
	},
];

export const flexAlignment = {
	start: "flex-start",
	center: "center",
	end: "flex-end",
	top: "flex-start",
	bottom: "flex-end",
};

export const defaultFontAttributes = {
	family: "system-ui",
	size: "13px",
	weight: fontWeightOptions[3],
};

export const defaultPaddingAttributes = {
	top: "0px",
	bottom: "0px",
	left: "0px",
	right: "0px",
};

export const defaultMarginAttributes = {
	top: "0px",
	bottom: "0px",
	left: "0px",
	right: "0px",
};
