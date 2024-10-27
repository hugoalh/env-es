import { getAllExecutable } from "./executable.ts";
Deno.test("Get All", {
	permissions: {
		env: ["PATH", "PATHEXT"],
		read: true,
		sys: ["gid", "uid"]
	}
}, async () => {
	for await (const value of getAllExecutable()) {
		console.log(value);
	};
});
