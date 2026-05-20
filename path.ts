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
export {
	deDuplicateEnvPath as deDuplicate
};
/**
 * De-duplicate the values in the environment variable `PATH`, and ignore runtime permission error.
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
export {
	deDuplicateEnvPathSafe as deDuplicateSafe
};
/**
 * Delete the value from the environment variable `PATH`.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATH`
 * @param {...string} values Values that need to delete.
 * @returns {void}
 */
export function deleteEnvPath(...values: readonly string[]): void {
	return deleteEnvDelimitation("PATH", ...values);
}
export {
	deleteEnvPath as delete
};
/**
 * Delete the value from the environment variable `PATH`, and ignore runtime permission error.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATH`
 * @param {...string} values Values that need to delete.
 * @returns {void}
 */
export function deleteEnvPathSafe(...values: readonly string[]): void {
	try {
		return deleteEnvPath(...values);
	} catch {
		return;
	}
}
export {
	deleteEnvPathSafe as deleteSafe
};
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
export {
	getEnvPath as get
};
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
	} catch {
		return [];
	}
}
export {
	getEnvPathSafe as getSafe
};
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
export {
	insertEnvPath as addAtIndex,
	insertEnvPath as insert
};
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
	} catch {
		return;
	}
}
export {
	insertEnvPathSafe as addAtIndexSafe,
	insertEnvPathSafe as insertSafe
};
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
export {
	pushEnvPath as addAtEnd,
	pushEnvPath as push
};
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
	} catch {
		return;
	}
}
export {
	pushEnvPathSafe as addAtEndSafe,
	pushEnvPathSafe as pushSafe
};
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
export {
	unshiftEnvPath as addAtStart,
	unshiftEnvPath as unshift
};
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
	} catch {
		return;
	}
}
export {
	unshiftEnvPathSafe as addAtStartSafe,
	unshiftEnvPathSafe as unshiftSafe
};
