import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { getOrders } from "../../actions";
import Layout from '../../containers/TheLayout';
import Card from "../../components/UI/Card";
import { generatePublicUrl } from '../../urlConfig';

import Grid from '@material-ui/core/Grid';
import "./orders.css";

/**
 * @author
 * @function OrderPage
 **/

const OrderPage = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getOrders());
    }
  }, [auth, dispatch]);

  if (!auth.authenticate) {
    return <Redirect to="/login" />
  }

  return (
    <Layout>
      <div className="orderContain">
        <Grid container>
          {user.orders.map((order, key) => {
            return order.items.map((item, key) => (
              <Grid item xs={12} sm={12} key={key}>
                <Card>
                  <Link to={`/order_details/${order._id}`} className="orderItemContainer">
                    <Grid container className="orderGridContainer">



                      <Grid item xs={12} sm={2}>
                        <div className="orderImgContainer">
                          <img className="orderImg" src={generatePublicUrl(item.productId.productPictures[0].img)} alt='' />
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={4} className="orderGrid">
                        <div>{item.productId.name}</div>
                      </Grid>
                      <Grid item xs={12} sm={3} className="orderGrid">
                        <span className="pl-3">:هزینه</span>
                        <div>
                          {item.payablePrice}
                          <span className="pl-1">تومان</span>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={3} className="orderGrid">
                        <span className="pl-3">:وضعیت</span>
                        {order.paymentStatus}
                      </Grid>


                    </Grid>
                  </Link>
                </Card>
              </Grid>
            ));
          })}
        </Grid>
      </div>
    </Layout>
  );
};

export default OrderPage;
