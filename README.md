# React Workshop

We will be building a simple UI in react to view and search thermostats.

Please have the following installed:

* [nodeJS](https://nodejs.org/en/download/)
* Text Editor

## Installation instructions

Clone or download this repo and run `npm install` from the root directory.

## Run Instructions

Run `npm start` from the root of this repo. This will launch a webserver at <a href="http://localhost:3001" target="_blank">http://localhost:3001</a> so simply point your browser there and you'll have the sample template up and running.

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

# What are we building?

We're building a simple app to filter a list of thermostats based on user input.

```
<FilterInput>

Upstairs
Downstairs

```

By typing into the filterInput the list below will only show matches that contain the search term.

## Step 1 - React Components

The most important thing about react components are its properties.
React components come in two flavours - Smart and Dumb

Smart components contain actual application logic and can maintain internal state while dumb components simply render JSX based on the properties passed in.
They are dumb pipes and as such are extremely easy to test since they contain no internal state.

Smart Component


```javascript
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

```
Dumb Component
```javascript
	import React from 'react';

	export default (props) => {
		// props are passed in directly
		return (<div>hi</div>);  // this is JSX
	}

```
The HTML looking tags in the javascript is called JSX and are actual javascript object
representations of their DOM counterparts.

Every app that is going to do something useful needs at least one smart component. So let's create one for our application.
We can call it `ThermostatAppContainer`.


## Step 2 - Tie the ThermostatAppContainer Component into the component hierarchy

All react apps have a root node, in this case it is a component called Root.jsx. We want to import our ThermostatAppContainer.jsx
file into Root.jsx and have it render out.

At the top of  Root.jsx
```javascript
    import ThermostatAppContainer from './ThermostatAppContainer.jsx';
```
Now you can use that component in any JSX and pass it props if you want.

In the Root.jsx render function change the `return (<h1>React Workshop</h1>);` to
`return (<ThermostatAppContainer />);`

Your Root.jsx file should now look like:

```javascript
	// Root.jsx
	import React from 'react';
	import ThermostatAppContainer from './ThermostatAppContainer.jsx';

	export default class Root extends React.Component {
		render() {
			return (<ThermostatAppContainer/>);
		}
	}
```

## Step 3 - Importing the data

No application is useful without any data so let's bring some into our smart component
`ThermostatAppContainer` by importing the data.js file from `app/js/data/data.js`.

Normally imports are relative so your import statement should look like:
```javascript
`import data from '../data/data`;
```

You can leave the file ending off for anything that has a .js file ending. This is all configurable so you could support jsx too.

## Step 4 - Passing data as props

Now we've got some data we want to do something with it. Let's create a ThermostatList.jsx component but this time it will be a dumb component.

We're going to assume that the thermostatList will be passed in as the property `thermostatList`

It can be accessed on the props variable in the function like 'const thermostatList = props.thermostatlist'
```javascript
	export default (props) => {
		const thermostatList = props.thermostatList;
		const thermostatCount = thermostatList.length;
		return (<div>Thermostat Count: {thermostatCount}</div>);
	}
```

If you want to use some es2015 features called destructuring the same code can be written like `const {thermostatList} = props;`
which will create a const variable called thermostatList from the property thermostatList on the props variable.

You can even destructure parameters directly! So instead of writing `const {thermostatList} = props;`, you can just destructure the parameters to the function like:
```javascript
	({thermosatList}) => {
		const thermostatCount = thermostatList.length;
		return (<div>Thermostat Count: {thermostatCount}</div>);
	}
```
Now to render our ThermostatList out from the `ThermostatAppContainer` component, first import the file to `ThermostatAppContainer.jsx`:
```javascript
	import ThermostatList from './ThermostatList.jsx';
```
We render the list component by adding it to the return statement of the render function. We can also pass along the data as a prop to the thermostatList component:
```javascript
	return (<div><ThermostatList thermostatList={data} /></div>);
```
JSX uses curly brackets to evaluate any code within them, in this case we're just passing data along that we previously
imported.

The thermostat count should now be printed out in the browser.

## Step 5 - Adding details to the thermostat list

We'll need to create a `ThermostatDetail` Dumb component to render out an individual thermostat. It will have a thermostat prop which we'll use to dump out the name field.
```javascript
	// ThermostatDetail.jsx
	import React from 'react';

    export default ({thermostat}) => {
    	return (<div>{thermostat.name}</div>)
    }
```
Now we'll add the details to the `ThermostatList` component. Right now the ThermostatList component just displays the count. We'll need to generate a component for each item in the `thermostatList` prop and render them into the JSX.

JSX lets you render a group of components by dumping an array of them inside some existing tags like so:
```javascript
	<div>{ArrayOfComponents}</div>
```
This makes it easy to use `thermostatList.map()` in order to map from an array of javascript objects to an array of components.
```javascript
	const thermostats = thermostatList.map((thermostat) => {
		return (<ThermostatDetail key={thermostat.identifier} thermostat={thermostat} />);
	});
```
Now we have a list of components to render into the `ThermostatList` component.

Make sure to import the new `ThermostatDetail` component at the top first. All assembled it should look like:
```javascript
	// ThermostatList.jsx
	import React from 'react';
	import ThermostatDetail from './ThermostatDetail.jsx';

	export default (props) => { // props could be destructured to make this more succinct
		const {thermostatList} = props;
		const thermostats = thermostatList.map((thermostat) => {
			return (<ThermostatDetail key={thermostat.identifier} thermostat={thermostat} />);
		});

		return (<div>{thermostats}</div>);
	}
```
You may wonder why the key is provided, React does some fancy stuff behind the scenes and in order to optimize things fully
when you create an array of components each one should have a key. You can omit it but react will complain with a warning.

## Step 6 - The Filter Control

In order to filter the list of thermostats you'll need to create an input which we can filter the results by. Let's create a dumb component called `FilterControl`. It will have the prop `onChange` which is a function with the following method signature:

```javascript
	onChange(event)
```

Create an input tag in the jsx and pass along the onChange property. When we pass along a function to use, it will accept the event property. This will be hooked up later in the `ThermostatAppContainer` Smart Component.
```javascript
	// FilterControl.jsx
	import React from 'react';

    export default ({onChange}) => {
    	return (<input onChange={onChange} />)
    }
```
Even through this component is very simple, we still create a component out of it since it could easily be expanded in the future.

Now let's tie it into the `ThermostatAppContainer` right above the `ThermostatList` in the JSX.
```javascript
	// ThermostatAppContainer.jsx
	import React from 'react';
	import data from '../data/data';
	import ThermostatList from './ThermostatList.jsx';
	import FilterControl from './FilterControl.jsx';

	export default class ThermostatAppContainer extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
			// onChange expected on FilterControl
			return (<div>
				<FilterControl />
				<ThermostatList thermostatList={data} />
			</div>);
		}
	}
```
Now FilterControl is expecting an onChange prop, and we'll implement that in the next step.

## Step 7 - Adding onChange to ThermostatAppContainer and passing it down

Up to this point we've only been playing with dumb components, it's time for that to change with our implementation of onChange.

Let's add an onChangeFilter function to the `ThermostatAppContaner` class.
```javascript
	// ThermostatAppContainer.jsx
	import React from 'react';
	import data from '../data/data';
	import ThermostatList from './ThermostatList.jsx';
	import FilterControl from './FilterControl.jsx';

	export default class ThermostatAppContainer extends React.Component {
		constructor(props) {
			super(props);
		}

		onChangeFilter(event) {

		}

		render() {
			// onchange expected on FilterControl
			return (<div>
				<FilterControl onChange={this.onChangeFilter} />
				<ThermostatList thermostatList={data} />
			</div>);
		}
	}
```
Because of how javascript uses prototypal inheritance if we ever want to use this to refer to `ThermostatAppContaner` we
need to bind it. This is one reason ES2015 classes are contentious; they create the illusion of classical inheritance, but it really isn't.

In the constructor we need to add:

```javascript
	`this.onChangeFilter = this.onChangeFilter.bind(this);`
```

We explicitly bind the context of the function to `ThermosatAppContainer` (yay javascript!).
```javascript
	constructor(props) {
		super(props);
		this.onChangeFilter = this.onChangeFilter.bind(this);
	}
```
In step 8 we'll complete the filtering and introduce local state.

## Step 8 - Local State and Filtering

Now we need to actually act upon the text coming from the `onChangeFilter` function. We want to filter the data object but we also don't want to perminantly change it.

We can use a concept of immutability to achieve this. Immutable means it can't change. By ensuring the data object is immutable we can always go back to the original object.

First instead of passing the state object directly into the dumb component, let's assign it to local state in `ThermostatAppContainer` first. React Smart components have internal state. You can set it initially in the constructor by:

```javascript
	this.state = {foo: 'bar'};
```

and set it other places like our onChangeFilter function like:

```javascript
	this.setState({bar: 'bim'});
```

So let's set our initial state to have a property called thermostats which we'll set to data.

```javascript
	this.state = {thermostats: data};
```

Now in our `onChangeFilter` function we can filter the original data list, since we've agreed it is immutable, and assign it back
to `this.setState({thermostats: filteredThermostats});`.

Why do we need to use `this.setState`? `setState()` will merge your changes with the existing ones. You don't need to specify the whole state object, just what you want to change.

To Filter the data we use the filter function on arrays. We also make everything lowercase to make matching simpler:
```javascript
	onChangeFilter(event) {
		const filterText = event.target.value.toLowerCase();
		const filteredThermostats = data.filter((thermostat) => {
			return thermostat.name.toLowerCase().indexOf(filterText) > -1;
		});
		this.setState({thermostats: filteredThermostats});
	}
```

Finally we'll need to change the thermostatList property in the JSX since we don't want to read from the original data constantly any more:

```javascript
	{this.state.thermosats}
```

This solution only works because we've said we don't want to create side effects in the data.


