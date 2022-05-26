import { SEARCH_KEYWORD } from "../const/index";

const Keyword = (state = [], action) => {
    if (action.type === SEARCH_KEYWORD) {
        state = action.data;
    }
    
    return state;
};

export default Keyword
