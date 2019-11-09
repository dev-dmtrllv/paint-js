import { Engine } from "engine/Engine";

export abstract class _Object
{
	private static instanceCounter: number = 0;
	public static readonly objects: _Object[] = [];

	public id: number;

	constructor()
	{
		this.id = _Object.instanceCounter++;
		_Object.objects.push(this);
	}

	public start = (): void => {  };
	
	public render = (ctx: C2D): void => {  };
	
	public onDestroy = (): void => {  };

	public readonly destroy = (): void => {
		this.onDestroy();
		const index = _Object.objects.indexOf(this);
		_Object.objects.splice(index, 1);
		Engine.render();
	};
}