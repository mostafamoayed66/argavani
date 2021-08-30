import React, { useState } from "react";
import { generatePublicUrl } from '../../../urlConfig';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import "./style.css";

/**
 * @author
 * @function CartItem
 **/

const CartItem = (props) => {
    const [qty, setQty] = useState(props.cartItem.qty);
    const { _id, name, price, img } = props.cartItem;

    const onQuantityIncrement = () => {
        setQty(qty + 1);
    };

    const onQuantityDecrement = () => {
        if (qty <= 1) {
            return;
        } else {
            setQty(qty - 1);
        }
    };

    return (
        <div className="cartItemContainer">
            <Card variant="outlined">
                <div>
                    <CardContent>

                        <Grid container className="cartItemDetails">
                            <Grid item xs={12} sm={3} md={2} className="cartProImgDetailsContainer">
                                <div className="cartProImgContainer">
                                    <img src={generatePublicUrl(img)} alt={''} />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={5} className="cartItemDetailsTxt">
                                <span>{name}</span>
                            </Grid>
                            <Grid item xs={12} sm={3} md={2} className="cartItemDetailsTxt">
                                <span>قیمت {price}</span>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} className="cartItemDetailsTxt">
                                <div>مدت تحویل در ۳-۵ روز</div>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions className="cardActionCartItem">
                        <div>
                            <button
                                className="cartActionBtn"
                                onClick={() => props.onRemoveCartItem(_id)}>
                                حذف
                            </button>
                            <button
                                className="cartActionBtn2"
                                onClick={() => props.onQuantity(_id, qty)}>
                                ثبت تعداد کالا
                            </button>
                        </div>
                        <div className="quantityControl">
                            <button onClick={onQuantityDecrement}>-</button>
                            <input value={qty} readOnly />
                            <button onClick={onQuantityIncrement}>+</button>
                        </div>

                    </CardActions>
                </div>
            </Card>
        </div>
    );
};

export default CartItem;
