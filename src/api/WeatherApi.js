import axios from 'axios';
import { API_KEY } from "../const/ApiKey";

export const getWeatherDataApi = (cityData) => {
	const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+cityData.lat+'&lon='+cityData.lon+'&units=metric&appid='+API_KEY;

	return axios.get(
		url
	);
}
