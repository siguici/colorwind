export function isString(str: unknown): str is string {
	return typeof str === "string" || str instanceof String;
}

export function isArray<T = unknown>(
	arr: unknown,
	filter?: (value: unknown, index: number) => boolean,
): arr is T[] {
	return Array.isArray(arr) && (filter ? arr.every(filter) : true);
}

export function isObject<K extends string | number | symbol, V = unknown>(
	obj: unknown,
	keyFilter?: (key: K) => boolean,
	valueFilter?: (value: V) => boolean,
): obj is Record<K, V> {
	return (
		obj !== null &&
		typeof obj === "object" &&
		!isArray(obj) &&
		!(obj instanceof RegExp) &&
		(keyFilter ? (Object.keys(obj) as K[]).every(keyFilter) : true) &&
		(valueFilter ? Object.values(obj).every(valueFilter) : true)
	);
}
