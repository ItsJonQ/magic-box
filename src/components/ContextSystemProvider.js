import { ContextSystemProvider as BaseContextSystemProvider } from "@wp-g2/components";

export function ContextSystemProvider({ value = {}, ...props }) {
	const contextProps = {
		Dropdown: { placement: "bottom-end" },
		DropdownMenu: { minWidth: 120, maxWidth: 160 },
		DropdownTrigger: { isSubtle: true, isControl: true, size: "small" },
		FormGroup: {
			horizontal: true,
			truncate: true,
		},
		Separator: { css: { opacity: 0.6 } },
		SelectDropdown: { minWidth: 120, maxWidth: 160, isPreviewable: true },
		...value,
	};

	return <BaseContextSystemProvider value={contextProps} {...props} />;
}
