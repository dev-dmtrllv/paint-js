import React from "react";
import { observer } from "mobx-react";
import { FlexItem, View } from "views";
import { appStore } from "stores";
import { SelectTool, ToolType } from "engine/tools";
import { VectorTool } from "engine/tools/VectorTool";
import { Engine } from "engine/Engine";
import { LineTool } from "engine/tools/LineTool";

import "./styles/toolbar.scss";
import { MoveTool } from "engine/tools/MoveTool";

const ToolBtn: React.FC<IToolBtnProps> = observer(({ name, tool }) => {
	const tm = Engine.instance.toolManager;
	const isActive = tm.activeTool && tm.activeTool.constructor === tool;
	const handleClick = () => 
	{
		if(!isActive)
			tm.select(tool)
	};
	
	return (
		<View className={`tool ${name} ${isActive ? "active" : ""}`} onClick={handleClick}>
			<View absolute centered>{name[0]}</View>
		</View>
	);
});

interface IToolBtnProps
{
	name: string;
	tool: ToolType<any>;
}


@observer
export class Toolbar extends React.Component
{
	render()
	{
		const base = appStore.isFullscreen ? "0px" : "42px";
		return (
			<FlexItem className="toolbar" base={base}>
				<View fill>
					<ToolBtn name="select" tool={SelectTool}/>
					<ToolBtn name="vector" tool={VectorTool}/>
					<ToolBtn name="lines" tool={LineTool}/>
					<ToolBtn name="move" tool={MoveTool}/>
				</View>
			</FlexItem>
		)
	}
}