import { Vector } from "engine/Vector";
import { Scene } from "engine/objects";
import { Engine } from "engine/Engine";

export type ToolType<T extends Tool> = new (scene: Scene, name?: string) => T;

export abstract class Tool
{
	public readonly name: string;
	public readonly scene: Scene;

	constructor(scene: Scene, name?: string)
	{
		this.name = name || this.constructor.name;
		this.scene = scene;
	}

	public readonly update = () => Engine.render();

	public onMouseMove(position: Vector) { }
	public onMouseDown(position: Vector, button: number) { }
	public onMouseUp(position: Vector, button: number) { }
	public onKeyUp(e: KeyboardEvent) { }
	public onKeyDown(e: KeyboardEvent) { }
	public onBlur(): any { }
	public onNextTool(tool: ToolType<any>): void {}
}