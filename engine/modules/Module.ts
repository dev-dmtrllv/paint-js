import { Engine } from "engine/Engine";
import { _Object } from "engine/objects";

export class Module<P = {}>
{
	public readonly engine: Engine;

	private isInitialized: boolean = false;

	constructor(engine: Engine)
	{
		this.engine = engine;
	}

	public init(props: P)
	{
		if (!this.isInitialized)
		{
			this.onInit(props);
			this.isInitialized = true;
		}
	}

	protected onInit(props: P) { }

	public start(): void { };
}