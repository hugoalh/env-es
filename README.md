# Env (ES)

[**⚖️** MIT](./LICENSE.md)

🔗
[GitHub](https://github.com/hugoalh/env-es)
[JSR](https://jsr.io/@hugoalh/env)
[NPM](https://www.npmjs.com/package/@hugoalh/env)

An ECMAScript module for enhanced environment variables operation.

## 🎯 Targets

| **Runtime \\ Source** | **GitHub Raw** | **JSR** | **NPM** |
|:--|:-:|:-:|:-:|
| **[Bun](https://bun.sh/)** >= v1.1.0 | ❌ | ❓ | ✔️ |
| **[Deno](https://deno.land/)** >= v2.1.0 | ✔️ | ✔️ | ✔️ |
| **[NodeJS](https://nodejs.org/)** >= v20.9.0 | ❌ | ❓ | ✔️ |

## 🛡️ Runtime Permissions

- Environment Variable (Deno: `env`)
  - `PATH` (Optional)
  - `PATHEXT` (Optional, Windows Platforms)
  - *Resources*
- File System - Read (Deno: `read`; NodeJS: `fs-read`)
  - *Resources* (Optional)
- System Info (Deno: `sys`)
  - `gid` (Optional, POSIX/UNIX Platforms)
  - `uid` (Optional, POSIX/UNIX Platforms)

## #️⃣ Sources

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

> [!NOTE]
> - It is recommended to include tag for immutability.
> - These are not part of the public APIs hence should not be used:
>   - Benchmark/Test file (e.g.: `example.bench.ts`, `example.test.ts`).
>   - Entrypoint name or path include any underscore prefix (e.g.: `_example.ts`, `foo/_example.ts`).
>   - Identifier/Namespace/Symbol include any underscore prefix (e.g.: `_example`, `Foo._example`).

## ⤵️ Entrypoints

| **Name** | **Path** | **Description** |
|:--|:--|:--|
| `.` | `./mod.ts` | Default. |

## 🧩 APIs

- ```ts
  const env: Env;
  ```
- ```ts
  interface Env extends EnvGeneral {
    delimitation: EnvDelimitation;
    path: EnvPath;
    pathext: EnvPathExt;
  }
  ```
- ```ts
  interface EnvGeneral {
    delete(...keys: readonly (string | RegExp)[]): void;
    get(key: string): string | undefined;
    getAll(): Record<string, string>;
    has(key: string | RegExp): boolean;
    set(key: string, value: string): void;
  }
  ```
- ```ts
  interface EnvDelimitation {
    add(key: string, ...values: readonly string[]): void;
    addAtEnd(key: string, ...values: readonly string[]): void;
    addAtIndex(key: string, index: number, ...values: readonly string[]): void;
    addAtStart(key: string, ...values: readonly string[]): void;
    deDuplicate(key: string): void;
    delete(key: string, ...values: readonly string[]): void;
    get(key: string): string[];
    set(key: string, values: readonly string[]): void;
  }
  ```
- ```ts
  interface EnvPath {
    add(...values: readonly string[]): void;
    addAtEnd(...values: readonly string[]): void;
    addAtIndex(index: number, ...values: readonly string[]): void;
    addAtStart(...values: readonly string[]): void;
    deDuplicate(): void;
    delete(...values: readonly string[]): void;
    get(): string[];
  }
  ```
- ```ts
  interface EnvPathExt {
    add(...values: readonly string[]): void;
    addAtEnd(...values: readonly string[]): void;
    addAtIndex(index: number, ...values: readonly string[]): void;
    addAtStart(...values: readonly string[]): void;
    deDuplicate(): void;
    delete(...values: readonly string[]): void;
    get(): string[] | null;
    reset(): void;
  }
  ```

> [!NOTE]
> - For the full or prettier documentation, can visit via:
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/doc/)
>   - [JSR](https://jsr.io/@hugoalh/env)

## ✍️ Examples

- ```ts
  env.set("SOME_VAR", "Value");
  env.has("SOME_VAR");
  //=> true
  env.get("SOME_VAR");
  //=> "Value"
  ```
