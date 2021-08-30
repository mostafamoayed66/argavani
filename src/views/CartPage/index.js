import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCartItems, removeCartItem } from "../../actions";

import CartItem from "./CartItem";
import Card from "../../components/UI/Card";
import Layout from '../../containers/TheLayout';
import PriceDetails from "../../components/PriceDetails";

import Grid from '@material-ui/core/Grid';
import { MaterialButton } from "../../components/MaterialUI";
import "./style.css";

/**
 * @author
 * @function CartPage
 **/

/*
Before Login
Add product to cart
save in localStorage
when try to checkout ask for credentials and 
if logged in then add products to users cart database from localStorage
*/

const CartPage = (props) => {
    const cart = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);
    const [cartItems, setCartItems] = useState(cart.cartItems);
    const dispatch = useDispatch();

    useEffect(() => {
        setCartItems(cart.cartItems);
    }, [cart.cartItems]);

    useEffect(() => {
        if (auth.authenticate) {
            dispatch(getCartItems());
        }
    }, [auth.authenticate, dispatch]);


    const onQuantity = (_id, qty) => {
        const { name, price, img } = cartItems[_id];
        dispatch(addToCart({ _id, name, price, img }, qty));
    };

    const onRemoveCartItem = (_id) => {
        dispatch(removeCartItem({ productId: _id }));
    };

    if (props.onlyCartItems) {
        return (
            <>
                {Object.keys(cartItems).map((key, index) => (
                    <CartItem
                        key={index}
                        cartItem={cartItems[key]}
                        onQuantity={onQuantity}
                        onRemoveCartItem={onRemoveCartItem}
                    />
                ))}
            </>
        );
    }

    return (
        <Layout>
            <div className="cartContain">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3} md={3}>
                        <PriceDetails
                            totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
                                return qty + cart.cartItems[key].qty;
                            }, 0)}
                            totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                                const { price, qty } = cart.cartItems[key];
                                return totalPrice + price * qty;
                            }, 0)}
                        />
                    </Grid>


                    <Grid item xs={12} sm={9} md={9}>
                        <Card
                            headerleft={`سبد خرید من`}
                            headerright={<div>آماده ارسال</div>}
                        >
                            {Object.keys(cartItems).map((key, index) => (
                                <CartItem
                                    key={index}
                                    cartItem={cartItems[key]}
                                    onQuantity={onQuantity}
                                    onRemoveCartItem={onRemoveCartItem}
                                />
                            ))}

                            <div className="secondCarditem">
                                <div>
                                    <MaterialButton
                                        title="سفارش دادن"
                                        onClick={() => props.history.push(`/checkout`)}
                                    />
                                </div>
                            </div>
                        </Card>
                    </Grid>

                </Grid>
            </div>
        </Layout>
    );
};

export default CartPage;
