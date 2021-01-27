## Project Details

 - webpack  4
 - antd
 - react-icons
 - context

## Project Structure

 - app
	 - assets
		 - images => static images of whole project
		 - style => scss for project under this folder
            |- custome => all SCSS file related to all component 
            |- _base.scss => base scss file / global SCSS file
            |- _vars.scss => scss variable file
	 - components
	 - config
		 - axios.js => app api call done via axios.js
		 - Context.js => Context Management file
		 - icons.js => icons for project, used react-icons library for icons
	 - components
		 - container => route component main folder
		 - constants.js => all constant are declared
		 - index.html => entry point of whole application
		 - index.js => entry point of react application
		 - route.js => Defined all routes of project
 - package.json
 - server.js
 - webpack.config.js
 - gitignore

## Steps to add new Route
1. Create React Componet under app/containers folder
2. import component in route.js file


## Steps to add new api call
1. Create Function in app/config/axios.js and export created function
2. import function from axios.js file in component 
