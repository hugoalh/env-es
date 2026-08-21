import { env } from "node:process";
interface CompatEnv {
	delete(key: string): void;
	get(key: string): string | undefined;
	getAll(): Record<string, string | undefined>;
	has(key: string): boolean;
	set(key: string, value: string): void;
}
const invalidEnvKeyCharsCode: readonly number[] = [/* UNIQUE */
	"=",
	"\0"
].map((c: string): number => {
	return c.charCodeAt(0);
});
const invalidEnvValueCharsCode: readonly number[] = [/* UNIQUE */
	"\0"
].map((c: string): number => {
	return c.charCodeAt(0);
});
function assertEnvKey(key: string): void {
	if (key.length === 0) {
		throw new TypeError("Key is an empty string.");
	}
	for (let index: number = 0; index < key.length; index += 1) {
		if (invalidEnvKeyCharsCode.includes(key.charCodeAt(index))) {
			throw new TypeError(`Key contains invalid characters: "${key.charCodeAt(index) === "\0".charCodeAt(0) ? "\\0" : key[index]}"`);
		}
	}
}
function assertEnvValue(value: string): void {
	for (let index: number = 0; index < value.length; index += 1) {
		if (invalidEnvValueCharsCode.includes(value.charCodeAt(index))) {
			throw new TypeError(`Value contains invalid characters: "${value.charCodeAt(index) === "\0".charCodeAt(0) ? "\\0" : value[index]}"`);
		}
	}
}
const nodeDeleteEnv: CompatEnv["delete"] = function (key: string): void {
	assertEnvKey(key);
	delete env[key];
};
const nodeGetEnv: CompatEnv["get"] = function (key: string): string | undefined {
	assertEnvKey(key);
	return env[key];
};
const nodeGetAllEnv: CompatEnv["getAll"] = function (): Record<string, string | undefined> {
	return structuredClone(env);
};
const nodeHasEnv: CompatEnv["has"] = function (key: string): boolean {
	assertEnvKey(key);
	return (typeof env[key] !== "undefined");
};
const nodeSetEnv: CompatEnv["set"] = function (key: string, value: string): void {
	assertEnvKey(key);
	assertEnvValue(value);
	env[key] = value;
};
//@ts-ignore `Deno` maybe not exist.
const isDeno: boolean = typeof globalThis.Deno !== "undefined";
//@ts-ignore `Deno` maybe not exist.
export const deleteEnv: CompatEnv["delete"] = isDeno ? Deno.env.delete : nodeDeleteEnv;
//@ts-ignore `Deno` maybe not exist.
export const getEnv: CompatEnv["get"] = isDeno ? Deno.env.get : nodeGetEnv;
//@ts-ignore `Deno` maybe not exist.
export const getAllEnv: CompatEnv["getAll"] = isDeno ? Deno.env.toObject : nodeGetAllEnv;
//@ts-ignore `Deno` maybe not exist.
export const hasEnv: CompatEnv["has"] = isDeno ? Deno.env.has : nodeHasEnv;
//@ts-ignore `Deno` maybe not exist.
export const setEnv: CompatEnv["set"] = isDeno ? Deno.env.set : nodeSetEnv;
