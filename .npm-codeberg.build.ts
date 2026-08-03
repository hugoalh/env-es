import {
	readManifest,
	transform
} from "DNT";
const manifest = await readManifest("jsr.jsonc");
await transform({
	copyEntries: [
		"LICENSE.md",
		"README.md"
	],
	//@ts-ignore Lazy type.
	entrypointsScript: manifest.exports,
	generateDeclarationMap: true,
	mappings: {
		"https://raw.githubusercontent.com/hugoalh/runtime-info-es/v0.4.0/mod.ts": {
			name: "@hugoalh/runtime-info",
			version: "^0.4.0"
		}
	},
	metadata: {
		//@ts-ignore Lazy type.
		name: manifest.name,
		//@ts-ignore Lazy type.
		version: manifest.version,
		description: "A module for enhanced environment variables operation.",
		keywords: [
			"env",
			"environment-variables"
		],
		homepage: "https://codeberg.org/hugoalh/env-es#readme",
		bugs: {
			url: "https://codeberg.org/hugoalh/env-es/issues"
		},
		license: "MIT",
		author: "hugoalh",
		repository: {
			type: "git",
			url: "git+https://codeberg.org/hugoalh/env-es.git"
		},
		private: false,
		publishConfig: {
			access: "public"
		}
	},
	outputDirectory: "dist/npm-codeberg",
	outputDirectoryPreEmpty: true
});
