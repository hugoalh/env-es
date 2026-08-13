import DenoShim from "./_shim/deno.ts";
/**
 * Delete the environment variable.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * @param {string | RegExp} key Key of the environment variable. Use `string` for exact match, or use `RegExp` for pattern match.
 * @returns {void}
 */
export function deleteEnv(key: string | RegExp): void {
	if (key instanceof RegExp) {
		const errors: Error[] = [];
		for (const envKey of Object.keys(getAllEnv())) {
			if (key.test(envKey)) {
				try {
					DenoShim.env.delete(envKey);
				} catch (error) {
					errors.push(error as Error);
				}
			}
		}
		if (errors.length > 0) {
			throw new AggregateError(errors, `Unable to delete some of the environment variables!`);
		}
		return;
	}
	return DenoShim.env.delete(key);
}
/**
 * Delete the environment variable, and ignore runtime permission error.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * @param {string | RegExp} key Key of the environment variable. Use `string` for exact match, or use `RegExp` for pattern match.
 * @returns {void}
 */
export function deleteEnvSafe(key: string | RegExp): void {
	try {
		return deleteEnv(key);
	} catch (error) {
		if (error instanceof DenoShim.errors.NotCapable) {
			return;
		}
		throw error;
	}
}
/**
 * Get the value of the environment variable.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * @param {string} key Key of the environment variable.
 * @returns {string | undefined} Value of the environment variable.
 */
export function getEnv(key: string): string | undefined {
	return DenoShim.env.get(key);
}
/**
 * Get the value of the environment variable, and ignore runtime permission error.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * @param {string} key Key of the environment variable.
 * @returns {string | undefined} Value of the environment variable.
 */
export function getEnvSafe(key: string): string | undefined {
	try {
		return getEnv(key);
	} catch (error) {
		if (error instanceof DenoShim.errors.NotCapable) {
			return undefined;
		}
		throw error;
	}
}
/**
 * Get a snapshot of the environment variables at invocation as a simple object of keys and values.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * @returns {Record<string, string | undefined>} A snapshot of the environment variables.
 */
export function getAllEnv(): Record<string, string | undefined> {
	return DenoShim.env.toObject();
}
/**
 * Get a snapshot of the environment variables at invocation as a simple object of keys and values, and ignore runtime permission error.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * @returns {Record<string, string | undefined>} A snapshot of the environment variables.
 */
export function getAllEnvSafe(): Record<string, string | undefined> {
	try {
		return getAllEnv();
	} catch (error) {
		if (error instanceof DenoShim.errors.NotCapable) {
			return {};
		}
		throw error;
	}
}
/**
 * Check whether the environment variable is present.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * @param {string | RegExp} key Key of the environment variable. Use `string` for exact match, or use `RegExp` for pattern match.
 * @returns {boolean} Determine result.
 */
export function hasEnv(key: string | RegExp): boolean {
	if (key instanceof RegExp) {
		return Object.keys(getAllEnv()).some((envKey: string): boolean => {
			return key.test(envKey);
		});
	}
	return DenoShim.env.has(key);
}
/**
 * Check whether the environment variable is present, and ignore runtime permission error.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * @param {string | RegExp} key Key of the environment variable. Use `string` for exact match, or use `RegExp` for pattern match.
 * @returns {boolean} Determine result.
 */
export function hasEnvSafe(key: string | RegExp): boolean {
	try {
		return hasEnv(key);
	} catch (error) {
		if (error instanceof DenoShim.errors.NotCapable) {
			return false;
		}
		throw error;
	}
}
/**
 * Set the environment variable.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * @param {string} key Key of the environment variable.
 * @param {string} value Value of the environment variable.
 * @returns {void}
 */
export function setEnv(key: string, value: string): void {
	return DenoShim.env.set(key, value);
}
/**
 * Set the environment variable, and ignore runtime permission error.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * @param {string} key Key of the environment variable.
 * @param {string} value Value of the environment variable.
 * @returns {void}
 */
export function setEnvSafe(key: string, value: string): void {
	try {
		return setEnv(key, value);
	} catch (error) {
		if (error instanceof DenoShim.errors.NotCapable) {
			return;
		}
		throw error;
	}
}
