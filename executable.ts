import {
	extname as getPathExtname,
	isAbsolute as isPathAbsolute,
	join as joinPath
} from "node:path";
import { systemName } from "https://raw.githubusercontent.com/hugoalh/runtime-info-es/v0.1.0/mod.ts";
import { env } from "./env.ts";
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
	 * @example "git.exe"
	 */
	basename: string;
	/**
	 * Name of the executable.
	 * @example "git"
	 */
	name: string;
	/**
	 * Absolute path of the executable.
	 * @example "C:\\Program Files\\Git\\cmd\\git.exe"
	 */
	path: string;
}
/**
 * Get the information of the executables, asynchronously.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - **Environment Variable (Deno: `env`):**
 * >   - `PATH`
 * >   - `PATHEXT` (Windows Platforms)
 * > - **File System - Read (Deno: `read`; NodeJS: `fs-read`):**
 * >   - *Resources*
 * > - **System Info (Deno: `sys`):**
 * >   - `gid` (POSIX/UNIX Platforms)
 * >   - `uid` (POSIX/UNIX Platforms)
 * @param {GetExecutableOptions} [options={}] Options.
 * @returns {AsyncGenerator<ExecutableEntry>} An async iterable iterator that yield the information of the executables.
 */
export async function* getAllExecutable(options: GetExecutableOptions = {}): AsyncGenerator<ExecutableEntry> {
	const {
		cwd = false,
		filters = []
	} = options;
	const yielded: Set<string> = new Set<string>();
	const envPathExts: string[] | null = env.pathext.get();
	const envPaths: string[] = env.path.get();
	if (typeof cwd === "string") {
		envPaths.unshift(cwd);
	} else if (cwd) {
		envPaths.unshift(Deno.cwd());
	}
	for (const envPath of envPaths.filter((envPath: string): boolean => {
		return isPathAbsolute(envPath);
	})) {
		try {
			for await (const { name: basename } of Deno.readDir(envPath)) {
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
				const name: string = (systemName === "windows") ? basename.slice(0, basename.length - getPathExtname(basename).length) : basename;
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
 * Get the information of the executables, synchronously.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - **Environment Variable (Deno: `env`):**
 * >   - `PATH`
 * >   - `PATHEXT` (Windows Platforms)
 * > - **File System - Read (Deno: `read`; NodeJS: `fs-read`):**
 * >   - *Resources*
 * > - **System Info (Deno: `sys`):**
 * >   - `gid` (POSIX/UNIX Platforms)
 * >   - `uid` (POSIX/UNIX Platforms)
 * @param {GetExecutableOptions} [options={}] Options.
 * @returns {Generator<ExecutableEntry>} An iterable iterator that yield the information of the executables.
 */
export function* getAllExecutableSync(options: GetExecutableOptions = {}): Generator<ExecutableEntry> {
	const {
		cwd = false,
		filters = []
	} = options;
	const yielded: Set<string> = new Set<string>();
	const envPathExts: string[] | null = env.pathext.get();
	const envPaths: string[] = env.path.get();
	if (typeof cwd === "string") {
		envPaths.unshift(cwd);
	} else if (cwd) {
		envPaths.unshift(Deno.cwd());
	}
	for (const envPath of envPaths.filter((envPath: string): boolean => {
		return isPathAbsolute(envPath);
	})) {
		try {
			for (const { name: basename } of Deno.readDirSync(envPath)) {
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
				const name: string = (systemName === "windows") ? basename.slice(0, basename.length - getPathExtname(basename).length) : basename;
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
 * Get the information of the executable, asynchronously.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - **Environment Variable (Deno: `env`):**
 * >   - `PATH`
 * >   - `PATHEXT` (Windows Platforms)
 * > - **File System - Read (Deno: `read`; NodeJS: `fs-read`):**
 * >   - *Resources*
 * > - **System Info (Deno: `sys`):**
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
 * > - **Environment Variable (Deno: `env`):**
 * >   - `PATH`
 * >   - `PATHEXT` (Windows Platforms)
 * > - **File System - Read (Deno: `read`; NodeJS: `fs-read`):**
 * >   - *Resources*
 * > - **System Info (Deno: `sys`):**
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
function isExecutablePathInternalPOSIX(stat: Deno.FileInfo, options: IsExecutablePathOptions): boolean {
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
	return (
		Boolean(pathMode & o) ||
		(Boolean(pathMode & g) && ownGid === pathGid) ||
		(Boolean(pathMode & u) && pathUid === ownUid) ||
		(Boolean(pathMode & (u | g)) && ownUid === 0)
	);
}
function isExecutablePathInternalWindows(path: string, pathExts: string[]): boolean {
	const pathLowerCase: string = path.toLowerCase();
	return pathExts.some((pathExt: string): boolean => {
		const pathExtLowerCase: string = pathExt.toLowerCase();
		return (pathLowerCase !== pathExtLowerCase && pathLowerCase.endsWith(pathExtLowerCase));
	});
}
async function isExecutablePathInternal(path: string, options: IsExecutablePathOptions, pathExts?: string[] | null): Promise<boolean> {
	const { mayNotExist = false } = options;
	try {
		const stat: Deno.FileInfo = await Deno.stat(path);
		if (!stat.isFile) {
			return false;
		}
		if (systemName === "windows") {
			return isExecutablePathInternalWindows(path, pathExts ?? env.pathext.get()!);
		}
		return isExecutablePathInternalPOSIX(stat, options);
	} catch (error) {
		if (error instanceof Deno.errors.NotFound && mayNotExist) {
			return false;
		}
		throw error;
	}
}
function isExecutablePathInternalSync(path: string, options: IsExecutablePathOptions, pathExts?: string[] | null): boolean {
	const { mayNotExist = false } = options;
	try {
		const stat: Deno.FileInfo = Deno.statSync(path);
		if (!stat.isFile) {
			return false;
		}
		if (systemName === "windows") {
			return isExecutablePathInternalWindows(path, pathExts ?? env.pathext.get()!);
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
 * Determine whether the path is executable on the current platform, asynchronously.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - **Environment Variable (Deno: `env`):**
 * >   - `PATHEXT` (Windows Platforms)
 * > - **File System - Read (Deno: `read`; NodeJS: `fs-read`):**
 * >   - *Resources*
 * > - **System Info (Deno: `sys`):**
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
 * > - **Environment Variable (Deno: `env`):**
 * >   - `PATHEXT` (Windows Platforms)
 * > - **File System - Read (Deno: `read`; NodeJS: `fs-read`):**
 * >   - *Resources*
 * > - **System Info (Deno: `sys`):**
 * >   - `gid` (POSIX/UNIX Platforms)
 * >   - `uid` (POSIX/UNIX Platforms)
 * @param {string} path Path.
 * @param {IsExecutablePathOptions} [options={}] Options.
 * @returns {boolean} Determine result.
 */
export function isExecutablePathSync(path: string, options: IsExecutablePathOptions = {}): boolean {
	return isExecutablePathInternalSync(path, options);
}
