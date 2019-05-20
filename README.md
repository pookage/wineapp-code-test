# WineApp Code-Test 🍷

## Building the App...

**Requires npm or yarn** _(instructions below use npm)_

1. Download, fork, or clone the repo locally
2. In your CLI, navigate to the project directory
3. Run `npm install` to install local dependencies

### ...for Development

4. Run `npm run build-dev` to build the project for local development

	- `webpack-dev-server` will automatically open the project in a new browser tab
	- Skip past HTTPS warnings (caused by no SSL cert for the project)
	- Any changes to files inside the `src/` directory will trigger a hot reload

### ...for Production


4. Run `npm run build-prod` to build the project for deployment

	- Files will be bundled and placed into the `dist/` folder
	- Files expect to be run on-server, so to view the production-build either:
		- Deploy the `dist/` folder to a hosting provider
			**-OR-**
		- Run a http-server in the `dist/` folder
	- Before deployment, make sure the server is configured for an SPA otherwise page navigation will not work
	- Whitespaces are removed during bundling process
	- All comments are stripped during bundling process

	
