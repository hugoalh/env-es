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
export {
	deDuplicateEnvDelimitation as deDuplicate
};
/**
 * De-duplicate the values of the environment variable with inter-handle delimiter, and ignore runtime permission error.
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
export {
	deDuplicateEnvDelimitationSafe as deDuplicateSafe
};
/**
 * Delete the value from the environment variable with inter-handle delimiter.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * @param {string} key Key of the environment variable.
 * @param {...string} values Values that need to delete.
 * @returns {void}
 */
export function deleteEnvDelimitation(key: string, ...values: readonly string[]): void {
	if (values.length > 0) {
		const original: readonly string[] = getEnvDelimitation(key);
		const result: readonly string[] = original.filter((value: string): boolean => {
			return !values.includes(value);
		});
		if (result.length < original.length) {
			return setEnvDelimitation(key, result);
		}
	}
}
export {
	deleteEnvDelimitation as delete
};
/**
 * Delete the value from the environment variable with inter-handle delimiter, and ignore runtime permission error.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * @param {string} key Key of the environment variable.
 * @param {...string} values Values that need to delete.
 * @returns {void}
 */
export function deleteEnvDelimitationSafe(key: string, ...values: readonly string[]): void {
	try {
		return deleteEnvDelimitation(key, ...values);
	} catch {
		return;
	}
}
export {
	deleteEnvDelimitationSafe as deleteSafe
};
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
export {
	getEnvDelimitation as get
};
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
	} catch {
		return [];
	}
}
export {
	getEnvDelimitationSafe as getSafe
};
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
export {
	insertEnvDelimitation as addAtIndex,
	insertEnvDelimitation as insert
};
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
	} catch {
		return;
	}
}
export {
	insertEnvDelimitationSafe as addAtIndexSafe,
	insertEnvDelimitationSafe as insertSafe
};
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
export {
	pushEnvDelimitation as addAtEnd,
	pushEnvDelimitation as push
};
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
	} catch {
		return;
	}
}
export {
	pushEnvDelimitationSafe as addAtEndSafe,
	pushEnvDelimitationSafe as pushSafe
};
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
export {
	setEnvDelimitation as set
};
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
	} catch {
		return;
	}
}
export {
	setEnvDelimitationSafe as setSafe
};
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
export {
	unshiftEnvDelimitation as addAtStart,
	unshiftEnvDelimitation as unshift
};
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
	} catch {
		return;
	}
}
export {
	unshiftEnvDelimitationSafe as addAtStartSafe,
	unshiftEnvDelimitationSafe as unshiftSafe
};
