import * as esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";

// entryPoints = "client-projects/[your project]/[the file you're working on]"
// outfile = "client-projects/[your project]/dist/out.js"
// outdir = "client-projects/your project/dist"

const context = await esbuild.context({
  entryPoints: [
    "./client-projects/the-lumery/index.tsx",
    "./client-projects/the-lumery/scss/styles.scss",
  ],
  bundle: true,
  minify: true,
  sourcemap: true,
  outdir: "client-projects/the-lumery/dist",
  plugins: [sassPlugin()],
});

// Enable watch mode
await context.watch();

// Enable serve mode
await context.serve();
