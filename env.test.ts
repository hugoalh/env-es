import { env } from "./env.ts";
Deno.test("General Get All", {
	permissions: {
		env: true
	}
}, () => {
	console.log(env.getAll());
});
Deno.test("PATH Get", {
	permissions: {
		env: ["PATH"]
	}
}, () => {
	console.log(env.path.get());
});
Deno.test("PATHEXT Get", {
	permissions: {
		env: ["PATHEXT"]
	}
}, () => {
	console.log(env.pathext.get());
});
