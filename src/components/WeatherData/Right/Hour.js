import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';

function Hour(props) {

	const [times, setTimes] = useState([]);
	const [tempData, setTempData] = useState([]);
	const [feelLikeData, setFeelLike] = useState([]);

	useEffect(() => {
		if (
		    Array.isArray(props.hourly_weather) &&
		    props.hourly_weather !== null
		) {
			var dataTimes = [];
			var dataFeelLike = [];
			var dataTemp = [];
			props.hourly_weather.map((item, index) => {
				if (index < 24) {
					dataTimes.push(getTime(item.dt));
					dataTemp.push(item.temp);
					dataFeelLike.push(item.feels_like);
				}
			});
			setTimes(dataTimes);
			setFeelLike(dataFeelLike);
			setTempData(dataTemp);
		}
	},[props.hourly_weather]);

	return(
		<div className="row">
			<Line
				data={{
					labels: times,
					datasets: [
						{
							data: tempData,
							label: "Temp (°C)",
							borderColor: "#8e5ea2",
							fill: false
						},
						{
							data: feelLikeData,
							label: "Feel like (°C)",
							borderColor: "#3cba9f",
							fill: false
						}
					]
				}}
				options={{
					title: {
						display: false,
						text: "Hourly temps"
					}
				}}
			/>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	return {
		hourly_weather: state.weather_data.hourly
	};
};

function getTime(time) {
    var date = new Date(time*1000);

    return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}

export default connect(mapStateToProps)(Hour)
