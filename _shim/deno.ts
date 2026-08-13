//deno-lint-ignore-file hugoalh/no-import-dynamic -- Shim.
//dnt-shim-ignore
export default globalThis?.Deno ?? (await import("npm:@deno/shim-deno@^0.19.2")).Deno;
