import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { actRefresh } from '../actions/index';

const WeatherDataLeft = React.lazy(() => import('./WeatherData/Left'));
const WeatherDataRight = React.lazy(() => import('./WeatherData/Right'));

function WeatherData(props) {

	const [showContent, setShowContent] = useState(false);

	const Ref = useRef(null);

    const delay = 60; //unit second

    const autoRefresh = (e) => {
        if (Ref.current) {
        	clearInterval(Ref.current);
        }
        const id = setInterval(() => {
        	props.refresh({
        		name: props.city_data.name,
        		lat: props.city_data.lat,
        		lon: props.city_data.lon
        	});
        }, delay*1000)
        Ref.current = id;
    }

	useEffect(() => {
		if (
		    typeof props.weather_data === 'object' &&
		    !Array.isArray(props.weather_data) &&
		    props.weather_data !== null
		) {
		    setShowContent(true);
		}
		if (
		    typeof props.city_data === 'object' &&
		    !Array.isArray(props.city_data) &&
		    props.city_data !== null
		) {
			autoRefresh();
		}
	},[props.weather_data, props.city_data]);

	const RenderContent = () => {
		return <div className="row mb-5 text-left">
			<div className="col-left col-md-4">
				<WeatherDataLeft />
			</div>
			<div className="col-right col-md-8">
				<WeatherDataRight />
			</div>
		</div>;
	}

	return(
		<div>
			{(showContent) ? RenderContent() : ''}
		</div>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		refresh: (data) => {
			dispatch(actRefresh(data));
		}
	};
};

const mapStateToProps = (state, ownProps) => {
	return {
		weather_data: state.weather_data,
		city_data: state.city_data
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherData)
