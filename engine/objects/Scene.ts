import { _Object, Entity } from "engine/objects";
import { DocumentRenderer, Camera } from "engine/components";
import { Engine } from "engine/Engine";
import { Vector } from "engine/Vector";

export class Scene extends _Object
{
	public entities: Entity[] = [];
	public readonly name: string;

	public constructor(name: string)
	{
		super();
		this.name = name;
	}

	public add = (entity: Entity): Entity =>
	{
		if (!this.entities.includes(entity))
		{
			this.entities.push(entity);

			if (Engine.instance.isStarted)
				entity.start();
			Engine.render();
		}
		return entity;
	}

	public get = (id: number) => this.entities.find(e => e.id === id) || null;

	public getByName = (name: string) => this.entities.find(e => e.name === name) || null;
	
	public remove = (id: number) =>
	{
		const e = this.get(id);
		if (e)
		{
			this.entities.splice(this.entities.indexOf(e), 1);
			e.destroy();
			Engine.render();
		}
	}

	public start = () => 
	{
		const cam = this.add(new Entity("Camera"));
		cam.addComponent(Camera);

		const document = this.add(new Entity("Document"));
		document.addComponent(DocumentRenderer, { format: new Vector(200, 200) });

		this.entities.forEach(e => e.start());
	};

	public render = (ctx: C2D) => this.entities.forEach(e => 
	{
		ctx.save();
		e.render(ctx);
		ctx.restore();
	});
}