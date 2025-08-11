import {
	delimiter as envDelimiter,
	isAbsolute as isPathAbsolute
} from "node:path";
import { systemName } from "https://raw.githubusercontent.com/hugoalh/runtime-info-es/v0.2.0/mod.ts";
/**
 * Environment variables general interface.
 */
export interface EnvGeneral {
	/**
	 * Delete an environment variable.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - *Resources*
	 * @param {string} key Key of the environment variable.
	 * @returns {void}
	 */
	delete(key: string): void;
	/**
	 * Get the value of an environment variable.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - *Resources*
	 * @param {string} key Key of the environment variable.
	 * @returns {string | undefined} Value of the environment variable.
	 */
	get(key: string): string | undefined;
	/**
	 * Get a snapshot of the environment variables at invocation as a simple object of keys and values.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - *Resources*
	 * @returns {Record<string, string>} A snapshot of the environment variables.
	 */
	getAll(): Record<string, string>;
	/**
	 * Check whether an environment variable is present.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - *Resources*
	 * @param {string} key Key of the environment variable.
	 * @returns {boolean} Determine result.
	 */
	has(key: string): boolean;
	/**
	 * Set an environment variable.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - *Resources*
	 * @param {string} key Key of the environment variable.
	 * @param {string} value Value of the environment variable.
	 * @returns {void}
	 */
	set(key: string, value: string): void;
}
/**
 * Environment variables value delimitation interface.
 */
export interface EnvDelimitation {
	/**
	 * Get the value of an environment variable with inter-handle delimiter.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - *Resources*
	 * @param {string} key Key of the environment variable.
	 * @returns {string[]} Values of the environment variable.
	 */
	get(key: string): string[];
	/**
	 * Set the value of an environment variable with inter-handle delimiter.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - *Resources*
	 * @param {string} key Key of the environment variable.
	 * @param {readonly string[]} values Values of the environment variable.
	 * @returns {void}
	 */
	set(key: string, values: readonly string[]): void;
}
/**
 * Environment variable `PATH` interface.
 */
export interface EnvPath {
	/**
	 * Add value to the environment variable `PATH`.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - `PATH`
	 * @param {...string} values Value that need to add to the environment variable `PATH`.
	 * @returns {void}
	 */
	add(...values: readonly string[]): void;
	/**
	 * Delete value from the environment variable `PATH`.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - `PATH`
	 * @param {...string} values Value that need to delete from the environment variable `PATH`.
	 * @returns {void}
	 */
	delete(...values: readonly string[]): void;
	/**
	 * Get the values of the environment variable `PATH`.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * - **Environment Variable (Deno: `env`):**
	 * >   - `PATH`
	 * @returns {string[]} Values of the environment variable `PATH`.
	 */
	get(): string[];
}
/**
 * Environment variable `PATHEXT` interface.
 */
export interface EnvPathExt {
	/**
	 * Add value to the environment variable `PATHEXT`.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - `PATHEXT` (Windows Platforms)
	 * @param {...string} values Value that need to add to the environment variable `PATHEXT`.
	 * @returns {void}
	 */
	add(...values: readonly string[]): void;
	/**
	 * Delete value from the environment variable `PATHEXT`.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - `PATHEXT` (Windows Platforms)
	 * @param {...string} values Value that need to delete from the environment variable `PATHEXT`.
	 * @returns {void}
	 */
	delete(...values: readonly string[]): void;
	/**
	 * Get the values of the environment variable `PATHEXT`; Always return `null` for non Windows platforms.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - `PATHEXT` (Windows Platforms)
	 * @returns {string[] | null} Values of the environment variable `PATHEXT`.
	 */
	get(): string[] | null;
}
/**
 * Environment variables interface.
 */
export interface Env extends EnvGeneral {
	/**
	 * Environment variables value delimitation interface.
	 */
	delimitation: EnvDelimitation;
	/**
	 * Environment variable `PATH` interface.
	 */
	path: EnvPath;
	/**
	 * Environment variable `PATHEXT` interface.
	 */
	pathext: EnvPathExt;
}
const envGeneralDelete: EnvGeneral["delete"] = Deno.env.delete;
const envGeneralGet: EnvGeneral["get"] = Deno.env.get;
const envGeneralGetAll: EnvGeneral["getAll"] = Deno.env.toObject;
const envGeneralHas: EnvGeneral["has"] = Deno.env.has;
const envGeneralSet: EnvGeneral["set"] = Deno.env.set;
export const envGeneral: EnvGeneral = Object.freeze({
	delete: envGeneralDelete,
	get: envGeneralGet,
	getAll: envGeneralGetAll,
	has: envGeneralHas,
	set: envGeneralSet,
});
const envDelimitationGet: EnvDelimitation["get"] = (key: string): string[] => {
	return (envGeneralGet(key) ?? "").split(envDelimiter).filter((value: string): boolean => {
		return (value.length > 0);
	});
};
const envDelimitationSet: EnvDelimitation["set"] = (key: string, values: readonly string[]): void => {
	return envGeneralSet(key, values.filter((value: string): boolean => {
		return (value.length > 0);
	}).join(envDelimiter));
};
function assertValuesAbsolutePath(...values: string[]): void {
	values.forEach((value: string): void => {
		if (!isPathAbsolute(value)) {
			throw new SyntaxError(`\`${value}\` is not an absolute path!`);
		}
	});
}
function envDelimitationGetInternal(key: string): Set<string> {
	return new Set<string>((envDelimitationGet(key)));
}
const envPathAdd: EnvPath["add"] = (...values: readonly string[]): void => {
	assertValuesAbsolutePath(...values);
	if (values.length > 0) {
		const result: Set<string> = envDelimitationGetInternal("PATH");
		for (const value of values) {
			result.add(value);
		}
		envDelimitationSet("PATH", Array.from(result.values()));
	}
};
const envPathDelete: EnvPath["delete"] = (...values: readonly string[]): void => {
	assertValuesAbsolutePath(...values);
	if (values.length > 0) {
		const result: Set<string> = envDelimitationGetInternal("PATH");
		for (const value of values) {
			result.delete(value);
		}
		envDelimitationSet("PATH", Array.from(result.values()));
	}
};
const envPathGet: EnvPath["get"] = (): string[] => {
	return Array.from(envDelimitationGetInternal("PATH"));
};
function assertValuesFileExtension(...values: readonly string[]): void {
	values.forEach((value: string): void => {
		if (!value.startsWith(".")) {
			throw new SyntaxError(`\`${value}\` is not an valid file extension!`);
		}
	});
}
const envPathExtAdd: EnvPathExt["add"] = (...values: readonly string[]): void => {
	assertValuesFileExtension(...values);
	if (systemName === "windows" && values.length > 0) {
		const result: Set<string> = envDelimitationGetInternal("PATHEXT");
		for (const value of values) {
			result.add(value.toUpperCase());
		}
		envDelimitationSet("PATHEXT", Array.from(result.values()));
	}
};
const envPathExtDelete: EnvPathExt["delete"] = (...values: readonly string[]): void => {
	assertValuesFileExtension(...values);
	if (systemName === "windows" && values.length > 0) {
		const result: Set<string> = envDelimitationGetInternal("PATHEXT");
		for (const value of values) {
			result.delete(value.toUpperCase());
		}
		envDelimitationSet("PATHEXT", Array.from(result.values()));
	}
};
const envPathExtGet: EnvPathExt["get"] = (): string[] | null => {
	if (systemName !== "windows") {
		return null;
	}
	const result: Set<string> = envDelimitationGetInternal("PATHEXT");
	if (result.size > 0) {
		return Array.from(result.values());
	}
	return [".COM", ".EXE", ".BAT", ".CMD", ".VBS", ".VBE", ".JS", ".JSE", ".WSF", ".WSH", ".MSC"];
};
export const envDelimitation: EnvDelimitation = Object.freeze({
	get: envDelimitationGet,
	set: envDelimitationSet
});
export const envPath: EnvPath = Object.freeze({
	add: envPathAdd,
	delete: envPathDelete,
	get: envPathGet
});
export const envPathExt: EnvPathExt = Object.freeze({
	add: envPathExtAdd,
	delete: envPathExtDelete,
	get: envPathExtGet
});
export const env: Env = Object.freeze({
	...envGeneral,
	delimitation: envDelimitation,
	path: envPath,
	pathext: envPathExt
});
export default env;
