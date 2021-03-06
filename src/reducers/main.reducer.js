import { mainContants } from "../actions/constants";

const main = {
    swiperPigs: []
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = main, action) => {
    switch (action.type) {
        case mainContants.GET_MAIN_PAGE_REQUEST:
            state = {
                ...state,
            }
            break;
        case mainContants.GET_MAIN_PAGE_SUCCESS:
            state = {
                ...state,
                swiperPigs: action.payload.main,
            }
            break;
        case mainContants.GET_MAIN_PAGE_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
            }
            break;

        default:
            break;
    }

    return state;
}