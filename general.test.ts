import { getAllEnv } from "./general.ts";
Deno.test("Get All", {
	permissions: {
		env: true
	}
}, () => {
	console.log(getAllEnv());
});
