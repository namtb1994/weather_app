import { CHOOSE_CITY } from "../const/index";

const ChooseCity = (state = [], action) => {
    if (action.type === CHOOSE_CITY) {
        state = action.data;
    }
    
    return state;
};

export default ChooseCity
