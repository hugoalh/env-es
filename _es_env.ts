import { env } from "node:process";
const invalidEnvKeyCharsCode: readonly number[] = [/* UNIQUE */ "=", "\0"].map((c: string): number => {
	return c.charCodeAt(0);
});
const invalidEnvValueCharsCode: readonly number[] = [/* UNIQUE */ "\0"].map((c: string): number => {
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
export function deleteEnv(key: string): void {
	//@ts-ignore `Deno` maybe not exist.
	if (typeof globalThis.Deno !== "undefined") {
		//@ts-ignore `Deno` maybe not exist.
		return Deno.env.delete(key);
	}
	assertEnvKey(key);
	delete env[key];
}
export function getEnv(key: string): string | undefined {
	//@ts-ignore `Deno` maybe not exist.
	if (typeof globalThis.Deno !== "undefined") {
		//@ts-ignore `Deno` maybe not exist.
		return Deno.env.get(key);
	}
	assertEnvKey(key);
	return env[key];
}
export function getAllEnv(): Record<string, string | undefined> {
	//@ts-ignore `Deno` maybe not exist.
	if (typeof globalThis.Deno !== "undefined") {
		//@ts-ignore `Deno` maybe not exist.
		return Deno.env.toObject();
	}
	return structuredClone(env);
}
export function hasEnv(key: string): boolean {
	//@ts-ignore `Deno` maybe not exist.
	if (typeof globalThis.Deno !== "undefined") {
		//@ts-ignore `Deno` maybe not exist.
		return Deno.env.has(key);
	}
	assertEnvKey(key);
	return (typeof env[key] !== "undefined");
}
export function setEnv(key: string, value: string): void {
	//@ts-ignore `Deno` maybe not exist.
	if (typeof globalThis.Deno !== "undefined") {
		//@ts-ignore `Deno` maybe not exist.
		return Deno.env.set(key, value);
	}
	assertEnvKey(key);
	assertEnvValue(value);
	env[key] = value;
}
