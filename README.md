# Env (ES)

[**⚖️** MIT](./LICENSE.md)

🔗
[DistBoard @hugoalh](https://hugoalh.github.io/distboard/env_ecmascript)
● [GitHub](https://github.com/hugoalh/env-es)
● [JSR](https://jsr.io/@hugoalh/env)
● [NPM](https://www.npmjs.com/package/@hugoalh/env)

An ECMAScript module for enhanced environment variables operation.

## 🎯 Runtime Targets

Any runtime which support ECMAScript should able to use this; These runtimes are officially supported:

- **[Bun](https://bun.sh/)** >= v1.1.0
- **[Deno](https://deno.land/)** >= v2.1.0
- **[NodeJS](https://nodejs.org/)** >= v20.9.0

## 🛡️ Runtime Permissions

- Environment Variable (Deno: `env`)
  - `PATH` (Optional)
  - `PATHEXT` (Optional, Windows Platforms)
- File System - Read (Deno: `read`; NodeJS: `fs-read`) (Optional)
- System Info (Deno: `sys`)
  - `gid` (Optional, POSIX/UNIX Platforms)
  - `uid` (Optional, POSIX/UNIX Platforms)

## #️⃣ Sources & Entrypoints

- GitHub Raw
  ```
  https://raw.githubusercontent.com/hugoalh/env-es/{Tag}/mod.ts
  ```
- JSR
  ```
  jsr:@hugoalh/env[@{Tag}]
  ```
- NPM
  ```
  npm:@hugoalh/env[@{Tag}]
  ```

| **Name** | **Path** | **Description** |
|:--|:--|:--|
| `.` | `./mod.ts` | Default. |

> [!NOTE]
> - Different runtimes have vary support for the sources and entrypoints, visit the runtime documentation for more information.
> - It is recommended to include tag for immutability.
> - These are not part of the public APIs hence should not be used:
>   - Benchmark/Test file (e.g.: `example.bench.ts`, `example.test.ts`).
>   - Entrypoint name or path include any underscore prefix (e.g.: `_example.ts`, `foo/_example.ts`).
>   - Identifier/Namespace/Symbol include any underscore prefix (e.g.: `_example`, `Foo._example`).

## 🧩 APIs

- ```ts
  function deleteEnv(key: string | RegExp): void;
  ```
- ```ts
  function getAllEnv(): Record<string, string>;
  ```
- ```ts
  function getEnv(key: string): string | undefined;
  ```
- ```ts
  function hasEnv(key: string | RegExp): boolean;
  ```
- ```ts
  function setEnv(key: string, value: string): void;
  ```
- ```ts
  function deleteEnvPath(...values: readonly string[]): void;
  ```
- ```ts
  function getEnvPath(): string[];
  ```
- ```ts
  function pushEnvPath(...values: readonly string[]): void;
  ```
- ```ts
  function deleteEnvPathExt(...values: readonly string[]): void;
  ```
- ```ts
  function getEnvPathExt(): string[];
  ```
- ```ts
  function pushEnvPathExt(...values: readonly string[]): void;
  ```

> [!NOTE]
> - For the full or prettier documentation, can visit via:
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/doc/)
>   - [JSR](https://jsr.io/@hugoalh/env)

## ✍️ Examples

- ```ts
  setEnv("SOME_VAR", "Value");
  hasEnv("SOME_VAR");
  //=> true
  getEnv("SOME_VAR");
  //=> "Value"
  ```
