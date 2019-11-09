import { _Object, Entity, Transform } from "engine/objects";

export class Component extends _Object
{
	public readonly entity: Entity;
	public readonly transform: Transform;

	public constructor(entity: Entity, props?: any)
	{
		super();
		this.entity = entity;
		this.transform = entity.transform;
	}
}