import * as esbuild from "esbuild";

// entryPoints = "client-projects/[your project]/[the file you're working on]"
// outfile = "client-projects/[your project]/dist/out.js"

const context = await esbuild.context({
  entryPoints: ["client-projects/test-project/index.ts"],
  bundle: true,
  minify: true,
  sourcemap: true,
  outfile: "client-projects/test-project/dist/out.js",
});

// Enable watch mode
await context.watch();

// Enable serve mode
await context.serve();
