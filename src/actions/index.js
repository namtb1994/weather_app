import { CHOOSE_CITY, GET_WEATHER_DATA, GET_LIST_CITY, SEARCH_KEYWORD } from "../const/index";

export const actChooseCity = (data) => {
    return {
        type: CHOOSE_CITY,
        data
    };
};

export const actGetWeatherData = (data) => {
    return {
        type: GET_WEATHER_DATA,
        data
    };
};

export const actGetListCity = (data) => {
    return {
        type: GET_LIST_CITY,
        data
    };
};

export const actSearchKeyword = (data) => {
    return {
        type: SEARCH_KEYWORD,
        data
    };
};
