import categoryReducer from './category.reducer';
import productReducer from './product.reducer';
import authReducer from './auth.reducer';
import cartReducer from './cart.reducer';
import userReducer from './user.reducer';
import mainReducer from './main.reducer';
import { combineReducers } from 'redux';


const initialState = {
    sidebarShow: 'responsive'
}

const changeState = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case 'set':
            return { ...state, ...rest }
        default:
            return state
    }
}


const rootReducer = combineReducers({
    nav: changeState,
    category: categoryReducer,
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    user: userReducer,
    main: mainReducer,
});

export default rootReducer;