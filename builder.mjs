import * as esbuild from "esbuild";

// entryPoints = "client-projects/[current project]/[the file you working on]"
// e.g. "client-projects/test-project/index.ts"

// outfile = "client-projects/[current project]/dist/out.js"
// e.g. "client-projects/test-project/dist/out.js"

await esbuild.build({
  entryPoints: ["client-projects/test-project/index.ts"],
  bundle: true,
  minify: true,
  outfile: "client-projects/test-project/dist/out.js",
});
