import { observable, action } from "mobx";
import { keyListener } from "../KeyListener";

class AppStore
{
	@observable isFullscreen: boolean = false;

	constructor()
	{
		keyListener.register("alt+t", this.toggleFullScreen);
	}

	@action toggleFullScreen = () => {
		this.isFullscreen = !this.isFullscreen;
	}

}

export const appStore = new AppStore();