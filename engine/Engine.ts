import { Renderer, SceneManager } from "./modules";
import { Input } from "./Input";
import { ToolManager } from "./modules/ToolManager";

export class Engine
{
	public static readonly instance = new Engine();

	public static render = () => Engine.instance.renderer.render();

	private _isStarted: boolean = false;
	public get isStarted() { return this._isStarted; }

	public readonly renderer: Renderer;
	public readonly sceneManager: SceneManager;
	public readonly toolManager: ToolManager;

	private constructor() 
	{
		this.renderer = new Renderer(this);
		this.sceneManager = new SceneManager(this);
		this.toolManager = new ToolManager(this);
	}

	public init = ({ canvas }: IEngineProps) =>
	{
		Input.init();
		this.renderer.init({ canvas });
		this.sceneManager.init({});
		this.toolManager.init(canvas);	
	}

	public start = () =>
	{
		if (!this.isStarted)
		{
			this.renderer.start();
			this.sceneManager.start();
			this.toolManager.start();
			this._isStarted = true;
			this.renderer.render();
		}
	}

	public stop = () =>
	{
		if (this.isStarted)
			this._isStarted = false;
	}
};

interface IEngineProps
{
	canvas: HTMLCanvasElement;
}