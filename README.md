# webflow-dev-workflow

An alternative to using Webflow's built in editor. A standard workflow to allow developers to program locally, bundle, and export code to a Webflow project.

This repo is public to allow for the use of JSDelivr's CDN. Do not include any sensitive data.

## Initial setup

Clone repo and run
`yarn`
to install dependencies.

Within `/client-projects`, create a new folder for the project you are working on, with an `index.ts` file inside. (`/client-projects/[current-project]/index.ts`)

Add `console.log('[message of your choice]')` in the `index.ts` file so you can test it (I like `"woof!"`, but you do you.)

## Local development

### Set up builder file

If there's already a `builder.mjs` file set up for your project at `client-projects/[current project]/dist/builder.mjs`, copy that file to the repo's root directory.

Otherwise:

1. in the root directory, make a copy of `builder.mjs.example` named `builder.mjs`
1. Edit the `entryPoints` and `outdir` values in the `builder.mjs` file to match your project.
   `entryPoints: ["client-projects/[current project]/[the file you’re working on]"`
   e.g. `"entryPoints: ["client-projects/test-project/index.ts"]`
   `outdir: "client-projects/[current project]/dist"`
   e.g. `outdir: "client-projects/test-project/dist"`

### Build your JS & CSS files

`yarn build` will now:

- create minified js and css files in your designated `outdir` directory
- serve them at port 8000
- watch for changes.

### Add code to Webflow

In Webflow, go to _Site settings >> Custom code_

- add CSS files to the _Head code_ section in a `<link>`, e.g.
  `<link rel="stylesheet" href="http://localhost:8000/scss/styles.css"/>`

- add JS files to the _Footer code_ section in a `<script>`, e.g.
  `<script src="http://localhost:8000/index.js"></script>`
  ![image](https://github.com/springload/webflow-dev-workflow/assets/27249781/5b2573e6-21fd-4652-b0e5-cbe084149da4)

Save and publish.

Refresh your published site to see changes, there's no need to re-publish via Webflow to see changes after this point.
Look for your logged message in the console.

## Prod / CDN

1. In the root directory, copy your current `builder.mjs` (which is ignored by git) to your project's subdirectory`[client-projects]/[current project]/builder.mjs` (where it will be tracked).
   Commit all of your changes and push to a branch with a name following this structure:
   `[your-project]/[type-of-change]/[ticket-number-if-one-exists]--[description]`
   eg.
   `the-lumery/chore/ABC-204--update-readme`

1. Once you have pushed your changes to GitHub, and you want to serve your code via a CDN, use JSDeliver’s CDN.
   Go to: `https://cdn.jsdelivr.net/gh/springload/webflow-dev-workflow/client-projects/[current project]/dist/index.js`
   You should see a minified version of your js file (+ any other modules you imported).

1. If this is not your first deployment of this script, you will need to purge the CDN cache. Go to https://www.jsdelivr.com/tools/purge, and enter the URL of your JS file, and any other files which you would like to update (one per line), e.g. `https://cdn.jsdelivr.net/gh/springload/webflow-dev-workflow/client-projects/[current project]/dist/index.js`

1. In Webflow, go to _Site Settings >> Custom code >> Footer code_ (or _Head code_ for CSS).
   Add `src="https://cdn.jsdelivr.net/gh/springload/webflow-dev-workflow/client-projects/[current project]/dist/index.js"` within the script tag, or your CSS link within the link tag.
   ![image](https://github.com/springload/webflow-dev-workflow/assets/27249781/3fce42cc-4e66-443a-8aa1-69c9f817d546)

1. Save and publish.

1. Refresh your published site to see changes.
