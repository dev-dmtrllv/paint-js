import React from "react";
import * as react from "utils/react";
import { View } from "./View";

import "./styles/flex-box.scss";

export const FlexBox: React.FC<IFlexBoxProps> = ({ className, children, horizontal = true, vertical = false, ...rest }) =>
{
	const cn = react.getClassFromProps("flex-box", {
		horizontal: !vertical,
		vertical,
		className
	});
	return (
		<View className={cn} {...rest}>
			{children}
		</View>
	);
}

interface IFlexBoxProps extends ReactProps<HTMLDivElement>
{
	fill?: boolean;
	horizontal?: boolean;
	vertical?: boolean;
}