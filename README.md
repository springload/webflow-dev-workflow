# webflow-dev-workflow
An alternative to using Webflow's built in editor. A standard workflow to allow developers to program locally, bundle, and export code to a Webflow project.

This repo is public to allow for the use of JSDelivr's CDN. Do not include any sensitive data.

Clone repo and run 

```npm install```

Create a new folder for the project you are working on with a ```index.ts``` file inside.

Add ```console.log('test success')``` in the ```index.ts``` file.

## Local development

Edit the ```entryPoints``` and ```outfile``` values in the ```builder.mjs``` file to match your project.

```entryPoints: ["client-projects/[current project]/[the file you’re working on]"```
e.g. ```"entryPoints: ["client-projects/test-project/index.ts"]```

```outfile: "client-projects/[current project]/dist/out.js"```
e.g. ```outfile: "client-projects/test-project/dist/out.js"```
 

Build the JS file with:

```npm run build```

This creates a minified out.js file, serves at port 8000, and watches for changes.

In Webflow, go to site-settings >> custom code >> footer code.

Add ```src=“http://localhost:8000/out.js”``` within the script tag.

![image](https://github.com/springload/webflow-dev-workflow/assets/27249781/5b2573e6-21fd-4652-b0e5-cbe084149da4)

Save and publish.

Refresh your published site to see changes, no need to re-publish via Webflow to see changes after this point. Look for "test success" in console.


## Prod / CDN

Once you have pushed your changes to GitHub, and you want to serve your code via a CDN, use JSDeliver’s CDN.
Go to: ```https://cdn.jsdelivr.net/gh/springload/webflow-dev-workflow/client-projects/[your project]/dist/out.js```
You should see a minified version of your js file (+ any other modules you imported).

In Webflow, go to site-settings >> custom code >> footer code.

Add ```src=“https://cdn.jsdelivr.net/gh/springload/webflow-dev-workflow/client-projects/[current project]/dist/out.js”``` within the script tag.

![image](https://github.com/springload/webflow-dev-workflow/assets/27249781/3fce42cc-4e66-443a-8aa1-69c9f817d546)

Save and publish

Refresh your published site to see changes.
