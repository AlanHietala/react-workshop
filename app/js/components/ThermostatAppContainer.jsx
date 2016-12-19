import React from 'react';
import data from '../data/data';
import ThermostatList from './ThermostatList.jsx';
import FilterControl from './FilterControl.jsx';

export default class ThermostatAppContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {thermostats: data};
		this.onChangeFilter = this.onChangeFilter.bind(this);
	}

	onChangeFilter(event) {
		const filterText = event.target.value.toLowerCase();
		const filteredThermostats = data.filter((thermostat) => {
			return thermostat.name.toLowerCase().indexOf(filterText) > -1;
		});

		this.setState({thermostats: filteredThermostats});
	}

	render() {
		// onchange expected on FilterControl
		return (<div>
			<FilterControl onChange={this.onChangeFilter} />
			<ThermostatList thermostatList={this.state.thermostats} />
		</div>);
	}
}