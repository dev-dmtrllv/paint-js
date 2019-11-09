export const toSnakeCase = (str: string, delimiter: string = "-"): string => str.split("").map((l, i) => 
{
	if (i !== 0 && l === l.toUpperCase())
		return `-${l}`;
	return l;
}).join("").toLowerCase();

export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1, str.length).toLowerCase();