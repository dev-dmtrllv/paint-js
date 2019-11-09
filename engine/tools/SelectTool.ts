import { Tool, ToolType } from "./Tool"
import { Vector } from "engine/Vector";
import { Renderer } from "engine/modules";
import { Entity } from "engine/objects";
import { SelectRenderer } from "engine/components";
import { MoveTool } from "./MoveTool";

export class SelectTool extends Tool
{
	private sr?: SelectRenderer;
	private mouseDownPos: Vector | null = null;
	private isMouseDown: boolean = false;
	private isShiftDown: boolean = false;

	onMouseDown(p: Vector, btn: number)
	{
		if (this.sr && !this.isShiftDown)
			this.reset();
		if (btn === 1)
		{
			this.mouseDownPos = Vector.round(p);
			this.isMouseDown = true;
			const c = Renderer.screenToCanvas(p);
			const sr = new Entity("Select Region");
			this.sr = sr.addComponent(SelectRenderer, c);
			this.scene.add(sr);
		}

	}

	onMouseMove(p: Vector)
	{
		if (this.sr && this.isMouseDown)
		{
			const pos1 = this.sr.firstPosition;
			const pos2 = Renderer.screenToCanvas(p);

			const xMin = pos1.x < pos2.x ? pos1.x : pos2.x;
			const xMax = pos1.x > pos2.x ? pos1.x : pos2.x;
			const yMin = pos1.y < pos2.y ? pos1.y : pos2.y;
			const yMax = pos1.y > pos2.y ? pos1.y : pos2.y;

			this.scene.entities.forEach(e => 
			{
				if(e.name === "Document" || e.name === "Camera")
					return;
				if (e.isSelected && this.isShiftDown)
					return;
				const { x, y } = e.transform.position;
				e.isSelected = x <= xMax && x >= xMin && y <= yMax && y >= yMin;
			});

			this.sr.updateSecondPosition(pos2);
		}
	}

	onKeyDown(e: KeyboardEvent)
	{
		if (e.key === "Shift")
			this.isShiftDown = true
	}

	onKeyUp(e: KeyboardEvent)
	{
		if (e.key === "Shift")
			this.isShiftDown = false
	}

	reset = () =>
	{
		this.isMouseDown = false;
		if (this.sr)
			this.sr.entity.destroy();
		else
			this.update();
	}

	onMouseUp(pos: Vector, btn: number) 
	{
		if (btn === 1)
		{
			const _pos = Vector.round(pos);
			const p = Renderer.screenToCanvas(pos);
			if (this.mouseDownPos && Vector.equals(_pos, this.mouseDownPos))
				this.scene.entities.forEach(e => e.isSelected = p.equals(e.transform.position));
			this.reset();
		}
	}

	onBlur() { this.reset(); }

	onNextTool(tool: ToolType<any>)
	{
		console.log(![MoveTool, SelectTool].includes(tool))
		if(![MoveTool, SelectTool].includes(tool))
			this.scene.entities.forEach(e => e.isSelected = false);
		this.reset();
	}
}