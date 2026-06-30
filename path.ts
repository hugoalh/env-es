import {
	deDuplicateEnvDelimitation,
	deleteEnvDelimitation,
	getEnvDelimitation,
	insertEnvDelimitation,
	pushEnvDelimitation,
	unshiftEnvDelimitation
} from "./delimitation.ts";
/**
 * De-duplicate the values in the environment variable `PATH`.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATH`
 * @returns {void}
 */
export function deDuplicateEnvPath(): void {
	return deDuplicateEnvDelimitation("PATH");
}
/**
 * De-duplicate the values in the environment variable `PATH`, and ignore error.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATH`
 * @returns {void}
 */
export function deDuplicateEnvPathSafe(): void {
	try {
		return deDuplicateEnvPath();
	} catch {
		return;
	}
}
/**
 * Delete the value from the environment variable `PATH`.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATH`
 * @param {...(string | RegExp)} values Values that need to delete. Use `string` for exact match, or use `RegExp` for pattern match.
 * @returns {void}
 */
export function deleteEnvPath(...values: readonly (string | RegExp)[]): void {
	return deleteEnvDelimitation("PATH", ...values);
}
/**
 * Delete the value from the environment variable `PATH`, and ignore runtime permission error.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATH`
 * @param {...(string | RegExp)} values Values that need to delete. Use `string` for exact match, or use `RegExp` for pattern match.
 * @returns {void}
 */
export function deleteEnvPathSafe(...values: readonly (string | RegExp)[]): void {
	try {
		return deleteEnvPath(...values);
	} catch (error) {
		if (error instanceof Deno.errors.NotCapable) {
			return;
		}
		throw error;
	}
}
/**
 * Get the values of the environment variable `PATH`.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATH`
 * @returns {string[]}
 */
export function getEnvPath(): string[] {
	return getEnvDelimitation("PATH");
}
/**
 * Get the values of the environment variable `PATH`, and ignore runtime permission error.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATH`
 * @returns {string[]}
 */
export function getEnvPathSafe(): string[] {
	try {
		return getEnvPath();
	} catch (error) {
		if (error instanceof Deno.errors.NotCapable) {
			return [];
		}
		throw error;
	}
}
/**
 * Add the value to the environment variable `PATH` at the specify index of the list.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATH`
 * @param {number} index Index of the list.
 * @param {...string} values Values that need to add.
 * @returns {void}
 */
export function insertEnvPath(index: number, ...values: readonly string[]): void {
	return insertEnvDelimitation("PATH", index, ...values);
}
/**
 * Add the value to the environment variable `PATH` at the specify index of the list, and ignore runtime permission error.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATH`
 * @param {number} index Index of the list.
 * @param {...string} values Values that need to add.
 * @returns {void}
 */
export function insertEnvPathSafe(index: number, ...values: readonly string[]): void {
	try {
		return insertEnvPath(index, ...values);
	} catch (error) {
		if (error instanceof Deno.errors.NotCapable) {
			return;
		}
		throw error;
	}
}
/**
 * Add the value to the environment variable `PATH` at the end of the list.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATH`
 * @param {...string} values Values that need to add.
 * @returns {void}
 */
export function pushEnvPath(...values: readonly string[]): void {
	return pushEnvDelimitation("PATH", ...values);
}
/**
 * Add the value to the environment variable `PATH` at the end of the list, and ignore runtime permission error.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATH`
 * @param {...string} values Values that need to add.
 * @returns {void}
 */
export function pushEnvPathSafe(...values: readonly string[]): void {
	try {
		return pushEnvPath(...values);
	} catch (error) {
		if (error instanceof Deno.errors.NotCapable) {
			return;
		}
		throw error;
	}
}
/**
 * Add the value to the environment variable `PATH` at the start of the list.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATH`
 * @param {...string} values Values that need to add.
 * @returns {void}
 */
export function unshiftEnvPath(...values: readonly string[]): void {
	return unshiftEnvDelimitation("PATH", ...values);
}
/**
 * Add the value to the environment variable `PATH` at the start of the list, and ignore runtime permission error.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATH`
 * @param {...string} values Values that need to add.
 * @returns {void}
 */
export function unshiftEnvPathSafe(...values: readonly string[]): void {
	try {
		return unshiftEnvPath(...values);
	} catch (error) {
		if (error instanceof Deno.errors.NotCapable) {
			return;
		}
		throw error;
	}
}
