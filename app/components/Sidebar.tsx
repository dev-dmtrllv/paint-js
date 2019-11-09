import React, { ChangeEvent } from "react";
import { observer } from "mobx-react";
import { FlexItem, View, FlexBox, Icon } from "views";
import { getClassFromProps } from "utils/react";
import { clamp } from "utils/math";
import { Engine } from "engine/Engine";
import { DocumentRenderer } from "engine/components";
import { appStore } from "stores";

import "./styles/sidebar.scss";

@observer
export class Sidebar extends React.Component<{}, ISidebarState>
{
	animationTimeout: number | null = null;

	state: ISidebarState = {
		collapsed: false,
		width: 220,
		isSliding: false,
		isCollapsing: false
	}

	componentDidMount()
	{
		window.addEventListener("mousemove", this.onMouseMove);
		window.addEventListener("mouseup", this.onMouseUp);
	}

	toggle = () => 
	{
		if (this.animationTimeout)
			clearTimeout(this.animationTimeout);

		this.setState({ collapsed: !this.state.collapsed, isCollapsing: true }, () => 
		{
			this.animationTimeout = window.setTimeout(() => 
			{
				this.setState({ isCollapsing: false })
			}, 650)
			const startTime = Date.now();
			const resize = () =>
			{
				if (startTime + 650 > Date.now())
				{
					Engine.instance.renderer.resize();
					requestAnimationFrame(resize);
				}
			};
			resize();
		});
	}

	onMouseDown = () => 
	{
		if (!this.state.collapsed)
		{
			document.body.style.cursor = "ew-resize";
			this.setState({ isSliding: true });
		}
	}
	onMouseMove = (e: MouseEvent) =>
	{
		if (this.state.isSliding)
		{
			const width = window.innerWidth - e.clientX;
			this.setState({ width: clamp(width, 180, 420) }, () => 
			{
				Engine.instance.renderer.resize()
			});
		}
	}

	onMouseUp = () => 
	{
		document.body.style.cursor = "default";
		this.setState({ isSliding: false });
	}

	renderToggleButton = () =>
	{
		const { width } = this.state;
		const style = {
			marginRight: appStore.isFullscreen ? (-width) + "px" : "0px"
		};
		return (
			<View className="btn-toggle" fixed onClick={this.toggle} style={style}>
				<View absolute centered>
					<Icon name="angle-right" />
				</View>
			</View>
		);
	}

	render()
	{
		const { collapsed, isCollapsing, width } = this.state;


		const cn = getClassFromProps("sidebar", { collapsed, isCollapsing })

		const style = {
			marginRight: (collapsed || appStore.isFullscreen) ? (-width) + "px" : "0px"
		};

		return (
			<FlexItem className={cn} base={width} style={style}>
				<FlexBox vertical fill>
					<FlexItem base={36}>
						<View fill className="titlebar">
							{this.renderToggleButton()}
						</View>
					</FlexItem>
					<FlexItem>
						<View fill className="body">
							{this.renderBody()}
						</View>
					</FlexItem>
				</FlexBox>
				<View absolute className="slider" onMouseDown={this.onMouseDown} />
			</FlexItem>
		);
	}

	renderBody()
	{
		const handleChange = (e: React.ChangeEvent) =>
		{
			const engine = Engine.instance;
			const val = +(e.nativeEvent.target! as any).value;
			if(engine.isStarted)
			{
				const doc = engine.sceneManager.activeScene.getByName("Document");
				if(doc)
				{
					const docRenderer = doc.getComponent(DocumentRenderer);
					if(docRenderer)
					{
						docRenderer.size.x = val;
						Engine.render();
					}
				}
			}
		};

		return (
			<input type="range" min="50" max="600" onChange={handleChange} />
		);
	}
}

interface ISidebarState
{
	width: number;
	isSliding: boolean;
	collapsed: boolean;
	isCollapsing: boolean;
}