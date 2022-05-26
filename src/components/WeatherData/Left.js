import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

function Left(props) {

	const [cityName, setCityName] = useState(props.city_name);
	const [currentWeather, setCurrentWeather] = useState(props.weather_data);

	useEffect(() => {
		if (
		    typeof props.weather_data === 'object' &&
		    !Array.isArray(props.weather_data) &&
		    props.weather_data !== null
		) {
			setCityName(props.city_name);
			setCurrentWeather(props.weather_data);
		}
	},[props.weather_data]);

	return(
		<div className="pt-5 pb-5 pl-4 pr-4 bg-dark text-white">
			<h3>{cityName}</h3>
			<h1 className="mt-3 mb-3">{currentWeather.temp.toFixed()} °C</h1>
			<h4>{getTime(currentWeather.dt)}</h4>
			<h6>{currentWeather.weather[0].description}</h6>
			<h6>Clouds {currentWeather.clouds}%</h6>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	return {
		weather_data: state.weather_data.current,
		city_name: state.city_data.name,
	};
};

function getTime(time) {
    var date = new Date(time*1000);
    var day = date.getDay();
    switch(day) {
		case 1:
			day = "Monday";
			break;
		case 2:
			day = "Tuesday";
			break;
		case 3:
			day = "Wednesday";
			break;
		case 4:
			day = "Thursday";
			break;
		case 5:
			day = "Friday";
			break;
		case 6:
			day = "Saturday";
			break;
		default:
			day = "Sunday";
			break;
    }

    return day+", "+date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}

export default connect(mapStateToProps)(Left)
