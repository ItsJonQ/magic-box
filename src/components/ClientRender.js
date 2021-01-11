import { useEffect, useState } from "react";
import { Animated } from "@wp-g2/components";

export function ClientRender({ children }) {
	const [showChild, setShowChild] = useState(false);

	useEffect(() => {
		setShowChild(true);
	}, []);

	if (!showChild) {
		return null;
	}

	return (
		<Animated initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
			{children}
		</Animated>
	);
}
