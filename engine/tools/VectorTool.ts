import { Tool } from "./Tool";
import { Vector } from "engine/Vector";
import { Entity } from "engine/objects";
import { VectorRenderer } from "engine/components";
import { Renderer } from "engine/modules";

export class VectorTool extends Tool
{
	onMouseDown(pos: Vector, btn: number)
	{
		const point = new Entity("Vector Entity");
		point.transform.position = Renderer.screenToCanvas(pos);
		point.addComponent(VectorRenderer);
		this.scene.add(point);
	}
}