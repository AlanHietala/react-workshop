import React from 'react';

export default (props) => { // props could be destructured to make this more succinct
	const {thermostatList} = props;
	const thermostatCount = thermostatList.length;
	return (<div>Thermostat Count: {thermostatCount}</div>);
}