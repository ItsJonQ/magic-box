import _ from "lodash";
import { FiLayers } from "react-icons/fi";
import { ui } from "@wp-g2/styles";
import { Icon, View } from "@wp-g2/components";
import React from "react";

export function SoftIcon({ icon = <FiLayers />, color = "green" }) {
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
}
