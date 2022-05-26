import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { actSearchCity, actGetWeatherData } from '../actions/index';
import { API_KEY } from "../const/ApiKey";

const WeatherDataLeft = React.lazy(() => import('./WeatherData/Left'));
const WeatherDataRight = React.lazy(() => import('./WeatherData/Right'));

function WeatherData(props) {

	const [showContent, setShowContent] = useState(false);

	useEffect(() => {
		if (
		    typeof props.weather_data === 'object' &&
		    !Array.isArray(props.weather_data) &&
		    props.weather_data !== null
		) {
		    setShowContent(true);
		}
	},[props.weather_data]);

	return(
		<div className="row mb-5 text-left">
			<div className="col-left col-md-4">
				{(showContent) ? <WeatherDataLeft /> : ''}
			</div>
			<div className="col-right col-md-8">
				{(showContent) ? <WeatherDataRight /> : ''}
			</div>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	return {
		weather_data: state.weather_data,
	};
};

export default connect(mapStateToProps)(WeatherData)
