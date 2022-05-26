import { GET_WEATHER_DATA } from "../const/index";

const GetWeatherData = (state = [], action) => {
    if (action.type === GET_WEATHER_DATA) {
        state = action.data;
    }
    
    return state;
};

export default GetWeatherData
