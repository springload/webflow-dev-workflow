import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["index.ts"],
  bundle: true,
  minify: true,
  outfile: "dist/out.js",
});
