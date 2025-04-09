import { ok } from "node:assert";
import {
	getAllExecutable,
	getExecutable
} from "./executable.ts";
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
Deno.test("Get `git`", {
	permissions: {
		env: ["PATH", "PATHEXT"],
		read: true,
		sys: ["gid", "uid"]
	}
}, async () => {
	ok(await getExecutable("git"));
});
