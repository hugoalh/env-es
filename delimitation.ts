import { delimiter } from "node:path";
import {
	getEnv,
	setEnv
} from "./general.ts";
/**
 * De-duplicate the values of the environment variable with inter-handle delimiter.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * @param {string} key Key of the environment variable.
 * @returns {void}
 */
export function deDuplicateEnvDelimitation(key: string): void {
	const original: readonly string[] = getEnvDelimitation(key);
	const result: readonly string[] = Array.from(new Set<string>(original));
	if (result.length < original.length) {
		return setEnvDelimitation(key, result);
	}
}
/**
 * De-duplicate the values of the environment variable with inter-handle delimiter, and ignore error.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * @param {string} key Key of the environment variable.
 * @returns {void}
 */
export function deDuplicateEnvDelimitationSafe(key: string): void {
	try {
		return deDuplicateEnvDelimitation(key);
	} catch {
		return;
	}
}
/**
 * Delete the value from the environment variable with inter-handle delimiter.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * @param {string} key Key of the environment variable.
 * @param {...(string | RegExp)} values Values that need to delete. Use `string` for exact match, or use `RegExp` for pattern match.
 * @returns {void}
 */
export function deleteEnvDelimitation(key: string, ...values: readonly (string | RegExp)[]): void {
	if (values.length > 0) {
		const original: readonly string[] = getEnvDelimitation(key);
		const result: readonly string[] = original.filter((element: string): boolean => {
			return !values.some((value: string | RegExp): boolean => {
				return ((value instanceof RegExp) ? value.test(element) : (value === element));
			});
		});
		if (result.length < original.length) {
			return setEnvDelimitation(key, result);
		}
	}
}
/**
 * Delete the value from the environment variable with inter-handle delimiter, and ignore runtime permission error.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * @param {string} key Key of the environment variable.
 * @param {...(string | RegExp)} values Values that need to delete. Use `string` for exact match, or use `RegExp` for pattern match.
 * @returns {void}
 */
export function deleteEnvDelimitationSafe(key: string, ...values: readonly (string | RegExp)[]): void {
	try {
		return deleteEnvDelimitation(key, ...values);
	} catch (error) {
		if (error instanceof Deno.errors.NotCapable) {
			return;
		}
		throw error;
	}
}
/**
 * Get the values of the environment variable with inter-handle delimiter.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * @param {string} key Key of the environment variable.
 * @returns {string[]} Values of the environment variable.
 */
export function getEnvDelimitation(key: string): string[] {
	return (getEnv(key) ?? "").split(delimiter).filter((value: string): boolean => {
		return (value.length > 0);
	});
}
/**
 * Get the values of the environment variable with inter-handle delimiter, and ignore runtime permission error.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * @param {string} key Key of the environment variable.
 * @returns {string[]} Values of the environment variable.
 */
export function getEnvDelimitationSafe(key: string): string[] {
	try {
		return getEnvDelimitation(key);
	} catch (error) {
		if (error instanceof Deno.errors.NotCapable) {
			return [];
		}
		throw error;
	}
}
/**
 * Add the value to the environment variable at the specify index of the list with inter-handle delimiter.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * @param {string} key Key of the environment variable.
 * @param {number} index Index of the list.
 * @param {...string} values Values that need to add.
 * @returns {void}
 */
export function insertEnvDelimitation(key: string, index: number, ...values: readonly string[]): void {
	if (values.length > 0) {
		const result: string[] = getEnvDelimitation(key);
		result.splice(Math.min(result.length, index), 0, ...values);
		setEnvDelimitation(key, result);
	}
}
/**
 * Add the value to the environment variable at the specify index of the list with inter-handle delimiter, and ignore runtime permission error.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * @param {string} key Key of the environment variable.
 * @param {number} index Index of the list.
 * @param {...string} values Values that need to add.
 * @returns {void}
 */
export function insertEnvDelimitationSafe(key: string, index: number, ...values: readonly string[]): void {
	try {
		return insertEnvDelimitation(key, index, ...values);
	} catch (error) {
		if (error instanceof Deno.errors.NotCapable) {
			return;
		}
		throw error;
	}
}
/**
 * Add the value to the environment variable at the end of the list with inter-handle delimiter.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * @param {string} key Key of the environment variable.
 * @param {...string} values Values that need to add.
 * @returns {void}
 */
export function pushEnvDelimitation(key: string, ...values: readonly string[]): void {
	if (values.length > 0) {
		return setEnvDelimitation(key, [...getEnvDelimitation(key), ...values]);
	}
}
/**
 * Add the value to the environment variable at the end of the list with inter-handle delimiter, and ignore runtime permission error.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * @param {string} key Key of the environment variable.
 * @param {...string} values Values that need to add.
 * @returns {void}
 */
export function pushEnvDelimitationSafe(key: string, ...values: readonly string[]): void {
	try {
		return pushEnvDelimitation(key, ...values);
	} catch (error) {
		if (error instanceof Deno.errors.NotCapable) {
			return;
		}
		throw error;
	}
}
/**
 * Set the values of the environment variable with inter-handle delimiter.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * @param {string} key Key of the environment variable.
 * @param {readonly string[]} values Values of the environment variable.
 * @returns {void}
 */
export function setEnvDelimitation(key: string, values: readonly string[]): void {
	return setEnv(key, values.filter((value: string): boolean => {
		return (value.length > 0);
	}).join(delimiter));
}
/**
 * Set the values of the environment variable with inter-handle delimiter, and ignore runtime permission error.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * @param {string} key Key of the environment variable.
 * @param {readonly string[]} values Values of the environment variable.
 * @returns {void}
 */
export function setEnvDelimitationSafe(key: string, values: readonly string[]): void {
	try {
		return setEnvDelimitation(key, values);
	} catch (error) {
		if (error instanceof Deno.errors.NotCapable) {
			return;
		}
		throw error;
	}
}
/**
 * Add the value to the environment variable at the start of the list with inter-handle delimiter.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * @param {string} key Key of the environment variable.
 * @param {...string} values Values that need to add.
 * @returns {void}
 */
export function unshiftEnvDelimitation(key: string, ...values: readonly string[]): void {
	if (values.length > 0) {
		return setEnvDelimitation(key, [...values, ...getEnvDelimitation(key)]);
	}
}
/**
 * Add the value to the environment variable at the start of the list with inter-handle delimiter, and ignore runtime permission error.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * @param {string} key Key of the environment variable.
 * @param {...string} values Values that need to add.
 * @returns {void}
 */
export function unshiftEnvDelimitationSafe(key: string, ...values: readonly string[]): void {
	try {
		return unshiftEnvDelimitation(key, ...values);
	} catch (error) {
		if (error instanceof Deno.errors.NotCapable) {
			return;
		}
		throw error;
	}
}
