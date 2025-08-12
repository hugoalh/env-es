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
	 * Delete the environment variable.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - *Resources*
	 * @param {...string | RegExp} keys Key of the environment variables. Use `string` for exact match, or use `RegExp` for pattern match.
	 * @returns {void}
	 */
	delete(...keys: readonly (string | RegExp)[]): void;
	/**
	 * Get the value of the environment variable.
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
	 * Check whether the environment variable is present.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - *Resources*
	 * @param {string | RegExp} key Key of the environment variable. Use `string` for exact match, or use `RegExp` for pattern match.
	 * @returns {boolean} Determine result.
	 */
	has(key: string | RegExp): boolean;
	/**
	 * Set the environment variable.
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
	 * Add the value to the environment variable at the end of the list with inter-handle delimiter.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - *Resources*
	 * @param {string} key Key of the environment variable.
	 * @param {...string} values Values that need to add.
	 * @returns {void}
	 */
	add(key: string, ...values: readonly string[]): void;
	/**
	 * Add the value to the environment variable at the end of the list with inter-handle delimiter.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - *Resources*
	 * @param {string} key Key of the environment variable.
	 * @param {...string} values Values that need to add.
	 * @returns {void}
	 */
	addAtEnd(key: string, ...values: readonly string[]): void;
	/**
	 * Add the value to the environment variable at the specify index of the list with inter-handle delimiter.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - *Resources*
	 * @param {string} key Key of the environment variable.
	 * @param {number} index Index of the list.
	 * @param {...string} values Values that need to add.
	 * @returns {void}
	 */
	addAtIndex(key: string, index: number, ...values: readonly string[]): void;
	/**
	 * Add the value to the environment variable at the start of the list with inter-handle delimiter.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - *Resources*
	 * @param {string} key Key of the environment variable.
	 * @param {...string} values Values that need to add.
	 * @returns {void}
	 */
	addAtStart(key: string, ...values: readonly string[]): void;
	/**
	 * De-duplicate the values of the environment variable with inter-handle delimiter.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - *Resources*
	 * @param {string} key Key of the environment variable.
	 * @returns {void}
	 */
	deDuplicate(key: string): void;
	/**
	 * Delete the value from the environment variable with inter-handle delimiter.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - *Resources*
	 * @param {string} key Key of the environment variable.
	 * @param {...string} values Values that need to delete.
	 * @returns {void}
	 */
	delete(key: string, ...values: readonly string[]): void;
	/**
	 * Get the values of the environment variable with inter-handle delimiter.
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
	 * Set the values of the environment variable with inter-handle delimiter.
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
	 * Add the value to the environment variable `PATH` at the end of the list.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - `PATH`
	 * @param {...string} values Values that need to add.
	 * @returns {void}
	 */
	add(...values: readonly string[]): void;
	/**
	 * Add the value to the environment variable `PATH` at the end of the list.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - `PATH`
	 * @param {...string} values Values that need to add.
	 * @returns {void}
	 */
	addAtEnd(...values: readonly string[]): void;
	/**
	 * Add the value to the environment variable `PATH` at the specify index of the list.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - `PATH`
	 * @param {number} index Index of the list.
	 * @param {...string} values Values that need to add.
	 * @returns {void}
	 */
	addAtIndex(index: number, ...values: readonly string[]): void;
	/**
	 * Add the value to the environment variable `PATH` at the start of the list.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - `PATH`
	 * @param {...string} values Values that need to add.
	 * @returns {void}
	 */
	addAtStart(...values: readonly string[]): void;
	/**
	 * De-duplicate the values in the environment variable `PATH`.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - `PATH`
	 * @returns {void}
	 */
	deDuplicate(): void;
	/**
	 * Delete the value from the environment variable `PATH`.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - `PATH`
	 * @param {...string} values Values that need to delete.
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
	 * @returns {string[]}
	 */
	get(): string[];
}
/**
 * Environment variable `PATHEXT` interface.
 */
export interface EnvPathExt {
	/**
	 * Add the value to the environment variable `PATHEXT`; Always ignore for non Windows platforms.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - `PATHEXT` (Windows Platforms)
	 * @param {...string} values Values that need to add.
	 * @returns {void}
	 */
	add(...values: readonly string[]): void;
	/**
	 * Add the value to the environment variable `PATHEXT` at the end of the list; Always ignore for non Windows platforms.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - `PATHEXT` (Windows Platforms)
	 * @param {...string} values Values that need to add.
	 * @returns {void}
	 */
	addAtEnd(...values: readonly string[]): void;
	/**
	 * Add the value to the environment variable `PATHEXT` at the specify index of the list; Always ignore for non Windows platforms.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - `PATHEXT` (Windows Platforms)
	 * @param {number} index Index of the list.
	 * @param {...string} values Values that need to add.
	 * @returns {void}
	 */
	addAtIndex(index: number, ...values: readonly string[]): void;
	/**
	 * Add the value to the environment variable `PATHEXT` at the start of the list; Always ignore for non Windows platforms.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - `PATHEXT` (Windows Platforms)
	 * @param {...string} values Values that need to add.
	 * @returns {void}
	 */
	addAtStart(...values: readonly string[]): void;
	/**
	 * De-duplicate the values in the environment variable `PATHEXT`; Always ignore for non Windows platforms.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - `PATHEXT` (Windows Platforms)
	 * @returns {void}
	 */
	deDuplicate(): void;
	/**
	 * Delete the value from the environment variable `PATHEXT`; Always ignore for non Windows platforms.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - `PATHEXT` (Windows Platforms)
	 * @param {...string} values Values that need to delete.
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
	 * @returns {string[] | null}
	 */
	get(): string[] | null;
	/**
	 * Reset the values of the environment variable `PATHEXT` to the default; Always ignore for non Windows platforms.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - **Environment Variable (Deno: `env`):**
	 * >   - `PATHEXT` (Windows Platforms)
	 * @returns {void}
	 */
	reset(): void;
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
const envGeneralDelete: EnvGeneral["delete"] = (...keys: readonly (string | RegExp)[]): void => {
	for (const key of keys.filter((key: string | RegExp): key is string => {
		return !(key instanceof RegExp);
	})) {
		Deno.env.delete(key);
	}
	const keysRegExp: readonly RegExp[] = keys.filter((key: string | RegExp): key is RegExp => {
		return (key instanceof RegExp);
	});
	if (keysRegExp.length > 0) {
		const result: Set<string> = new Set<string>();
		for (const envKey of Object.keys(envGeneralGetAll())) {
			for (const keyRegExp of keysRegExp) {
				if (keyRegExp.test(envKey)) {
					result.add(envKey);
					break;
				}
			}
		}
		for (const key of result.values()) {
			Deno.env.delete(key);
		}
	}
};
const envGeneralGet: EnvGeneral["get"] = Deno.env.get;
const envGeneralGetAll: EnvGeneral["getAll"] = Deno.env.toObject;
const envGeneralHas: EnvGeneral["has"] = (key: string | RegExp): boolean => {
	if (key instanceof RegExp) {
		for (const envKey of Object.keys(envGeneralGetAll())) {
			if (key.test(envKey)) {
				return true;
			}
		}
		return false;
	}
	return Deno.env.has(key);
};
const envGeneralSet: EnvGeneral["set"] = Deno.env.set;
export const envGeneral: EnvGeneral = Object.freeze({
	delete: envGeneralDelete,
	get: envGeneralGet,
	getAll: envGeneralGetAll,
	has: envGeneralHas,
	set: envGeneralSet
});
function deDuplicate(inputs: readonly string[]): string[] {
	return Array.from(new Set<string>(inputs));
}
const envDelimitationAddAtEnd: EnvDelimitation["addAtEnd"] = (key: string, ...values: readonly string[]): void => {
	if (values.length > 0) {
		const result: string[] = envDelimitationGet(key);
		result.push(...values);
		envDelimitationSet(key, deDuplicate(result));
	}
};
const envDelimitationAddAtIndex: EnvDelimitation["addAtIndex"] = (key: string, index: number, ...values: readonly string[]): void => {
	if (values.length > 0) {
		const result: string[] = envDelimitationGet(key);
		result.splice(index, 0, ...values);
		envDelimitationSet(key, deDuplicate(result));
	}
};
const envDelimitationAddAtStart: EnvDelimitation["addAtStart"] = (key: string, ...values: readonly string[]): void => {
	if (values.length > 0) {
		const result: string[] = envDelimitationGet(key);
		result.unshift(...values);
		envDelimitationSet(key, deDuplicate(result));
	}
};
const envDelimitationAdd: EnvDelimitation["add"] = envDelimitationAddAtEnd;
const envDelimitationDeDuplicate: EnvDelimitation["deDuplicate"] = (key: string): void => {
	const original: readonly string[] = envDelimitationGet(key);
	const result: readonly string[] = deDuplicate(original);
	if (result.length < original.length) {
		envDelimitationSet(key, result);
	}
};
const envDelimitationDelete: EnvDelimitation["delete"] = (key: string, ...values: readonly string[]): void => {
	if (values.length > 0) {
		const result: readonly string[] = deDuplicate(envDelimitationGet(key)).filter((value: string): boolean => {
			return !values.includes(value);
		});
		envDelimitationSet(key, result);
	}
};
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
const envPathAddAtEnd: EnvPath["addAtEnd"] = (...values: readonly string[]): void => {
	assertValuesAbsolutePath(...values);
	envDelimitationAddAtEnd("PATH", ...values);
};
const envPathAddAtIndex: EnvPath["addAtIndex"] = (index: number, ...values: readonly string[]): void => {
	assertValuesAbsolutePath(...values);
	envDelimitationAddAtIndex("PATH", index, ...values);
};
const envPathAddAtStart: EnvPath["addAtStart"] = (...values: readonly string[]): void => {
	assertValuesAbsolutePath(...values);
	envDelimitationAddAtStart("PATH", ...values);
};
const envPathAdd: EnvPath["add"] = envPathAddAtEnd;
const envPathDeDuplicate: EnvPath["deDuplicate"] = (): void => {
	envDelimitationDeDuplicate("PATH");
};
const envPathDelete: EnvPath["delete"] = (...values: readonly string[]): void => {
	assertValuesAbsolutePath(...values);
	envDelimitationDelete("PATH", ...values);
};
const envPathGet: EnvPath["get"] = (): string[] => {
	return deDuplicate(envDelimitationGet("PATH"));
};
function assertValuesFileExtension(...values: readonly string[]): void {
	values.forEach((value: string): void => {
		if (!value.startsWith(".")) {
			throw new SyntaxError(`\`${value}\` is not an valid file extension!`);
		}
	});
}
const envPathExtAddAtEnd: EnvPathExt["addAtEnd"] = (...values: readonly string[]): void => {
	assertValuesFileExtension(...values);
	if (systemName === "windows") {
		envDelimitationAddAtEnd("PATHEXT", ...values.map((value: string): string => {
			return value.toUpperCase();
		}));
	}
};
const envPathExtAddAtIndex: EnvPathExt["addAtIndex"] = (index: number, ...values: readonly string[]): void => {
	assertValuesFileExtension(...values);
	if (systemName === "windows") {
		envDelimitationAddAtIndex("PATHEXT", index, ...values.map((value: string): string => {
			return value.toUpperCase();
		}));
	}
};
const envPathExtAddAtStart: EnvPathExt["addAtStart"] = (...values: readonly string[]): void => {
	assertValuesFileExtension(...values);
	if (systemName === "windows") {
		envDelimitationAddAtStart("PATHEXT", ...values.map((value: string): string => {
			return value.toUpperCase();
		}));
	}
};
const envPathExtAdd: EnvPathExt["add"] = envPathExtAddAtEnd;
const envPathExtDeDuplicate: EnvPathExt["deDuplicate"] = (): void => {
	if (systemName === "windows") {
		envDelimitationDeDuplicate("PATHEXT");
	}
};
const envPathExtDelete: EnvPathExt["delete"] = (...values: readonly string[]): void => {
	assertValuesFileExtension(...values);
	if (systemName === "windows" && values.length > 0) {
		envDelimitationDelete("PATHEXT", ...values.map((value: string): string => {
			return value.toUpperCase();
		}));
	}
};
const envPathExtGet: EnvPathExt["get"] = (): string[] | null => {
	if (systemName !== "windows") {
		return null;
	}
	return envDelimitationGet("PATHEXT");
};
const envPathExtReset: EnvPathExt["reset"] = (): void => {
	envDelimitationSet("PATHEXT", [".COM", ".EXE", ".BAT", ".CMD", ".VBS", ".VBE", ".JS", ".JSE", ".WSF", ".WSH", ".MSC"]);
};
export const envDelimitation: EnvDelimitation = Object.freeze({
	add: envDelimitationAdd,
	addAtEnd: envDelimitationAddAtEnd,
	addAtIndex: envDelimitationAddAtIndex,
	addAtStart: envDelimitationAddAtStart,
	deDuplicate: envDelimitationDeDuplicate,
	delete: envDelimitationDelete,
	get: envDelimitationGet,
	set: envDelimitationSet
});
export const envPath: EnvPath = Object.freeze({
	add: envPathAdd,
	addAtEnd: envPathAddAtEnd,
	addAtIndex: envPathAddAtIndex,
	addAtStart: envPathAddAtStart,
	deDuplicate: envPathDeDuplicate,
	delete: envPathDelete,
	get: envPathGet
});
export const envPathExt: EnvPathExt = Object.freeze({
	add: envPathExtAdd,
	addAtEnd: envPathExtAddAtEnd,
	addAtIndex: envPathExtAddAtIndex,
	addAtStart: envPathExtAddAtStart,
	deDuplicate: envPathExtDeDuplicate,
	delete: envPathExtDelete,
	get: envPathExtGet,
	reset: envPathExtReset
});
export const env: Env = Object.freeze({
	...envGeneral,
	delimitation: envDelimitation,
	path: envPath,
	pathext: envPathExt
});
export default env;
