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
		- Run a [http-server](https://www.npmjs.com/package/http-server) in the `dist/` folder
	- Before deployment, make sure the server is configured for an SPA otherwise page navigation will not work
	- Whitespaces are removed during bundling process
	- All comments are stripped during bundling process

	
## Further improvements

These are some features that I would have like to have added, but had to cut due to time constraints.

- Add a UI for more advanced filters
- Scroll the active page no. in the pagination to the center when changed.
- Trap the tab focus to only elements inside the active page
- Include the currency system as part of the `<Client>` context rather than recalculate in every instance.
- Add a debounced resize listener to update the `<Client>` dimension data
- Style the rebuy ratio rings as radial `<meter>` elements instead of just a 'border'
- Handle unknown values if the user manually changes the url query parameters
- Add gesture support throughout the app
- Replicate slight parallax effect when scrolling on the details page
- Replace arrows with SVG icons instead of ::pseudo 'content' to prevent screen-reader announcements
- Show 'loading' animations whilst fetching data / images
- Add IE10/11 support with:
	- `fetch()` polyfill
	- `URL()` polyfill
	- `URLSearchParams()` polyfill
