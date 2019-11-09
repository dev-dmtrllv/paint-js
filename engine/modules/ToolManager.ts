import { Module } from "./Module";
import { Tool, SelectTool } from "engine/tools";
import { Scene } from "engine/objects";
import { Vector } from "engine/Vector";
import { computed, action, observable } from "mobx";

export class ToolManager extends Module<HTMLCanvasElement>
{
	onInit(canvas: HTMLCanvasElement)
	{
		const getMousePos = (x: number, y: number) => 
		{
			const viewportOffset = canvas.getBoundingClientRect();
			const top = viewportOffset.top;
			const left = viewportOffset.left;
			return new Vector(x - left, y - top);
		}

		window.addEventListener("mousemove", (e) => 
		{
			const pos = getMousePos(e.clientX, e.clientY);
			this.activeTool.onMouseMove(pos);
		});

		canvas.addEventListener("mousedown", (e) => 
		{
			const pos = getMousePos(e.clientX, e.clientY)
			this.activeTool.onMouseDown(pos, e.which);
		});

		window.addEventListener("mouseup", (e) => 
		{
			const pos = getMousePos(e.clientX, e.clientY)
			this.activeTool.onMouseUp(pos, e.which);
		});

		window.addEventListener("keydown", (e) => this.activeTool.onKeyDown(e));
		window.addEventListener("keyup", (e) => this.activeTool.onKeyUp(e));
		window.addEventListener("blur", () => this.activeTool.onBlur());
	}

	start = () =>
	{
		this.select(SelectTool);
	}

	@observable private _activeTool!: Tool;

	@computed public get activeTool() { return this._activeTool; }

	@action public select<T extends Tool>(tool: new (scene: Scene, name?: string) => T)
	{
		if(this._activeTool)
			this._activeTool.onNextTool(tool)
		this._activeTool = new tool(this.engine.sceneManager.activeScene);
	}
}