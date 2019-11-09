import { Component } from "./Component";
import { Entity } from "engine/objects";
import { Vector } from "engine/Vector";
import { Engine } from "engine/Engine";
import { Renderer } from "engine/modules";

const getMousePos = (x: number, y: number) => 
{
	const viewportOffset = Engine.instance.renderer.canvas.getBoundingClientRect();
	const top = viewportOffset.top;
	const left = viewportOffset.left;
	return new Vector(x - left, y - top);
}

export class Camera extends Component
{
	public static main: Camera;
	isMouseDown: boolean = false;
	mousePos: Vector | null = null;
	renderer!: Renderer;

	constructor(entity: Entity)
	{
		super(entity);
		Camera.main = this;
	}

	start = () =>
	{
		this.renderer = Engine.instance.renderer;

		window.addEventListener("mousedown", (e) =>
		{
			if (e.which === 2)
			{
				this.mousePos = getMousePos(e.clientX, e.clientY);
				this.isMouseDown = true;
			}
		});

		window.addEventListener("mouseup", (e) =>
		{
			if (e.which === 2)
				this.isMouseDown = false;
		});

		window.addEventListener("mousemove", (e) =>
		{
			if (this.isMouseDown && this.mousePos)
			{
				const pos = getMousePos(e.clientX, e.clientY);
				const dis = Vector.divide(Vector.subtract(pos, this.mousePos), new Vector(this.renderer.zoom, -this.renderer.zoom));
				const { x, y } = dis;
				this.mousePos = pos;
				this.transform.position.add(dis);
				Engine.render();
			}
		});
		
	}
}