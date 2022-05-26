import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

function Today(props) {

	const [todayWeather, setTodayWeather] = useState(props.weather_data.daily[0]);
	const [todayVisibility, settodayVisibility] = useState(props.weather_data.current.visibility);

	useEffect(() => {
		if (
		    typeof props.weather_data === 'object' &&
		    !Array.isArray(props.weather_data) &&
		    props.weather_data !== null
		) {
			setTodayWeather(props.weather_data.daily[0]);
			settodayVisibility(props.weather_data.current.visibility);
		}
	},[props.weather_data]);

	return(
		<div className="row">
			<div className="col-sm-4 pt-4 pb-4">
				<h6>UV index</h6>
				<h2>{todayWeather.uvi}</h2>
			</div>
			<div className="col-sm-4 pt-4 pb-4">
				<h6>Wind Status</h6>
				<h2>{todayWeather.wind_speed} km/h</h2>
			</div>
			<div className="col-sm-4 pt-4 pb-4">
				<h6>Sunrise & Sunset</h6>
				<h4><small>Sunrise: </small>{getTime(todayWeather.sunrise)}</h4>
				<h4><small>Sunset: </small>{getTime(todayWeather.sunset)}</h4>
			</div>
			<div className="col-sm-4 pt-4 pb-4">
				<h6>Humidity</h6>
				<h2>{todayWeather.humidity} %</h2>
			</div>
			<div className="col-sm-4 pt-4 pb-4">
				<h6>Visibility</h6>
				<h2>{todayVisibility/1000} km</h2>
			</div>
			<div className="col-sm-4 pt-4 pb-4">
				<h6>Pressure</h6>
				<h2>{todayWeather.pressure}</h2>
			</div>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	return {
		weather_data: state.weather_data
	};
};

function getTime(time) {
    var date = new Date(time*1000);

    return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}

export default connect(mapStateToProps)(Today)
