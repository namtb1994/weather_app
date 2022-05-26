import axios from 'axios';
import { API_KEY } from "../const/ApiKey";

export const getCityDataApi = (cityName) => {
	var url = 'http://api.openweathermap.org/geo/1.0/direct?q='+cityName+',VN&limit=5&appid='+API_KEY;
	
	return axios.get(
		url
	);
}
