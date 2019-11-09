import { Component } from "engine/components";
import { _Object, Transform } from "engine/objects";
import { Engine } from "engine/Engine";

export class Entity extends _Object
{

	public readonly name: string;
	public readonly components: Component[] = [];
	public readonly transform: Transform;

	public isSelected: boolean = false;

	public constructor(name: string)
	{
		super();
		this.name = name;
		this.transform = new Transform(this);
	}

	public start = () => this.components.forEach(c => c.start());

	public render = (ctx: C2D) => this.components.forEach(c => 
	{
		ctx.save();
		c.render(ctx);
		ctx.restore();
	});

	public addComponent = <T extends Component>(type: new (entity: Entity, props?: any) => T, props?: any): T =>
	{
		const com = new type(this, props);
		this.components.push(com);
		return com;
	}

	public getComponent = <T extends Component>(type: new (entity: Entity, props?: any) => T): T | null =>
	{
		return this.components.find(c => c.constructor === type) as T || null;
	}

	public removeComponent = <T extends Component>(type: new (entity: Entity, props?: any) => T) =>
	{
		const com = this.getComponent(type);
		if (com)
		{
			com.destroy();
			this.components.splice(this.components.indexOf(com), 1);
		}
	}

	public onDestroy = () =>
	{
		Engine.instance.sceneManager.activeScene.remove(this.id);
	}
}