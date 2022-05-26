import {combineReducers} from 'redux';
import ChooseCity from './ChooseCity';
import GetWeatherData from './GetWeatherData';
import ListCity from './ListCity';
import Keyword from './Keyword';

export default combineReducers({
    city_data: ChooseCity,
    weather_data: GetWeatherData,
    list_city: ListCity,
    keyword: Keyword
});
