# React Workshop

We will be building a simple UI in react to view and search thermostats.

Please have the following installed:

* nodeJS
* Text Editor

## Installation instructions

run `npm install` from the root of this repo

## Run Instructions

run `npm start` from the root of this repo. this will launch a webserver at http://localhost:3001 so simply point your browser there and you'll have the sample template up and running

# Project Structure

All javascript lives under the app/js directory.

* app
    * js
        * components
        * data
    * styles
    
Components are where all of your react components will live. They typically use a .jsx file ending.

In the data folder there is the raw data we will be working with. 

Styles contains the css file for styling your application, though there are a few different options available when using react.

## Step 1 - React Components

The most important thing about react components are its properties. 
React components come in two flavours - Smart and Dumb

Smart components contain actual application logic and can maintain internal state while dumb components simply render JSX based on the properties passed in.
They are dumb pipes and as such are extremely easy to test since they contain no internal state. 

Smart Component



	import React from 'react';
	export default class MyComponent extends React.Component {
		constructor(props) {
			super(props);
		}
		
		render() {
			// props available at this.props;
			return (<div>hi</div>); // This is JSX
		}
	}


Dumb Component

	import React from 'react';
	
	export default (props) => {
		// props are passed in directly
		return (<div>hi</div>);  // this is JSX
	}


The HTML looking tags in the javascript is called JSX and are actual javascript object 
represntations of their DOM counterparts. 

Every app that is going to do something useful needs at least one smart component. So lets create one for our application. 
We can call it `ThermostatAppContainer`.


## Step 2 - Tie the ThermostatAppContainer Component into the component heirarchy

All react apps have a root node, in this case it is a component called Root.jsx. We want to import our ThermostatAppContainer.jsx
file into the Root.jsx and have it render out. 

At the top of  Root.jsx

    import ThermostatAppContainer from './ThermostatAppContainer.jsx';
    
now you can use that component in any JSX and pass it props if you want.

in Root.jsx render function change the `return (<h1>React Workshop</h1>);` to 
`return (<ThermostatAppContainer />);`

your Root.jsx file should now look like:

	import React from 'react';
	import ThermostatAppContainer from './ThermostatAppContainer.jsx';
	
	export default class Root extends React.Component {
		render() {
			return (<ThermostatAppContainer/>);
		}
	}
	
## Step 3 - getting some data to work with
 
 no application is useful without any data so lets bring some into our smart component
 `ThermostatAppContainer` by importing the data.js file from `app/js/data/data.js`
 
 normally imports are relative so your import statement should look like:
 
 `import data from '../data/data`;
 
 you can leave the file ending off for anything that has a .js file ending. This is all configurable too so you could support jsx too.
 
