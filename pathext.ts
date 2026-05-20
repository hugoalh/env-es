import { systemName } from "https://raw.githubusercontent.com/hugoalh/runtime-info-es/v0.2.0/mod.ts";
import {
	deDuplicateEnvDelimitation,
	deleteEnvDelimitation,
	getEnvDelimitation,
	insertEnvDelimitation,
	pushEnvDelimitation,
	setEnvDelimitation,
	unshiftEnvDelimitation
} from "./delimitation.ts";
function assertValuesFileExtension(...values: readonly string[]): void {
	values.forEach((value: string): void => {
		if (!value.startsWith(".")) {
			throw new SyntaxError(`\`${value}\` is not an valid file extension!`);
		}
	});
}
/**
 * De-duplicate the values in the environment variable `PATHEXT`; Always ignore for non Windows platforms.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATHEXT` (Windows Platforms)
 * @returns {void}
 */
export function deDuplicateEnvPathExt(): void {
	if (systemName === "windows") {
		return deDuplicateEnvDelimitation("PATHEXT");
	}
}
export {
	deDuplicateEnvPathExt as deDuplicate
};
/**
 * De-duplicate the values in the environment variable `PATHEXT`, and ignore runtime permission error; Always ignore for non Windows platforms.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATHEXT` (Windows Platforms)
 * @returns {void}
 */
export function deDuplicateEnvPathExtSafe(): void {
	try {
		return deDuplicateEnvPathExt();
	} catch {
		return;
	}
}
export {
	deDuplicateEnvPathExtSafe as deDuplicateSafe
};
/**
 * Delete the value from the environment variable `PATHEXT`; Always ignore for non Windows platforms.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATHEXT` (Windows Platforms)
 * @param {...string} values Values that need to delete.
 * @returns {void}
 */
export function deleteEnvPathExt(...values: readonly string[]): void {
	assertValuesFileExtension(...values);
	if (systemName === "windows") {
		return deleteEnvDelimitation("PATHEXT", ...values.map((value: string): string => {
			return value.toUpperCase();
		}));
	}
}
export {
	deleteEnvPathExt as delete
};
/**
 * Delete the value from the environment variable `PATHEXT`, and ignore runtime permission error; Always ignore for non Windows platforms.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATHEXT` (Windows Platforms)
 * @param {...string} values Values that need to delete.
 * @returns {void}
 */
export function deleteEnvPathExtSafe(...values: readonly string[]): void {
	assertValuesFileExtension(...values);
	try {
		return deleteEnvPathExt(...values);
	} catch {
		return;
	}
}
export {
	deleteEnvPathExtSafe as deleteSafe
};
/**
 * Get the values of the environment variable `PATHEXT`; Always return `null` for non Windows platforms.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATHEXT` (Windows Platforms)
 * @returns {string[] | null}
 */
export function getEnvPathExt(): string[] | null {
	if (systemName === "windows") {
		return getEnvDelimitation("PATHEXT");
	}
	return null;
};
export {
	getEnvPathExt as get
};
/**
 * Get the values of the environment variable `PATHEXT`, and ignore runtime permission error; Always return `null` for non Windows platforms.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATHEXT` (Windows Platforms)
 * @returns {string[] | null}
 */
export function getEnvPathExtSafe(): string[] | null {
	try {
		return getEnvPathExt();
	} catch {
		return null;
	}
};
export {
	getEnvPathExtSafe as getSafe
};
/**
 * Add the value to the environment variable `PATHEXT` at the specify index of the list; Always ignore for non Windows platforms.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATHEXT` (Windows Platforms)
 * @param {number} index Index of the list.
 * @param {...string} values Values that need to add.
 * @returns {void}
 */
export function insertEnvPathExt(index: number, ...values: readonly string[]): void {
	assertValuesFileExtension(...values);
	if (systemName === "windows") {
		return insertEnvDelimitation("PATHEXT", index, ...values.map((value: string): string => {
			return value.toUpperCase();
		}));
	}
}
export {
	insertEnvPathExt as addAtIndex,
	insertEnvPathExt as insert
};
/**
 * Add the value to the environment variable `PATHEXT` at the specify index of the list, and ignore runtime permission error; Always ignore for non Windows platforms.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATHEXT` (Windows Platforms)
 * @param {number} index Index of the list.
 * @param {...string} values Values that need to add.
 * @returns {void}
 */
export function insertEnvPathExtSafe(index: number, ...values: readonly string[]): void {
	assertValuesFileExtension(...values);
	try {
		return insertEnvPathExt(index, ...values);
	} catch {
		return;
	}
}
export {
	insertEnvPathExtSafe as addAtIndexSafe,
	insertEnvPathExtSafe as insertSafe
};
/**
 * Add the value to the environment variable `PATHEXT` at the end of the list; Always ignore for non Windows platforms.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATHEXT` (Windows Platforms)
 * @param {...string} values Values that need to add.
 * @returns {void}
 */
export function pushEnvPathExt(...values: readonly string[]): void {
	assertValuesFileExtension(...values);
	if (systemName === "windows") {
		return pushEnvDelimitation("PATHEXT", ...values.map((value: string): string => {
			return value.toUpperCase();
		}));
	}
}
export {
	pushEnvPathExt as addAtEnd,
	pushEnvPathExt as push
};
/**
 * Add the value to the environment variable `PATHEXT` at the end of the list, and ignore runtime permission error; Always ignore for non Windows platforms.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATHEXT` (Windows Platforms)
 * @param {...string} values Values that need to add.
 * @returns {void}
 */
export function pushEnvPathExtSafe(...values: readonly string[]): void {
	assertValuesFileExtension(...values);
	try {
		return pushEnvPathExt(...values);
	} catch {
		return;
	}
}
export {
	pushEnvPathExtSafe as addAtEndSafe,
	pushEnvPathExtSafe as pushSafe
};
/**
 * Reset the values of the environment variable `PATHEXT` to the default; Always ignore for non Windows platforms.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATHEXT` (Windows Platforms)
 * @returns {void}
 */
export function resetEnvPathExt(): void {
	if (systemName === "windows") {
		return setEnvDelimitation("PATHEXT", [".COM", ".EXE", ".BAT", ".CMD", ".VBS", ".VBE", ".JS", ".JSE", ".WSF", ".WSH", ".MSC"]);
	}
}
export {
	resetEnvPathExt as reset
};
/**
 * Reset the values of the environment variable `PATHEXT` to the default, and ignore runtime permission error; Always ignore for non Windows platforms.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATHEXT` (Windows Platforms)
 * @returns {void}
 */
export function resetEnvPathExtSafe(): void {
	try {
		return resetEnvPathExt();
	} catch {
		return;
	}
}
export {
	resetEnvPathExtSafe as resetSafe
};
/**
 * Add the value to the environment variable `PATHEXT` at the start of the list; Always ignore for non Windows platforms.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATHEXT` (Windows Platforms)
 * @param {...string} values Values that need to add.
 * @returns {void}
 */
export function unshiftEnvPathExt(...values: readonly string[]): void {
	assertValuesFileExtension(...values);
	if (systemName === "windows") {
		return unshiftEnvDelimitation("PATHEXT", ...values.map((value: string): string => {
			return value.toUpperCase();
		}));
	}
}
export {
	unshiftEnvPathExt as addAtStart,
	unshiftEnvPathExt as unshift
};
/**
 * Add the value to the environment variable `PATHEXT` at the start of the list, and ignore runtime permission error; Always ignore for non Windows platforms.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATHEXT` (Windows Platforms)
 * @param {...string} values Values that need to add.
 * @returns {void}
 */
export function unshiftEnvPathExtSafe(...values: readonly string[]): void {
	assertValuesFileExtension(...values);
	try {
		return unshiftEnvPathExt(...values);
	} catch {
		return;
	}
}
export {
	unshiftEnvPathExtSafe as addAtStartSafe,
	unshiftEnvPathExtSafe as unshiftSafe
};
