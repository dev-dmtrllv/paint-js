import { Module } from "./Module";
import { Scene } from "engine/objects";

export class SceneManager extends Module
{
	public activeScene: Scene = new Scene("Empty Scene");

	onInit(props: ISceneManagerProps)
	{
		this.activeScene = new Scene("New Scene");
	}

	public start = () =>
	{
		this.activeScene && this.activeScene.start();
	}

	public loadScene = () =>
	{

	}

	public saveScene = () =>
	{

	}

	public newScene = () =>
	{

	}
}

interface ISceneManagerProps
{

}