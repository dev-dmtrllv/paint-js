import React from "react";
import { observer } from "mobx-react";
import { FlexBox, FlexItem, View } from "views";
import { Sidebar, Menubar, Toolbar } from "components";
import { Modal } from "components/Modal";
import { Engine } from "engine/Engine";

@observer
export class App extends React.Component
{
	private canvasRef = React.createRef<HTMLCanvasElement>();

	componentDidMount()
	{
		if (this.canvasRef.current)
		{
			const canvas = this.canvasRef.current;
			Engine.instance.init({ canvas,  });
			Engine.instance.start();
		}
	}

	render()
	{
		return (
			<FlexBox id="app" fill vertical>
				<Menubar />
				<FlexItem>
					<FlexBox fill horizontal>
						<Toolbar />
						<FlexItem id="workspace">
							<View absolute fill>
								<canvas ref={this.canvasRef} />
							</View>
						</FlexItem>
						<Sidebar />
					</FlexBox>
				</FlexItem>
				<Modal />
			</FlexBox>
		);
	}
}