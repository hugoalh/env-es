import { getEnvPath } from "./path.ts";
Deno.test("PATH Get", {
	permissions: {
		env: ["PATH"]
	}
}, () => {
	console.log(getEnvPath());
});
