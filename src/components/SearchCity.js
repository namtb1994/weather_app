import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { actChooseCity, actSearchKeyword } from '../actions/index';

function SearchCity(props) {

	const [resultSearch, setResultSearch] = useState([]);
	const [currentKeyword, setCurrentKeyword] = useState('');
	const [showBoxResult, setShowBoxResult] = useState(false);

	useEffect(() => {
		if (
		    Array.isArray(props.list_city) &&
		    props.list_city !== null
		) {
			if (props.list_city.length) {
				setResultSearch(props.list_city);
				setShowBoxResult(true);
			}
		}
	},[props.list_city]);

	const handleInputChange = (event) => {
		const target = event.target;
		const value = target.value;
		setCurrentKeyword(value);
		if (value.length >= 3) {
			props.searchKeyword(value);
		} else {
			setResultSearch([]);
			setShowBoxResult(false);
		}
	};

	const handleItemClick = (event, itemData) => {
		props.chooseCity({
			name: event.target.innerText,
			lat: itemData.lat,
			lon: itemData.lon
		});
		props.searchKeyword(null);
		setResultSearch([]);
		setShowBoxResult(false);
		setCurrentKeyword(event.target.innerText);
	};

	const RenderItem = (props) => {
		const itemData = props.itemData;
		if (itemData.lat && itemData.lon) {
			return <li role="button"
						onClick={event => handleItemClick(event, itemData)}
						className="w-100 item pl-3 pr-3 pb-1 pt-1" style={{cursor:"pointer"}}>
				<span>
					{(itemData.local_names && ('vi' in itemData.local_names)) ? itemData.local_names.vi : itemData.name}
				</span>
			</li>;
		}
	}

	const listItems = resultSearch.map((item, index) => (
		<RenderItem key={index.toString()} itemData={item} />
	));

	const RenderBoxResult = () => {
		if (showBoxResult) {
			return <div className="list dropdown">
					<ul className="dropdown-menu show">
						{listItems}
					</ul>
				</div>;
		}
	}

	return(
		<div className="row mb-5 mt-5">
			<div className="box-search-city col-md-12">
				<input name="city"
					className="form-control"
					autoComplete="off"
					type="text"
					value={currentKeyword}
					placeholder="Please enter at least 3 characters to search"
					onChange={handleInputChange}/>
				<RenderBoxResult />
			</div>
		</div>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		chooseCity: (data) => {
			dispatch(actChooseCity(data));
		},
		searchKeyword: (data) => {
			dispatch(actSearchKeyword(data));
		}
	};
};

const mapStateToProps = (state, ownProps) => {
	return {
		list_city: state.list_city,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchCity)
