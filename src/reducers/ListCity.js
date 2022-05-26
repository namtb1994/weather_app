import { GET_LIST_CITY } from "../const/index";

const ListCity = (state = [], action) => {
    if (action.type === GET_LIST_CITY) {
        state = action.data;
    }
    
    return state;
};

export default ListCity
