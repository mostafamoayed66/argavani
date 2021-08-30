import axios from "../helpers/axios";
import { mainContants } from "./constants";

export const getMainPage = () => {
    return async (dispatch) => {
        dispatch({ type: mainContants.GET_MAIN_PAGE_REQUEST });
        try {
            const res = await axios.get("/main/getMain");
            if (res.status === 200) {
                const { mains } = res.data;
                let main = mains;
                dispatch({
                    type: mainContants.GET_MAIN_PAGE_SUCCESS,
                    payload: { main },
                });
            } else {
                const { error } = res.data;
                dispatch({
                    type: mainContants.GET_MAIN_PAGE_FAILURE,
                    payload: { error },
                });
            }
        } catch (error) {
            console.log(error);
            console.log('Heavy Error');
        }
    };
};