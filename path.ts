import { isAbsolute as isPathAbsolute } from "jsr:@std/path@^1.0.6/is-absolute";
import { envDelimitation } from "./delimitation.ts";
function getEnvPathInternal() {
	const resultArray: string[] = envDelimitation.get("PATH");
	const resultSet: Set<string> = new Set<string>(resultArray);
	return {
		hasDuplicated: resultArray.length === resultSet.size,
		result: resultSet
	};
}
/**
 * Environment variable `PATH` interface.
 */
export interface EnvPath {
	/**
	 * Add value to the environment variable `PATH`.
	 * 
	 * > **🛡️ Require Runtime Permissions**
	 * >
	 * > - Deno
	 * >   - Environment Variable (`env`)
	 * >     - `PATH`
	 * @param {...string} values Value that need to add to the environment variable `PATH`.
	 * @returns {void}
	 */
	add(...values: string[]): void;
	/**
	 * Delete value from the environment variable `PATH`.
	 * 
	 * > **🛡️ Require Runtime Permissions**
	 * >
	 * > - Deno
	 * >   - Environment Variable (`env`)
	 * >     - `PATH`
	 * @param {...string} values Value that need to delete from the environment variable `PATH`.
	 * @returns {void}
	 */
	delete(...values: string[]): void;
	/**
	 * Get the values of the environment variable `PATH`.
	 * 
	 * > **🛡️ Require Runtime Permissions**
	 * >
	 * > - Deno
	 * >   - Environment Variable (`env`)
	 * >     - `PATH`
	 * @returns {string[]} Values of the environment variable `PATH`.
	 */
	get(): string[];
}
/**
 * Add value to the environment variable `PATH`.
 * 
 * > **🛡️ Require Runtime Permissions**
 * >
 * > - Deno
 * >   - Environment Variable (`env`)
 * >     - `PATH`
 * @param {...string} values Value that need to add to the environment variable `PATH`.
 * @returns {void}
 */
export const addEnvPath: EnvPath["add"] = (...values: string[]): void => {
	values.forEach((value: string): void => {
		if (!isPathAbsolute(value)) {
			throw new SyntaxError(`\`${value}\` is not an absolute path!`);
		}
	});
	if (values.length > 0) {
		const { result: target } = getEnvPathInternal();
		for (const value of values) {
			target.add(value);
		}
		envDelimitation.set("PATH", Array.from(target.values()));
	}
};
/**
 * Delete value from the environment variable `PATH`.
 * 
 * > **🛡️ Require Runtime Permissions**
 * >
 * > - Deno
 * >   - Environment Variable (`env`)
 * >     - `PATH`
 * @param {...string} values Value that need to delete from the environment variable `PATH`.
 * @returns {void}
 */
export const deleteEnvPath: EnvPath["delete"] = (...values: string[]): void => {
	values.forEach((value: string): void => {
		if (!isPathAbsolute(value)) {
			throw new SyntaxError(`\`${value}\` is not an absolute path!`);
		}
	});
	if (values.length > 0) {
		const {
			hasDuplicated,
			result: target
		} = getEnvPathInternal();
		let isModified: boolean = hasDuplicated;
		for (const value of values) {
			isModified = target.delete(value) || isModified;
		}
		if (isModified) {
			envDelimitation.set("PATH", Array.from(target.values()));
		}
	}
};
/**
 * Get the values of the environment variable `PATH`.
 * 
 * > **🛡️ Require Runtime Permissions**
 * >
 * > - Deno
 * >   - Environment Variable (`env`)
 * >     - `PATH`
 * @returns {string[]} Values of the environment variable `PATH`.
 */
export const getEnvPath: EnvPath["get"] = (): string[] => {
	return Array.from(getEnvPathInternal().result.values());
};
/**
 * Environment variable `PATH` interface.
 */
export const envPath: EnvPath = Object.freeze({
	add: addEnvPath,
	delete: deleteEnvPath,
	get: getEnvPath
});
export default envPath;