# webflow-dev-workflow
An alternative to using Webflow's built in editor. A standard workflow to allow developers to program locally, bundle, and export code to a Webflow project.

This repo is public to allow for the use of JSDelivr's CDN. Do not include any sensitive data.

Clone repo and run ```npm install```

Create a new folder for the project you are working on and a new ```index.ts``` file within that folder.

Add a ```console.log('test success')``` in the ```index.ts``` file.

Edit the ```entryPoints``` and ```outfile``` values in the ```builder.mjs``` file to match your project.

```entryPoints``` = ```"client-projects/[current project]/[the file you’re working on]"```
e.g. ```"client-projects/test-project/index.ts"```

```outfile``` = ```"client-projects/[current project]/dist/out.js"```
e.g. ```"client-projects/test-project/dist/out.js"```
 
Build the JS file.
```npm run build```
This creates a minified out.js file. Note: Any modules you import will be added to this.

In Webflow, go to site-settings >> custom code >> footer code.
For local dev, add this link as the ```src``` value within the script tag to your webflow project's custom code.
```<script src="http://localhost:8000/out.js" >```
Save and publish.

Refresh your published site to see changes, no need to re-publish via Webflow to see changes.

Once you have pushed your changes to GitHub, and you want to serve your code via a CDN, use JSDeliver’s CDN.
Go to: ```https://cdn.jsdelivr.net/gh/springload/webflow-dev-workflow/client-projects/[your project]/dist/out.js```
You should see a minified version of your js file (+ any other modules you imported).

In Webflow, go to site-settings >> custom code >> footer code and add this link as the ```src``` value within the script tag.
```<script src=“https://cdn.jsdelivr.net/gh/springload/webflow-dev-workflow/client-projects/[current project]/dist/out.js”></script>```
Save and publish

You should see your changes on the published Webflow site.
