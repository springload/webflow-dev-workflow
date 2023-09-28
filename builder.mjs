import * as esbuild from "esbuild";

// entryPoints = "client-projects/[current project]/[the file you're working on]"
// e.g. "client-projects/test-project/index.ts"

// outfile = "client-projects/[current project]/dist/out.js"
// e.g. "client-projects/test-project/dist/out.js"

const context = await esbuild.context({
  entryPoints: [
    "client-projects/test-project/index.ts",
    // "client-projects/test-project/index.tsx",
  ],
  bundle: true,
  minify: true,
  outfile: "client-projects/test-project/dist/out.js",
});

// Enable watch mode
await context.watch();

// Enable serve mode
await context.serve();
