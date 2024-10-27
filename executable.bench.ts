import {
	getAllExecutable,
	getAllExecutableSync
} from "./executable.ts";
Deno.bench("Get All Async", {
	permissions: {
		env: ["PATH", "PATHEXT"],
		read: true,
		sys: ["gid", "uid"]
	}
}, async () => {
	for await (const value of getAllExecutable()) {
		void value;
	};
});
Deno.bench("Get All Sync", {
	permissions: {
		env: ["PATH", "PATHEXT"],
		read: true,
		sys: ["gid", "uid"]
	}
}, () => {
	for (const value of getAllExecutableSync()) {
		void value;
	};
});
