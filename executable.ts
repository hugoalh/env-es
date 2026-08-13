import { systemName } from "jsr:@hugoalh/runtime-info@^0.4.0";
import {
	readdirSync as readDirSync,
	statSync,
	type Stats
} from "node:fs";
import {
	readdir as readDir,
	stat
} from "node:fs/promises";
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
function resolveEnvPaths(includeCWD: boolean | string): readonly string[] {
	const paths: string[] = getEnvPath();
	if (typeof includeCWD === "string") {
		paths.unshift(includeCWD);
	} else if (includeCWD) {
		paths.unshift(cwd());
	}
	return paths.filter((path: string): boolean => {
		return isPathAbsolute(path);
	});
}
function resolveExecutableEntry(envPath: string, name: string): ExecutableEntry {
	return {
		basename: name,
		name: (systemName === "windows") ? name.slice(0, name.length - resolvePathExtname(name).length) : name,
		path: joinPath(envPath, name)
	};
}
class ExecutableYielder {
	#bin: Set<string> = new Set<string>();
	#filters: readonly (string | RegExp)[] = [];
	constructor(filters: readonly (string | RegExp)[]) {
		this.#filters = filters;
	}
	add(entry: ExecutableEntry): void {
		this.#bin.add(entry.path);
	}
	canYield(entry: ExecutableEntry): boolean {
		if (this.isYielded(entry)) {
			return false;
		}
		return (
			this.#filters.length === 0 ||
			this.#filters.some((filter: string | RegExp): boolean => {
				if (filter instanceof RegExp) {
					return (
						filter.test(entry.basename) ||
						filter.test(entry.name) ||
						filter.test(entry.path)
					);
				}
				return (
					filter === entry.basename ||
					filter === entry.name ||
					filter === entry.path
				);
			})
		);
	}
	isYielded(entry: ExecutableEntry): boolean {
		return this.#bin.has(entry.path);
	}
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
	const yielder: ExecutableYielder = new ExecutableYielder(filters);
	const envPathExts: string[] | null = getEnvPathExt();
	for (const envPath of resolveEnvPaths(includeCWD)) {
		try {
			for (const name of await readDir(envPath, {
				encoding: "utf8",
				recursive: false,
				withFileTypes: false
			})) {
				const entry: ExecutableEntry = resolveExecutableEntry(envPath, name);
				try {
					if (
						yielder.isYielded(entry) ||
						!(await isExecutablePathInternal(entry.path, {}, envPathExts))
					) {
						continue;
					}
				} catch {
					continue;
				}
				if (yielder.canYield(entry)) {
					yielder.add(entry);
					yield entry;
				}
			}
		} catch (error) {
			//@ts-ignore NodeJS error code.
			const errorCode: unknown = error?.code;
			if (
				error instanceof DenoShim.errors.NotADirectory ||
				error instanceof DenoShim.errors.NotFound ||
				error instanceof DenoShim.errors.PermissionDenied ||
				errorCode === "EACCES" ||
				errorCode === "ENOENT" ||
				errorCode === "ENOTDIR" ||
				errorCode === "ERR_ACCESS_DENIED"
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
	const yielder: ExecutableYielder = new ExecutableYielder(filters);
	const envPathExts: string[] | null = getEnvPathExt();
	for (const envPath of resolveEnvPaths(includeCWD)) {
		try {
			for (const basename of readDirSync(envPath)) {
				const entry: ExecutableEntry = resolveExecutableEntry(envPath, basename);
				try {
					if (
						yielder.isYielded(entry) ||
						!(isExecutablePathInternalSync(entry.path, {}, envPathExts))
					) {
						continue;
					}
				} catch {
					continue;
				}
				if (yielder.canYield(entry)) {
					yielder.add(entry);
					yield entry;
				}
			}
		} catch (error) {
			//@ts-ignore NodeJS error code.
			const errorCode: unknown = error?.code;
			if (
				error instanceof DenoShim.errors.NotADirectory ||
				error instanceof DenoShim.errors.NotFound ||
				error instanceof DenoShim.errors.PermissionDenied ||
				errorCode === "EACCES" ||
				errorCode === "ENOENT" ||
				errorCode === "ENOTDIR" ||
				errorCode === "ERR_ACCESS_DENIED"
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
function isExecutablePathInternalPOSIX(stat: Stats, options: IsExecutablePathOptions): boolean {
	const ownGid: number | undefined = options.gid ?? getgid?.();
	const ownUid: number | undefined = options.uid ?? getuid?.();
	if (typeof ownGid === "undefined") {
		throw new Error(`Unable to get the group ID of the process!`);
	}
	if (typeof ownUid === "undefined") {
		throw new Error(`Unable to get the user ID of the process!`);
	}
	const pathGid: number | undefined = stat.gid;
	const pathMode: number | undefined = stat.mode;
	const pathUid: number | undefined = stat.uid;
	if (typeof pathGid === "undefined") {
		throw new Error(`Unable to get the group ID of the file!`);
	}
	if (typeof pathMode === "undefined") {
		throw new Error(`Unable to get the mode of the file!`);
	}
	if (typeof pathUid === "undefined") {
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
		const pathStat: Stats = await stat(path);
		if (!pathStat.isFile()) {
			return false;
		}
		if (systemName === "windows") {
			return isExecutablePathInternalWindows(path, pathExts ?? getEnvPathExt()!);
		}
		return isExecutablePathInternalPOSIX(pathStat, options);
	} catch (error) {
		//@ts-ignore NodeJS error code.
		const errorCode: unknown = error?.code;
		if ((
			error instanceof DenoShim.errors.NotFound ||
			errorCode === "ENOENT"
		) && mayNotExist) {
			return false;
		}
		throw error;
	}
}
function isExecutablePathInternalSync(path: string, options: IsExecutablePathOptions, pathExts?: string[] | null): boolean {
	const { mayNotExist = false } = options;
	try {
		const pathStat: Stats = statSync(path);
		if (!pathStat.isFile()) {
			return false;
		}
		if (systemName === "windows") {
			return isExecutablePathInternalWindows(path, pathExts ?? getEnvPathExt()!);
		}
		return isExecutablePathInternalPOSIX(pathStat, options);
	} catch (error) {
		//@ts-ignore NodeJS error code.
		const errorCode: unknown = error?.code;
		if ((
			error instanceof DenoShim.errors.NotFound ||
			errorCode === "ENOENT"
		) && mayNotExist) {
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
