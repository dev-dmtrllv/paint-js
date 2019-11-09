import { Tool, ToolType } from "./Tool";
import { Vector } from "engine/Vector";
import { Renderer } from "engine/modules";
import { SelectTool } from ".";

export class MoveTool extends Tool
{
	downPos: Vector | null = null;
	isMouseDown: boolean = false;

	onMouseDown(pos: Vector, btn: number)
	{
		this.isMouseDown = true;
		this.downPos = Renderer.screenToCanvas(pos);
	}

	onMouseUp()
	{
		this.isMouseDown = false;
		this.downPos = null;
	}

	onMouseMove(pos: Vector)
	{
		if (this.isMouseDown && this.downPos)
		{
			pos = Renderer.screenToCanvas(pos);
			const dis = Vector.subtract(pos, this.downPos);
			this.downPos = pos;
			this.scene.entities.forEach(e => 
			{
				if(e.isSelected)
					e.transform.position.add(dis);
			});
			this.update();
		}
	}

	onNextTool(tool: ToolType<any>)
	{
		if(![MoveTool, SelectTool].includes(tool))
			this.scene.entities.forEach(e => e.isSelected = false);
		this.update();
	}
}