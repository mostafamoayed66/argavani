import axios from "../helpers/axios"
import { productConstants } from "./constants";

export const getProductsBySlug = (slug) => {
    return async dispatch => {
        const res = await axios.get(`/products/${slug}`);
        if (res.status === 200) {
            dispatch({
                type: productConstants.GET_PRODUCTS_BY_SLUG,
                payload: res.data
            });
        } else {
            // dispatch({
            //     type: 
            // })
        }
    }
}

export const getTotalProductBySlug = (cid) => {
    return async dispatch => {
        try {
            const res = await axios.get(`/total/products/${cid}`);

            dispatch({ type: productConstants.GET_TOTAL_PRODUCTS_BY_SLUG_REQUEST});
            if (res.status === 200) {
                const { categorys, productsEachCategory } = res.data;
                dispatch({
                    type: productConstants.GET_TOTAL_PRODUCTS_BY_SLUG_SUCCESS,
                    payload: { categorys, productsEachCategory }
                });
            } else {
                const { error } = res.data;
                dispatch({
                    type: productConstants.GET_TOTAL_PRODUCTS_BY_SLUG_FAILURE,
                    payload: { error }
                });
            }
        } catch(error) {
            console.log(error)
        }

    }
}

export const getProductDetailsById = (payload) => {
    return async dispatch => {
        dispatch({ type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST });
        let res;
        try {
            const { productId } = payload.params;
            res = await axios.get(`/product/${productId}`);
            // console.log(res);
            dispatch({
                type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
                payload: { productDetails: res.data.product }
            });

        } catch(error) {
            // console.log(error);
            dispatch({
                type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
                payload: { error: res.data.error }
            });
        }

    }
}