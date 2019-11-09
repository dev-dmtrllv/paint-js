import { Component } from "./Component";
import { Vector } from "engine/Vector";

export class LineRenderer extends Component
{
	public target: Vector | null = null;
	public width: number = 2;
	public color: string = "rgb(52,255,52)";

	render = (ctx: C2D) =>
	{
		if (!this.target)
			return;
		const { x, y } = this.transform.position;
		ctx.lineWidth = this.width;
		ctx.strokeStyle = this.color;
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(this.target.x, this.target.y);
		ctx.stroke();
	}
}