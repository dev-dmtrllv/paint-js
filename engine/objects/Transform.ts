import { Vector } from "engine/Vector";
import { Entity } from "./Entity";

export class Transform
{
	public position: Vector = Vector.zero;
	public scale: Vector = Vector.one;
	public rotation: number = 0;
	public readonly entity: Entity;
	
	public constructor(entity: Entity)
	{
		this.entity = entity;
	}
}