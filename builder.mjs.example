import * as esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";

// entryPoints = "client-projects/[your project]/[the file you're working on]"
// outfile = "client-projects/[your project]/dist/out.js"
// outdir = "client-projects/your project/dist"

const context = await esbuild.context({
  entryPoints: [
    "client-projects/test-project/index.ts",
    "client-projects/test-project/react-component-test.tsx",
    "client-projects/test-project/scss/styles.scss",
  ],
  bundle: true,
  minify: true,
  sourcemap: true,
  outdir: "client-projects/test-project/dist",
  plugins: [sassPlugin()],
});

// Enable watch mode
await context.watch();

// Enable serve mode
await context.serve();
