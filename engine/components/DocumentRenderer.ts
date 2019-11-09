import { Component } from "./Component";
import { Entity } from "engine/objects";
import { Vector } from "engine/Vector";

const Formats = {
	A4: new Vector(595, 842),
}

export class DocumentRenderer extends Component
{
	public size: Vector = Formats.A4;

	constructor(entity: Entity, props: any)
	{
		super(entity);
	}

	render = (ctx: C2D) =>
	{
		const { x, y } = this.transform.position;
		ctx.shadowColor = "black";
		ctx.shadowBlur = 6;
		ctx.shadowOffsetX = 6;
		ctx.shadowOffsetY = 6;
		ctx.fillStyle = "white";
		ctx.fillRect(x - (this.size.x / 2), y - (this.size.y / 2), this.size.x, this.size.y);
	}
}