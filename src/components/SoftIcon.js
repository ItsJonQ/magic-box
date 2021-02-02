import { Icon, View } from "@wp-g2/components";

import { FiLayers } from "react-icons/fi";
import React from "react";
import _ from "lodash";
import { ui } from "@wp-g2/styles";

export function SoftIcon({ icon = <FiLayers />, color = "green" }) {
	return null;
	// return (
	// 	<View
	// 		css={{
	// 			borderRadius: 6,
	// 			width: 24,
	// 			height: 24,
	// 			padding: 5,
	// 			backgroundColor: ui.get(`color${_.upperFirst(color)}50`),
	// 			color: ui.get(`color${_.upperFirst(color)}500`),
	// 		}}
	// 	>
	// 		<Icon icon={icon} size={14} />
	// 	</View>
	// );
}
