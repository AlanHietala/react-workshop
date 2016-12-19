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
 
## step 4 - Passing data as props

now we've got some data we want to do something with it. lets create a ThermostatList.jsx component but this time it will be a dumb component.

Now we're going to assume that the thermostatList will be passed in as the property `thermostatList`

It can be accessed on the props variable in the function like 'const thermostatList = props.thermostatlist'

	export default (props) => {
		const thermostatList = props.thermostatList;
		const thermostatCount = thermostatList.length;
		return (<div>Thermostat Count: {thermostatCount}</div>);
	}

If you want to use some es2015 features called destructuring the same code can be written like `const {thermostatList} = props;`
this means create a const variable called thermostatList from the property thermostatList on the props variable. 

	export default (props) => {
		const {thermostatList} = props;
		const thermostatCount = thermostatList.length;
		return (<div>Thermostat Count: {thermostatCount}</div>);
	}

You can even destructure parameters directly! so instead of writing 

	const {thermostatList} = props; 

you can just destructure the parameters to the function like 

	({thermosatList}) => {
		const thermostatCount = thermostatList.length;
		return (<div>Thermostat Count: {thermostatCount}</div>);
	}
	
Now lets render our ThermostatList out from the `ThermostatAppContainer` component first import the file and then add that component to the `ThermostatAppContainer` jsx

We can also now pass along the data as the prop thermostatList to it. 

The jsx will look like:

	return (<div><ThermostatList thermostatList={data} /></div>);
	
JSX uses curly brackets to evaluate any code within them, in this case we're just passing data along that we previously
imported.

you should see the count printed out. 

## Step 5 - creating the thermostat Detail JSX and tie it into the thermostatList

We'll need to create a thermostat Detail Dumb component to render out an individual thermostat. lets call it `ThermostatDetail`. It will have a thermostat prop which we'll use to dump out the name field.

	import React from 'react';
    
    export default ({thermostat}) => {
    	return (<div>{thermostat.name}</div>)
    }
    
Now we'll need to hook this into the `ThermostatList` component. Right now it just displays the count but we'll need to generate a component for each item in the `thermostatList` prop and render into the JSX.

JSX lets you render a group of components by dumping an array of them inside some existing tags like so:

	<div>{ArrayOfComponents}</div>
	
This makes it easy to use thermostatList.map() in order to map from an array of javascript objects to an array of components. 

	const thermostats = thermostatList.map((thermostat) => { 
		return (<ThermostatDetail key={thermostat.identifier} thermostat={thermostat} />);
	});
	
now we have a list of components to render into the `ThermostatList` JSX.

make sure to import the new `ThermostatDetail` component at the top first. All assembled it should look like:

	import React from 'react';
	import ThermostatDetail from './ThermostatDetail.jsx';
	
	export default (props) => { // props could be destructured to make this more succinct
		const {thermostatList} = props;
		const thermostats = thermostatList.map((thermostat) => {
			return (<ThermostatDetail thermostat={thermostat} />);
		});
	
		return (<div>{thermostats}</div>);
	}

You may wonder why the key is provided, React does some fancy stuff behind the scenes and in order to optimize things fully 
when you create an array of components each one should have a key. You can omit it but react will complain with a warning.