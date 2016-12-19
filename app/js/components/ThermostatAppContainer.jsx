import React from 'react';
import data from '../data/data';
import ThermostatList from './ThermostatList.jsx';

export default class ThermostatAppContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (<div><ThermostatList thermostatList={data} /></div>);
	}
}