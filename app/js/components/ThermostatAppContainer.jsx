import React from 'react';
import data from '../data/data';
import ThermostatList from './ThermostatList.jsx';
import FilterControl from './FilterControl.jsx';

export default class ThermostatAppContainer extends React.Component {
	constructor(props) {
		super(props);
		this.onChangeFilter = this.onChangeFilter.bind(this);
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