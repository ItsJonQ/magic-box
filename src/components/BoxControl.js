import {
	FiArrowDown,
	FiArrowLeft,
	FiArrowRight,
	FiArrowUp,
} from "react-icons/fi";
import { Grid, Icon, UnitInput } from "@wp-g2/components";

import { PrefixText } from "./PrefixText";
import React from "react";
import { SectionFormGroup } from "./SectionFormGroup";
import { ui } from "@wp-g2/styles";
import { useAppStore } from "@lib/appStore";

export function BoxControl({ label, value, ...otherProps }) {
	const [attributes, setAttribute] = useAppStore((state) => [
		state.attributes[value],
		state.setAttribute,
	]);

	return (
		<SectionFormGroup label={label}>
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
		</SectionFormGroup>
	);
}
