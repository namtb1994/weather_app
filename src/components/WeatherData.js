import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { actAutoRefresh } from '../actions/index';

const WeatherDataLeft = React.lazy(() => import('./WeatherData/Left'));
const WeatherDataRight = React.lazy(() => import('./WeatherData/Right'));

function WeatherData(props) {

	const [showContent, setShowContent] = useState(false);

	const Ref = useRef(null);

    const [timer, setTimer] = useState('00:00:00');

    const delay = 30;

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }

    const startTimer = (e) => {
        let { total, hours, minutes, seconds } = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        } else {
        	props.autoRefresh({
				name: props.city_data.name,
				lat: props.city_data.lat,
				lon: props.city_data.lon
			});
        	clearTimer(getDeadTime());
        }
    }

    const clearTimer = (e) => {
        setTimer('00:00:'+delay);
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + delay);
        return deadline;
    }

	useEffect(() => {
		if (
		    typeof props.weather_data === 'object' &&
		    !Array.isArray(props.weather_data) &&
		    props.weather_data !== null
		) {
			console.log(props.weather_data.current);
		    setShowContent(true);
		}
		if (
		    typeof props.city_data === 'object' &&
		    !Array.isArray(props.city_data) &&
		    props.city_data !== null
		) {
			clearTimer(getDeadTime());
		}
	},[props.weather_data, props.city_data]);

	const RenderContent = () => {
		if (showContent) {
			return <div className="row mb-5 text-left">
				<div className="col-left col-md-4">
					<WeatherDataLeft />
				</div>
				<div className="col-right col-md-8">
					<WeatherDataRight />
				</div>
			</div>;
		}
	}

	return(
		<RenderContent/>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		autoRefresh: (data) => {
			dispatch(actAutoRefresh(data));
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
