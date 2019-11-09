import { Tool } from "./Tool"
import { Vector } from "engine/Vector";
import { Entity } from "engine/objects";
import { Renderer } from "engine/modules";
import { LineRenderer } from "engine/components/LineRenderer";
import { VectorRenderer } from "engine/components";

export class LineTool extends Tool
{
	firstPoint: Entity | null = null;
	prevPoint: Entity | null = null;
	point: Entity | null = null;

	reset()
	{
		if (this.prevPoint && this.firstPoint)
		{
			const lr = this.firstPoint.getComponent(LineRenderer);
			lr && (lr.target = this.prevPoint.transform.position);
		}
		if (this.point)
			this.point.destroy();
		this.firstPoint = null;
		this.point = null;
		this.prevPoint = null;
		this.update();
	}

	onMouseDown(pos: Vector, btn: number)
	{
		if (btn === 3)
			this.reset()
		else if(btn === 1)
		{
			this.point = new Entity("Line Entity");
			this.point.transform.position = Renderer.screenToCanvas(pos);
			this.point.addComponent(VectorRenderer);
			const lineRenderer = this.point.addComponent(LineRenderer);
			if (this.prevPoint)
				lineRenderer.target = this.prevPoint.transform.position;
			this.scene.add(this.point);
		}
	}

	onMouseMove(pos: Vector)
	{
		if (this.point)
		{
			this.point.transform.position = Renderer.screenToCanvas(pos);
			this.update();
		}
	}

	onMouseUp(pos: Vector, btn: number)
	{
		if (this.point && btn === 1)
		{
			if (!this.firstPoint)
				this.firstPoint = this.point;
			this.point.transform.position = Renderer.screenToCanvas(pos);
			this.prevPoint = this.point;
			this.point = null;
			this.update();
		}
	}

	onKeyDown(e: KeyboardEvent)
	{
		if (e.key === "Escape")
			this.reset();
	}
}