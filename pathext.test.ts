import { getEnvPathExt } from "./pathext.ts";
Deno.test("PATHEXT Get", {
	permissions: {
		env: ["PATHEXT"]
	}
}, () => {
	console.log(getEnvPathExt());
});
