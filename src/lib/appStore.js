import { createStore } from "@wp-g2/substate";
import _ from "lodash";

export const appStore = createStore((set, get) => ({
	attributes: {
		height: "auto",
		width: "auto",
		overflow: null,
		margin: null,
		padding: null,
		stack: null,
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

export const defaultStackAttributes = {
	display: "flex",
	alignItems: alignItemsOptions[1],
	justifyContent: justifyContentOptions[1],
	flexDirection: "row",
	gap: "10px",
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
