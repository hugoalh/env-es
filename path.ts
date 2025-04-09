import { isAbsolute as isPathAbsolute } from "node:path";
import { envDelimitation } from "./delimitation.ts";
function assertValuesAbsolutePath(...values: string[]): void {
	values.forEach((value: string): void => {
		if (!isPathAbsolute(value)) {
			throw new SyntaxError(`\`${value}\` is not an absolute path!`);
		}
	});
}
function getEnvPathInternal() {
	const resultArray: readonly string[] = envDelimitation.get("PATH");
	const resultSet: Set<string> = new Set<string>(resultArray);
	return {
		hasDuplicated: resultArray.length !== resultSet.size,
		result: resultSet
	};
}
/**
 * Add value to the environment variable `PATH`.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable \[Deno: `env`\]
 * >   - `PATH`
 * @param {...readonly string} values Value that need to add to the environment variable `PATH`.
 * @returns {void}
 */
export function addEnvPath(...values: readonly string[]): void {
	assertValuesAbsolutePath(...values);
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
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable \[Deno: `env`\]
 * >   - `PATH`
 * @param {...readonly string} values Value that need to delete from the environment variable `PATH`.
 * @returns {void}
 */
export function deleteEnvPath(...values: readonly string[]): void {
	assertValuesAbsolutePath(...values);
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
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable \[Deno: `env`\]
 * >   - `PATH`
 * @returns {string[]} Values of the environment variable `PATH`.
 */
export function getEnvPath(): string[] {
	return Array.from(getEnvPathInternal().result.values());
};
/**
 * Environment variable `PATH` interface.
 */
export interface EnvPath {
	/**
	 * Add value to the environment variable `PATH`.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - Environment Variable \[Deno: `env`\]
	 * >   - `PATH`
	 * @param {...readonly string} values Value that need to add to the environment variable `PATH`.
	 * @returns {void}
	 */
	add(...values: readonly string[]): void;
	/**
	 * Delete value from the environment variable `PATH`.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - Environment Variable \[Deno: `env`\]
	 * >   - `PATH`
	 * @param {...readonly string} values Value that need to delete from the environment variable `PATH`.
	 * @returns {void}
	 */
	delete(...values: readonly string[]): void;
	/**
	 * Get the values of the environment variable `PATH`.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * - Environment Variable \[Deno: `env`\]
	 * >   - `PATH`
	 * @returns {string[]} Values of the environment variable `PATH`.
	 */
	get(): string[];
}
/**
 * Environment variable `PATH` interface.
 */
export const envPath: EnvPath = Object.freeze({
	add: addEnvPath,
	delete: deleteEnvPath,
	get: getEnvPath
});
export default envPath;
