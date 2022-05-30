import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

function Week(props) {

	const [weekWeather, setWeekWeather] = useState(props.weather_data.daily);
	const [daySelected, setDaySelected] = useState(0);
	const [tempCurrent, setTempCurrent] = useState(props.weather_data.current.temp);

	useEffect(() => {
		if (
		    typeof props.weather_data === 'object' &&
		    !Array.isArray(props.weather_data) &&
		    props.weather_data !== null
		) {
			setWeekWeather(props.weather_data.daily);
		}
	},[props.weather_data]);

	const RenderItem = (props) => {
		const itemData = props.itemData;
		const classActive = props.selected;
		const classList = classActive+" col-sm-3 pt-4 pb-4"
		return <div onClick={event => handleItemClick(event, props.index)} className={classList} style={{cursor:"pointer"}}>
			<h6>{getTime(itemData.dt)}</h6>
			<div className="content pt-4">
				<h2>{itemData.temp.min.toFixed()+"° - "+itemData.temp.max.toFixed()+"°"}</h2>
			</div>
		</div>;
	}

	const handleItemClick = (event, index) => {
		setDaySelected(index);
	};

	const listItems = weekWeather.map((item, index) => (
		<RenderItem selected={(index == daySelected)?"bg-info":""} key={index.toString()} index={index} itemData={item} />
	));

	return(
		<div>
			<div className="row pl-3">
				{listItems}
			</div>
			<div className="row mt-5">
				<div className="col-md-12 mb-3">
					<h4>{getTime(weekWeather[daySelected].dt)}</h4>
				</div>
				<div className="col-md-6">
					<p>Temp current: {(daySelected == 0) ? tempCurrent.toFixed()+' °C' : 'N/A'}</p>
					<p>Temp: {weekWeather[daySelected].temp.min} °C - {weekWeather[daySelected].temp.max} °C</p>
					<p>Humidity: {weekWeather[daySelected].humidity} %</p>
					<p>Wind Speed: {weekWeather[daySelected].wind_speed} km/h</p>
				</div>
				<div className="col-md-6">
					<p>Sunrise: {getTime(weekWeather[daySelected].sunrise, 'hm')}</p>
					<p>Sunset: {getTime(weekWeather[daySelected].sunset, 'hm')}</p>
					<p>Description: {weekWeather[daySelected].weather[0].description}</p>
					<p>Atmospheric pressure: {weekWeather[daySelected].pressure} hPa</p>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	return {
		weather_data: state.weather_data
	};
};

function getTime(time, type = null) {
    var date = new Date(time*1000);
    var result;
    if (type == 'hm') {
    	result = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    } else {
	    const options = { weekday: 'short'};
	    var day = new Intl.DateTimeFormat('en-US', options).format(date);
	    result = day+", "+date.getDate()+'/'+(date.getMonth()+1);
    }

    return result;
}

export default connect(mapStateToProps)(Week)
