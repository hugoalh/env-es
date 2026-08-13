import { systemName } from "jsr:@hugoalh/runtime-info@^0.4.0";
import {
	extname as resolvePathExtname,
	isAbsolute as isPathAbsolute,
	join as joinPath
} from "node:path";
import {
	cwd,
	getgid,
	getuid
} from "node:process";
import DenoShim from "./_shim/deno.ts";
import { getEnvPath } from "./path.ts";
import { getEnvPathExt } from "./pathext.ts";
type DenoFileInfo = ReturnType<typeof DenoShim.statSync>;
export interface GetExecutableOptions {
	/**
	 * Whether to include the entries in the working directory.
	 * 
	 * - **`false`:** Exclude the entries in the working directory.
	 * - **`true`:** Include the entries in the working directory, which use current working directory.
	 * - **`string`:** Include the entries in the working directory, which specify.
	 * @default {false}
	 */
	cwd?: boolean | string;
	/**
	 * Filter the entries which match any filter. Use `string` for exact match, use `RegExp` for expression match. By default, all of the entries will yield.
	 */
	filters?: readonly (string | RegExp)[];
}
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
 * Get the information of the executables, asynchronously.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATH`
 * >   - `PATHEXT` (Windows Platforms)
 * > - File System - Read (Deno: `read`; NodeJS: `fs-read`)
 * > - System Info (Deno: `sys`)
 * >   - `gid` (POSIX/UNIX Platforms)
 * >   - `uid` (POSIX/UNIX Platforms)
 * @param {GetExecutableOptions} [options={}] Options.
 * @returns {AsyncGenerator<ExecutableEntry>} An async iterable iterator that yield the information of the executables.
 */
export async function* getAllExecutable(options: GetExecutableOptions = {}): AsyncGenerator<ExecutableEntry> {
	const {
		cwd: includeCWD = false,
		filters = []
	} = options;
	const yielded: Set<string> = new Set<string>();
	const envPathExts: string[] | null = getEnvPathExt();
	const envPaths: string[] = getEnvPath();
	if (typeof includeCWD === "string") {
		envPaths.unshift(includeCWD);
	} else if (includeCWD) {
		envPaths.unshift(cwd());
	}
	for (const envPath of envPaths) {
		if (!isPathAbsolute(envPath)) {
			continue;
		}
		try {
			for await (const { name: basename } of DenoShim.readDir(envPath)) {
				const path: string = joinPath(envPath, basename);
				try {
					if (
						yielded.has(path) ||
						!(await isExecutablePathInternal(path, {}, envPathExts))
					) {
						continue;
					}
				} catch {
					continue;
				}
				const name: string = (systemName === "windows") ? basename.slice(0, basename.length - resolvePathExtname(basename).length) : basename;
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
				error instanceof DenoShim.errors.NotADirectory ||
				error instanceof DenoShim.errors.NotFound ||
				error instanceof DenoShim.errors.PermissionDenied
			) {
				continue;
			}
			throw error;
		}
	}
}
/**
 * Get the information of the executables, synchronously.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATH`
 * >   - `PATHEXT` (Windows Platforms)
 * > - File System - Read (Deno: `read`; NodeJS: `fs-read`)
 * > - System Info (Deno: `sys`)
 * >   - `gid` (POSIX/UNIX Platforms)
 * >   - `uid` (POSIX/UNIX Platforms)
 * @param {GetExecutableOptions} [options={}] Options.
 * @returns {Generator<ExecutableEntry>} An iterable iterator that yield the information of the executables.
 */
export function* getAllExecutableSync(options: GetExecutableOptions = {}): Generator<ExecutableEntry> {
	const {
		cwd: includeCWD = false,
		filters = []
	} = options;
	const yielded: Set<string> = new Set<string>();
	const envPathExts: string[] | null = getEnvPathExt();
	const envPaths: string[] = getEnvPath();
	if (typeof includeCWD === "string") {
		envPaths.unshift(includeCWD);
	} else if (includeCWD) {
		envPaths.unshift(cwd());
	}
	for (const envPath of envPaths) {
		if (!isPathAbsolute(envPath)) {
			continue;
		}
		try {
			for (const { name: basename } of DenoShim.readDirSync(envPath)) {
				const path: string = joinPath(envPath, basename);
				try {
					if (
						yielded.has(path) ||
						!(isExecutablePathInternalSync(path, {}, envPathExts))
					) {
						continue;
					}
				} catch {
					continue;
				}
				const name: string = (systemName === "windows") ? basename.slice(0, basename.length - resolvePathExtname(basename).length) : basename;
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
				error instanceof DenoShim.errors.NotADirectory ||
				error instanceof DenoShim.errors.NotFound ||
				error instanceof DenoShim.errors.PermissionDenied
			) {
				continue;
			}
			throw error;
		}
	}
}
/**
 * Get the information of the executable, asynchronously.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATH`
 * >   - `PATHEXT` (Windows Platforms)
 * > - File System - Read (Deno: `read`; NodeJS: `fs-read`)
 * > - System Info (Deno: `sys`)
 * >   - `gid` (POSIX/UNIX Platforms)
 * >   - `uid` (POSIX/UNIX Platforms)
 * @param {Omit<GetExecutableOptions, "filter">} [options={}] Options.
 * @returns {Promise<ExecutableEntry | undefined>} The information of the executable.
 */
export async function getExecutable(specifier: string, options: Omit<GetExecutableOptions, "filter"> = {}): Promise<ExecutableEntry | undefined> {
	for await (const element of getAllExecutable({
		...options,
		filters: [specifier]
	})) {
		return element;
	}
	return undefined;
}
/**
 * Get the information of the executable, synchronously.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATH`
 * >   - `PATHEXT` (Windows Platforms)
 * > - File System - Read (Deno: `read`; NodeJS: `fs-read`)
 * > - System Info (Deno: `sys`)
 * >   - `gid` (POSIX/UNIX Platforms)
 * >   - `uid` (POSIX/UNIX Platforms)
 * @param {Omit<GetExecutableOptions, "filter">} [options={}] Options.
 * @returns {ExecutableEntry | undefined} The information of the executable.
 */
export function getExecutableSync(specifier: string, options: Omit<GetExecutableOptions, "filter"> = {}): ExecutableEntry | undefined {
	for (const element of getAllExecutableSync({
		...options,
		filters: [specifier]
	})) {
		return element;
	}
	return undefined;
}
export interface IsExecutablePathOptions {
	/**
	 * If the path is not exist, whether to return `false` instead of throw an error.
	 * @default {false}
	 */
	mayNotExist?: boolean;
	/**
	 * Effective group ID to check executable mode flags on POSIX/UNIX platforms.
	 * 
	 * Default to the group ID of the current process.
	 */
	gid?: number;
	/**
	 * Effective user ID to check executable mode flags on POSIX/UNIX platforms.
	 * 
	 * Default to the user ID of the current process.
	 */
	uid?: number;
}
const g = 0o010;
const o = 0o001;
const u = 0o100;
function isExecutablePathInternalPOSIX(stat: DenoFileInfo, options: IsExecutablePathOptions): boolean {
	const ownGid: number | undefined = options.gid ?? getgid?.();
	const ownUid: number | undefined = options.uid ?? getuid?.();
	if (typeof ownGid === "undefined") {
		throw new Error(`Unable to get the group ID of the process!`);
	}
	if (typeof ownUid === "undefined") {
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
	return (
		Boolean(pathMode & o) ||
		(Boolean(pathMode & g) && ownGid === pathGid) ||
		(Boolean(pathMode & u) && pathUid === ownUid) ||
		(Boolean(pathMode & (u | g)) && ownUid === 0)
	);
}
function isExecutablePathInternalWindows(path: string, pathExts: string[]): boolean {
	const pathFmt: string = path.toUpperCase();
	return pathExts.some((pathExt: string): boolean => {
		return (pathFmt !== pathExt && pathFmt.endsWith(pathExt));
	});
}
async function isExecutablePathInternal(path: string, options: IsExecutablePathOptions, pathExts?: string[] | null): Promise<boolean> {
	const { mayNotExist = false } = options;
	try {
		const stat: DenoFileInfo = await DenoShim.stat(path);
		if (!stat.isFile) {
			return false;
		}
		if (systemName === "windows") {
			return isExecutablePathInternalWindows(path, pathExts ?? getEnvPathExt()!);
		}
		return isExecutablePathInternalPOSIX(stat, options);
	} catch (error) {
		if (error instanceof DenoShim.errors.NotFound && mayNotExist) {
			return false;
		}
		throw error;
	}
}
function isExecutablePathInternalSync(path: string, options: IsExecutablePathOptions, pathExts?: string[] | null): boolean {
	const { mayNotExist = false } = options;
	try {
		const stat: DenoFileInfo = DenoShim.statSync(path);
		if (!stat.isFile) {
			return false;
		}
		if (systemName === "windows") {
			return isExecutablePathInternalWindows(path, pathExts ?? getEnvPathExt()!);
		}
		return isExecutablePathInternalPOSIX(stat, options);
	} catch (error) {
		if (error instanceof DenoShim.errors.NotFound && mayNotExist) {
			return false;
		}
		throw error;
	}
}
/**
 * Determine whether the path is executable on the current platform, asynchronously.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATHEXT` (Windows Platforms)
 * > - File System - Read (Deno: `read`; NodeJS: `fs-read`)
 * > - System Info (Deno: `sys`)
 * >   - `gid` (POSIX/UNIX Platforms)
 * >   - `uid` (POSIX/UNIX Platforms)
 * @param {string} path Path.
 * @param {IsExecutablePathOptions} [options={}] Options.
 * @returns {Promise<boolean>} Determine result.
 */
export function isExecutablePath(path: string, options: IsExecutablePathOptions = {}): Promise<boolean> {
	return isExecutablePathInternal(path, options);
}
/**
 * Determine whether the path is executable on the current platform, synchronously.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Environment Variable (Deno: `env`)
 * >   - `PATHEXT` (Windows Platforms)
 * > - File System - Read (Deno: `read`; NodeJS: `fs-read`)
 * > - System Info (Deno: `sys`)
 * >   - `gid` (POSIX/UNIX Platforms)
 * >   - `uid` (POSIX/UNIX Platforms)
 * @param {string} path Path.
 * @param {IsExecutablePathOptions} [options={}] Options.
 * @returns {boolean} Determine result.
 */
export function isExecutablePathSync(path: string, options: IsExecutablePathOptions = {}): boolean {
	return isExecutablePathInternalSync(path, options);
}
