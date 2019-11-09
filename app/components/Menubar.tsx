import React from "react";
import { observer } from "mobx-react";
import { FlexItem, View } from "views";
import { appStore } from "stores";

import "./styles/menubar.scss";

@observer
export class Menubar extends React.Component
{
	render()
	{
		const base = appStore.isFullscreen ? "0px" : "26px";

		return (
			<FlexItem className="menubar" base={base}>
				<View fill>

				</View>
			</FlexItem>
		);
	}
}