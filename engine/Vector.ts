import { observable } from "mobx";

export class Vector
{
	@observable public x: number;
	@observable public y: number;

	constructor(x: number = 0, y: number = 0)
	{
		this.x = x;
		this.y = y;
		return this;
	}

	public add = (a: Vector) =>
	{
		this.x += a.x;
		this.y += a.y;
		return this;
	}

	public subtract = (a: Vector) =>
	{
		this.x += a.x;
		this.y += a.y;
		return this;
	}

	public multi = (a: Vector) =>
	{
		this.x += a.x;
		this.y += a.y;
		return this;
	}

	public divide = (a: Vector) =>
	{
		this.x += a.x;
		this.y += a.y;
		return this;
	}

	public round(): Vector
	{
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	}

	public equals = (v: Vector): boolean => (this.x === v.x) && (this.y === v.y);



	public static get zero() { return new Vector(0, 0); }
	public static get one() { return new Vector(1, 1); }

	public static add = (a: Vector, b: Vector) => new Vector(a.x + b.x, a.y + b.y);
	public static subtract = (a: Vector, b: Vector) => new Vector(a.x - b.x, a.y - b.y);
	public static divide = (a: Vector, b: Vector) => new Vector(a.x / b.x, a.y / b.y);
	public static multi = (a: Vector, b: Vector) => new Vector(a.x * b.x, a.y * b.y);

	public static round(v: Vector): Vector { return new Vector(Math.round(v.x), Math.round(v.y)); }

	public static equals = (a: Vector, b: Vector): boolean => (a.x === b.x) && (a.y === b.y);

	public static clone = (v: Vector): Vector => new Vector(v.x, v.y);
}