import React from "react";
import { observer } from "mobx-react";
import { View, FlexBox, FlexItem } from "views";

import "./styles/project-panel.scss";

export class ProjectPanel extends React.Component
{
	render()
	{
		return (
			<FlexBox fill horizontal className="project-panel">
				<FlexItem base={120}>

				</FlexItem>
				<FlexItem>
					<FlexBox vertical fill className="project-panel">
						<FlexItem base={120}>

						</FlexItem>
						<FlexItem>

						</FlexItem>
					</FlexBox>
				</FlexItem>
			</FlexBox>
		);
	}
}