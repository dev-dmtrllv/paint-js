import { Component } from "./Component";
import { Vector } from "engine/Vector";
import { Entity } from "engine/objects";
import { Engine } from "engine/Engine";

export class SelectRenderer extends Component
{
	public firstPosition: Vector;
	public secondPosition: Vector;

	constructor(entity: Entity, firstPosition: Vector)
	{
		super(entity);
		this.firstPosition = firstPosition;
		this.secondPosition = firstPosition;
	}

	updateSecondPosition = (pos: Vector) => 
	{
		this.secondPosition = pos;
		Engine.render();
	}

	render = (ctx: C2D) =>
	{
		const size = Vector.subtract(this.secondPosition, this.firstPosition)
		ctx.fillStyle = "rgba(255, 52, 52, .35)";
		ctx.fillRect(this.firstPosition.x, this.firstPosition.y, size.x, size.y);
		ctx.lineWidth = 2;
		ctx.strokeStyle = "rgba(255, 52, 52, .9)";
		ctx.strokeRect(this.firstPosition.x, this.firstPosition.y, size.x, size.y);
	}
}