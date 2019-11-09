import { Module } from "./Module";
import { Engine } from "engine/Engine";
import { Camera } from "engine/components";
import { Vector } from "engine/Vector";
import { clamp } from "utils/math";

const disableDrag = (el: HTMLElement) => 
{
	el.ondragstart = e => false;
	el.ondragend = e => false;
	el.ondragover = e => false;
	el.ondrag = e => false;
	el.ondragenter = e => false;
	el.ondragexit = e => false;
	el.ondragleave = e => false;
	// el.ondrop = e => false;
	el.draggable = false;
	el.style.userSelect = "none";
}

export class Renderer extends Module<IRendererProps>
{
	public canvas: HTMLCanvasElement;
	private ctx: C2D;

	private _zoom: number = 0.5;
	public set zoom(zoom: number) { this._zoom = clamp(zoom, 0.3, 3); }
	public get zoom(): number { return this._zoom; };

	public constructor(engine: Engine) 
	{
		super(engine);
		this.canvas = document.createElement("canvas");
		this.ctx = this.canvas.getContext("2d")!;
		window.addEventListener("resize", this.resize);
		window.addEventListener("wheel", (e: any) => 
		{
			this.zoom += (e.wheelDeltaY / 4200);
			if (this.engine.isStarted)
				this.render();
		})
	}

	public onInit(props: IRendererProps)
	{
		if (props.canvas)
			this.canvas = props.canvas;
		else
			this.canvas = document.createElement("canvas");
		disableDrag(this.canvas);
		this.zoom = props.zoom || 1;
		this.ctx = this.canvas.getContext("2d")!;


		// this.canvas.ondrop = e => 
		// {
		// console.log(e.clientX, e.clientY);
		// e.preventDefault();
		// if (e.dataTransfer)
		// {
		// const dt = e.dataTransfer;
		// Array.from(dt.items).forEach(i => console.log(i))
		// const transfers = [
		// 	dt.getData("image/jpeg"),
		// 	dt.getData("image/png"),
		// 	dt.getData("image/gif"),
		// 	dt.getData("image"),
		// 	dt.getData("text/plain"),
		// 	dt.getData("text/uri-list"),
		// ];

		// for (let t of transfers)
		// 	if (!!t)
		// 	{
		// 		const img = new Image();
		// 		img.crossOrigin = "Anonymous";
		// 		img.src = t;
		// 		img.onload = _ =>
		// 		{
		// 			const canvas = document.createElement('canvas');
		// 			const context = canvas.getContext('2d')!;
		// 			canvas.width = img.width;
		// 			canvas.height = img.height;
		// 			context.drawImage(img, 0, 0);
		// 			const imageData = context.getImageData(0, 0, img.width, img.height);
		// 			this.ctx.putImageData(imageData, e.clientX, e.clientY);
		// 		}
		// 	}


		// }
		// }
	}

	public mount(el: HTMLElement)
	{
		el.append(this.canvas);
	}

	public start = () =>
	{
		this.resize();
	}

	public resize = () =>
	{
		this.canvas.style.width = this.canvas.style.height = "100%";
		this.canvas.style.width = (this.canvas.width = this.canvas.clientWidth) + "px";
		this.canvas.style.height = (this.canvas.height = this.canvas.clientHeight) + "px";
		this.render();
	}

	public render = () =>
	{
		if (this.engine.isStarted)
		{
			const scene = this.engine.sceneManager.activeScene;
			if (scene)
			{
				this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
				this.ctx.save();

				this.ctx.transform(1, 0, 0, -1, 0, this.canvas.height)
				this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);

				this.ctx.scale(this.zoom, this.zoom);

				const { x, y } = Camera.main.transform.position;
				this.ctx.translate(x, y);


				scene.render(this.ctx);

				this.ctx.restore();
			}
		}
	}


	public static screenToCanvas = (v: Vector) =>
	{
		const { zoom, canvas } = Engine.instance.renderer;
		const camPos = Camera.main.transform.position;
		const { width, height } = canvas;

		const x = (camPos.x - (v.x - width / 2) * (1 / zoom));
		const y = (-camPos.y - (v.y - height / 2) * (1 / zoom));

		return new Vector(-x, y);
	}
}

interface IRendererProps
{
	canvas?: HTMLCanvasElement | null;
	zoom?: number;
}