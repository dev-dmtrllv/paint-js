import { Component } from "./Component";

export class VectorRenderer extends Component
{
	public color: string = "rgb(52, 52, 255)";

	render = (ctx: C2D) =>
	{
		const { x, y } = this.transform.position;
		ctx.fillStyle = this.color;
		ctx.fillRect(x - 3, y - 3, 3, 3);
		if (this.entity.isSelected)
		{
			ctx.strokeStyle = "red";
			ctx.strokeRect(x - 6, y - 6, 10, 10);
		}
	}
}