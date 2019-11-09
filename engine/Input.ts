import { Vector } from "./Vector";
import { Engine } from "./Engine";

export class Input
{
	private static isInitialized: boolean;

	public static init = () =>
	{
		if (Input.isInitialized)
			return;

		window.addEventListener('blur', Input.clearInput);
		window.addEventListener("mousemove", Input.onMouseMove);
		window.addEventListener("mousedown", Input.onMouseDown);
		window.addEventListener("mouseup", Input.onMouseUp);
		window.addEventListener("keydown", Input.onKeyDown);
		window.addEventListener("keyup", Input.onKeyUp);

		Input.isInitialized = true;
	}

	private static _mousePosition: Vector = Vector.zero;

	public static get mousePosition()
	{
		return Vector.clone(Input._mousePosition);
	}


	private static mouseButtonsDown: ObjectMap<boolean> = {};

	public static isMouseDown = (button: number = 1) =>
	{
		return Input.mouseButtonsDown[button] || false;
	}

	private static _keysDown: string[] = [];

	public static isKeyDown = (key: string): boolean =>
	{
		return Input._keysDown.includes(key.toLowerCase());
	}

	private static readonly clearInput = () =>
	{
		Input._mousePosition = Vector.zero;
		for (const b in Input.mouseButtonsDown)
			Input.mouseButtonsDown[b] = false;
		Input._keysDown = []
	}

	private static readonly onMouseMove = (e: MouseEvent) =>
	{
		if (!(e as any).path.includes(Engine.instance.renderer.canvas))
			return;
		Input._mousePosition = new Vector(e.offsetX, e.offsetY);
	}

	private static readonly onMouseDown = (e: MouseEvent) =>
	{
		Input.mouseButtonsDown[e.which] = true;
	}

	private static readonly onMouseUp = (e: MouseEvent) =>
	{
		Input.mouseButtonsDown[e.which] = false;
	}

	private static readonly onKeyDown = (e: KeyboardEvent) =>
	{
		if (!Input._keysDown.includes(e.key.toLowerCase()))
			Input._keysDown.push(e.key.toLowerCase());
	}

	private static readonly onKeyUp = (e: KeyboardEvent) =>
	{
		while (Input._keysDown.includes(e.key.toLowerCase()))
		{
			const index = Input._keysDown.indexOf(e.key.toLowerCase());
			Input._keysDown.splice(index, 1);
		}
	}
}