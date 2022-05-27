import { call, put, takeEvery, all } from 'redux-saga/effects';
import { actGetListCity, actGetWeatherData } from './actions/index';
import { CHOOSE_CITY, SEARCH_KEYWORD, AUTO_REFRESH } from "./const/index";
import {getCityDataApi} from './api/GeoApi';
import {getWeatherDataApi} from './api/WeatherApi';

function* getListCity(action) {
	try {
		const data = yield call(getCityDataApi, action.data);
		yield put(actGetListCity(data.data));
	} catch (error) {
		yield put(actGetListCity(error));
	}
}

function* getWeatherData(action) {
	try {
		const data = yield call(getWeatherDataApi, action.data);
		yield put(actGetWeatherData(data.data));
	} catch (error) {
		yield put(actGetWeatherData(error));
	}
}

function* getListCitySaga() {
	yield takeEvery(SEARCH_KEYWORD, getListCity);
}

function* getWeatherDataSaga() {
	yield takeEvery(CHOOSE_CITY, getWeatherData);
}

function* autoRefresh() {
	yield takeEvery(AUTO_REFRESH, getWeatherData);
}

export default function* rootSaga() {
    yield all([
        getListCitySaga(),
        getWeatherDataSaga(),
        autoRefresh()
    ]);
}
