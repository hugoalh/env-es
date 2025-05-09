import { isOSWindows } from "./_info.ts";
import {
	getEnv,
	setEnv
} from "./env.ts";
/**
 * Environment variables value delimiter character colon, use on the POSIX/UNIX platforms.
 */
export const delimiterColon = ":" as const;
/**
 * Environment variables value delimiter character semi colon, use on the Windows platforms.
 */
export const delimiterSemiColon = ";" as const;
/**
 * Environment variables value delimiter character evaluated for the current platform.
 */
export const delimiter: typeof delimiterColon | typeof delimiterSemiColon = isOSWindows ? delimiterSemiColon : delimiterColon;
/**
 * Get the value of an environment variable with inter-handle delimiter.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable \[Deno: `env`\]
 * >   - *Resources*
 * @param {string} key Key of the environment variable.
 * @returns {string[]} Values of the environment variable.
 */
export function getEnvWithDelimitation(key: string): string[] {
	return (getEnv(key) ?? "").split(delimiter).filter((value: string): boolean => {
		return (value.length > 0);
	});
};
/**
 * Set the value of an environment variable with inter-handle delimiter.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable \[Deno: `env`\]
 * >   - *Resources*
 * @param {string} key Key of the environment variable.
 * @param {readonly string[]} values Values of the environment variable.
 * @returns {void}
 */
export function setEnvWithDelimitation(key: string, values: readonly string[]): void {
	return setEnv(key, values.filter((value: string): boolean => {
		return (value.length > 0);
	}).join(delimiter));
};
/**
 * Environment variables value delimitation interface.
 */
export interface EnvDelimitation {
	/**
	 * Get the value of an environment variable with inter-handle delimiter.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - Environment Variable \[Deno: `env`\]
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
	 * > - Environment Variable \[Deno: `env`\]
	 * >   - *Resources*
	 * @param {string} key Key of the environment variable.
	 * @param {readonly string[]} values Values of the environment variable.
	 * @returns {void}
	 */
	set(key: string, values: readonly string[]): void;
}
/**
 * Environment variables value delimitation interface.
 */
export const envDelimitation: EnvDelimitation = Object.freeze({
	get: getEnvWithDelimitation,
	set: setEnvWithDelimitation
});
export default envDelimitation;
