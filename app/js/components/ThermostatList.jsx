import React from 'react';
import ThermostatDetail from './ThermostatDetail.jsx';

export default (props) => { // props could be destructured to make this more succinct
	const {thermostatList} = props;
	const thermostats = thermostatList.map((thermostat) => {
		return (<ThermostatDetail thermostat={thermostat} />);
	});

	return (<div>{thermostats}</div>);
}