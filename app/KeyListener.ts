export const keyListener = new class
{
	public register = (keyCombi: string, action: Function) =>
	{
		this.combis.push({
			keys: keyCombi.toLowerCase().split("+"),
			action
		});
	}

	private combis: { keys: string[], action: Function }[] = [];

	private keysDown: string[] = [];

	constructor()
	{
		window.addEventListener("keydown", this.onKeyDown);
		window.addEventListener("keyup", this.onKeyUp);
	}

	private onKeyUp = (e: KeyboardEvent) =>
	{
		const k = e.key.toLowerCase();
		while (this.keysDown.includes(k))
			this.keysDown.splice(this.keysDown.indexOf(k), 1);
	}

	private onKeyDown = (e: KeyboardEvent) =>
	{
		const k = e.key.toLowerCase();
		if (!this.keysDown.includes(k))
		{
			this.keysDown.push(k.toLowerCase());
			for (const c of this.combis)
			{
				if (c.keys.length <= this.keysDown.length)
				{
					let matchesAll = true;
					for (let key of c.keys)
					{
						if (!this.keysDown.includes(key))
							matchesAll = false;
					}
					if (matchesAll)
					{
						c.action();
						return;
					}
				}
			}
		}
	}

}