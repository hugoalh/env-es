import { extname as getPathExtname } from "jsr:@std/path@^1.0.7/extname";
import { isAbsolute as isPathAbsolute } from "jsr:@std/path@^1.0.7/is-absolute";
import { join as joinPath } from "jsr:@std/path@^1.0.7/join";
import { isOSWindows } from "./_info.ts";
import { getEnvPath } from "./path.ts";
import { getEnvPathExt } from "./pathext.ts";
export interface ExecutableEntry {
	/**
	 * Basename of the executable.
	 * @example
	 * ```ts
	 * "git.exe"
	 * ```
	 */
	basename: string;
	/**
	 * Name of the executable.
	 * @example
	 * ```ts
	 * "git"
	 * ```
	 */
	name: string;
	/**
	 * Absolute path of the executable.
	 * @example
	 * ```ts
	 * "C:\\Program Files\\Git\\cmd\\git.exe"
	 * ```
	 */
	path: string;
}
/**
 * Get a list of the executables, asynchronously.
 * 
 * The order of entries is not guaranteed.
 * 
 * > **🛡️ Require Runtime Permissions**
 * > 
 * > - Deno
 * >   - Environment (`env`)
 * >     - `PATH`
 * >     - `PATHEXT`
 * >   - File System - Read (`read`)
 * >     - *Resources*
 * >   - System Info (`sys`)
 * >     - `gid`
 * >     - `uid`
 * @param {...(string | RegExp)} filters Filter the entries which match any filter. Use `string` for exact match, use `RegExp` for expression match. By default, all of the entries will yield.
 * @returns {AsyncGenerator<ExecutableEntry>} An async iterable iterator that yields the executable entry information.
 */
export async function* getAllExecutable(...filters: (string | RegExp)[]): AsyncGenerator<ExecutableEntry> {
	const yielded: Set<string> = new Set<string>();
	const pathExts: string[] | null = getEnvPathExt();
	for (const envPath of getEnvPath().filter((envPath: string): boolean => {
		return isPathAbsolute(envPath);
	})) {
		try {
			for await (const { name: basename } of Deno.readDir(envPath)) {
				const path: string = joinPath(envPath, basename);
				try {
					if (
						!(await isExecutablePathInternal(path, {}, pathExts)) ||
						yielded.has(path)
					) {
						continue;
					}
				} catch {
					continue;
				}
				const name: string = isOSWindows ? basename.slice(0, basename.length - getPathExtname(basename).length) : basename;
				if (
					filters.length === 0 ||
					(filters.length > 0 && filters.some((filter: string | RegExp): boolean => {
						return ((typeof filter === "string") ? (
							filter === basename ||
							filter === name ||
							filter === path
						) : (
							filter.test(basename) ||
							filter.test(name) ||
							filter.test(path)
						));
					}))
				) {
					yielded.add(path);
					yield {
						basename,
						name,
						path
					};
				}
			}
		} catch (error) {
			if (
				error instanceof Deno.errors.NotADirectory ||
				error instanceof Deno.errors.NotFound ||
				error instanceof Deno.errors.PermissionDenied
			) {
				continue;
			}
			throw error;
		}
	}
}
/**
 * Get a list of the executables, synchronously.
 * 
 * The order of entries is not guaranteed.
 * 
 * > **🛡️ Require Runtime Permissions**
 * > 
 * > - Deno
 * >   - Environment (`env`)
 * >     - `PATH`
 * >     - `PATHEXT`
 * >   - File System - Read (`read`)
 * >     - *Resources*
 * >   - System Info (`sys`)
 * >     - `gid`
 * >     - `uid`
 * @param {...(string | RegExp)} filters Filter the entries which match any filter. Use `string` for exact match, use `RegExp` for expression match. By default, all of the entries will yield.
 * @returns {Generator<ExecutableEntry>} An iterable iterator that yields the executable entry information.
 */
export function* getAllExecutableSync(...filters: (string | RegExp)[]): Generator<ExecutableEntry> {
	const yielded: Set<string> = new Set<string>();
	const pathExts: string[] | null = getEnvPathExt();
	for (const envPath of getEnvPath().filter((envPath: string): boolean => {
		return isPathAbsolute(envPath);
	})) {
		try {
			for (const { name: basename } of Deno.readDirSync(envPath)) {
				const path: string = joinPath(envPath, basename);
				try {
					if (
						!(isExecutablePathInternalSync(path, {}, pathExts)) ||
						yielded.has(path)
					) {
						continue;
					}
				} catch {
					continue;
				}
				const name: string = isOSWindows ? basename.slice(0, basename.length - getPathExtname(basename).length) : basename;
				if (
					filters.length === 0 ||
					(filters.length > 0 && filters.some((filter: string | RegExp): boolean => {
						return ((typeof filter === "string") ? (
							filter === basename ||
							filter === name ||
							filter === path
						) : (
							filter.test(basename) ||
							filter.test(name) ||
							filter.test(path)
						));
					}))
				) {
					yielded.add(path);
					yield {
						basename,
						name,
						path
					};
				}
			}
		} catch (error) {
			if (
				error instanceof Deno.errors.NotADirectory ||
				error instanceof Deno.errors.NotFound ||
				error instanceof Deno.errors.PermissionDenied
			) {
				continue;
			}
			throw error;
		}
	}
}
export interface IsExecutablePathOptions {
	/**
	 * If the path is not exist, whether to return `false` instead of throw an error.
	 * @default {false}
	 */
	mayNotExist?: boolean;
	/**
	 * Effective group ID to check executable mode flags on POSIX/UNIX system.
	 * 
	 * Default to the group ID of the current process.
	 */
	gid?: number;
	/**
	 * Effective user ID to check executable mode flags on POSIX/UNIX system.
	 * 
	 * Default to the user ID of the current process.
	 */
	uid?: number;
}
/**
 * Determine whether the path is executable on the POSIX/UNIX operate system.
 * 
 * > **🛡️ Require Runtime Permissions**
 * > 
 * > - Deno
 * >   - System Info (`sys`)
 * >     - `gid`
 * >     - `uid`
 * @param {Deno.FileInfo} stat Stat of the path.
 * @param {IsExecutablePathOptions} [options={}] Options.
 * @returns {boolean} Determine result.
 */
function isExecutablePathInternalPOSIX(stat: Deno.FileInfo, options: IsExecutablePathOptions = {}): boolean {
	if (!stat.isFile) {
		return false;
	}
	const ownGid: number | null = options.gid ?? Deno.gid();
	const ownUid: number | null = options.uid ?? Deno.uid();
	if (ownGid === null) {
		throw new Error(`Unable to get the group ID of the process!`);
	}
	if (ownUid === null) {
		throw new Error(`Unable to get the user ID of the process!`);
	}
	const pathGid: number | null = stat.gid;
	const pathMode: number | null = stat.mode;
	const pathUid: number | null = stat.uid;
	if (pathGid === null) {
		throw new Error(`Unable to get the group ID of the file!`);
	}
	if (pathMode === null) {
		throw new Error(`Unable to get the mode of the file!`);
	}
	if (pathUid === null) {
		throw new Error(`Unable to get the user ID of the file!`);
	}
	const g: number = Number.parseInt('010', 8);
	const o: number = Number.parseInt('001', 8);
	const u: number = Number.parseInt('100', 8);
	return (
		Boolean(pathMode & o) ||
		(Boolean(pathMode & g) && ownGid === pathGid) ||
		(Boolean(pathMode & u) && pathUid === ownUid) ||
		(Boolean(pathMode & (u | g)) && ownUid === 0)
	);
}
/**
 * Determine whether the path is executable on the Windows operate system.
 * 
 * > **🛡️ Require Runtime Permissions**
 * > 
 * > - Deno
 * >   - Environment (`env`)
 * >     - `PATHEXT`
 * @returns {boolean} Determine result.
 */
function isExecutablePathInternalWindows(path: string, stat: Deno.FileInfo, pathExts: string[]): boolean {
	if (!stat.isFile) {
		return false;
	}
	const pathLowerCase: string = path.toLowerCase();
	return pathExts.some((pathExt: string): boolean => {
		const pathExtLowerCase: string = pathExt.toLowerCase();
		return (pathLowerCase !== pathExtLowerCase && pathLowerCase.endsWith(pathExtLowerCase));
	});
}
async function isExecutablePathInternal(path: string, options: IsExecutablePathOptions, pathExts: string[] | null = getEnvPathExt()): Promise<boolean> {
	const { mayNotExist = false } = options;
	try {
		const stat: Deno.FileInfo = await Deno.stat(path);
		if (isOSWindows) {
			return isExecutablePathInternalWindows(path, stat, pathExts!);
		}
		return isExecutablePathInternalPOSIX(stat, options);
	} catch (error) {
		if (error instanceof Deno.errors.NotFound && mayNotExist) {
			return false;
		}
		throw error;
	}
}
function isExecutablePathInternalSync(path: string, options: IsExecutablePathOptions, pathExts: string[] | null = getEnvPathExt()): boolean {
	const { mayNotExist = false } = options;
	try {
		const stat: Deno.FileInfo = Deno.statSync(path);
		if (isOSWindows) {
			return isExecutablePathInternalWindows(path, stat, pathExts!);
		}
		return isExecutablePathInternalPOSIX(stat, options);
	} catch (error) {
		if (error instanceof Deno.errors.NotFound && mayNotExist) {
			return false;
		}
		throw error;
	}
}
/**
 * Determine whether the path is executable on the current operate system, asynchronously.
 * 
 * > **🛡️ Require Runtime Permissions**
 * > 
 * > - Deno
 * >   - Environment (`env`)
 * >     - `PATHEXT`
 * >   - File System - Read (`read`)
 * >     - *Resources*
 * >   - System Info (`sys`)
 * >     - `gid`
 * >     - `uid`
 * @param {string} path Path.
 * @param {IsExecutablePathOptions} [options={}] Options.
 * @returns {Promise<boolean>} Determine result.
 */
export function isExecutablePath(path: string, options: IsExecutablePathOptions = {}): Promise<boolean> {
	return isExecutablePathInternal(path, options);
}
/**
 * Determine whether the path is executable on the current operate system, synchronously.
 * 
 * > **🛡️ Require Runtime Permissions**
 * > 
 * > - Deno
 * >   - Environment (`env`)
 * >     - `PATHEXT`
 * >   - File System - Read (`read`)
 * >     - *Resources*
 * >   - System Info (`sys`)
 * >     - `gid`
 * >     - `uid`
 * @param {string} path Path.
 * @param {IsExecutablePathOptions} [options={}] Options.
 * @returns {boolean} Determine result.
 */
export function isExecutablePathSync(path: string, options: IsExecutablePathOptions = {}): boolean {
	return isExecutablePathInternalSync(path, options);
}
