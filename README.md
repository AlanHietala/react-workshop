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

# Part 1 - React Components

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


