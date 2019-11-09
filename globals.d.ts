declare type ObjectMap<T = any> = { [key: string]: T };
declare type Transform<T, Type> = { [P in keyof T]: Type };
declare type Nullable<T> = T | null;
declare type NullableMap<T> = { [P in keyof T]: T[P] | null };

declare type ReactProps<T extends HTMLElement> = Omit<React.DetailedHTMLProps<React.HTMLAttributes<T>, T>, "ref">;

declare type C2D = CanvasRenderingContext2D;

declare module '*.scss' {
	const style: string;
	export = style;
}