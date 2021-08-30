import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../actions";
import { Redirect } from "react-router";
import { generatePublicUrl } from '../../urlConfig';

import Layout from '../../containers/TheLayout';
import Card from "../../components/UI/Card";
import Price from "../../components/UI/Price";

import Grid from '@material-ui/core/Grid';
import "./style.css";

/**
 * @author
 * @function OrderDetails
 **/

const OrderDetailsPage = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const orderDetails = useSelector((state) => state.user.orderDetails);

  useEffect(() => {
    // console.log({ props });
    const param = props.match.params.orderId;
    const payload = {
      orderId: param,
    };

    if (auth.authenticate && param && param !== undefined) {
      dispatch(getOrder(payload))
    }
  }, [auth.authenticate, dispatch, props]);

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  };

  const formatDate2 = (date) => {
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    if (date) {
      const d = new Date(date);
      return `${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    }
  };

  if (!auth.authenticate) {
    return <Redirect to="/login" />
  }

  if (!(orderDetails && orderDetails.address)) {
    return null;
  }

  return (
    <Layout>
      <div>
        <Grid container className="orderDetailPageContainer">
          <Grid item xs={12} sm={12}>
            <Card>
              <div className="delAdrContainer">
                <div className="delMoreActionContainer">
                  <div className="delTitle">اقدامات بیشتر</div>
                  <div className="delName">دانلود فاکتور خرید</div>
                </div>
                <div className="delAdrDetails">
                  <div className="delTitle">نشانی تحویل</div>
                  <div className="delName">
                    <span className="pl-2">کاربر : </span> {orderDetails.address.name}
                  </div>
                  <div className="delName">
                    <span className="pl-2">آدرس : </span> {orderDetails.address.address}
                  </div>
                  <div className="delName">
                    <span className="pl-2">تلفن : </span> {orderDetails.address.mobileNumber}
                  </div>
                </div>
              </div>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Grid container>
              {orderDetails.items.map((item, index) => (
                <Grid item xs={12} sm={12} key={index}>
                  <Card>
                    <Grid container className="orderDetailPageGridContainer">

                      <Grid item xs={12} sm={2} md={2} className="orderDetailPageGrid">
                        <div className="delItemImgContainer">
                          <img src={generatePublicUrl(item.productId.productPictures[0].img)} alt="" />
                        </div>
                      </Grid>

                      <Grid item xs={12} sm={6} md={6} className="orderDetailPageGrid">
                        <div className="orderTrack">
                          {orderDetails.orderStatus.map((status, index) => (
                            <div key={index} className={`orderStatus ${status.isCompleted ? "active" : ""}`}>
                              <div className={`point ${status.isCompleted ? "active" : ""}`}></div>
                              <div className="orderInfo">
                                <div className="status">{status.type}</div>
                                <div className="date">{formatDate(status.date)}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div style={{ fontWeight: "500", fontSize: "14px" }}>
                          {orderDetails.orderStatus[3].isCompleted &&
                            `Delivered on ${formatDate2(orderDetails.orderStatus[3].date)}`}
                        </div>
                      </Grid>

                      <Grid item xs={12} sm={4} md={4} className="orderDetailPageGrid">
                        <div>
                          <div className="delItemName">{item.productId.name}</div>
                          <Price value={item.payablePrice} />
                        </div>
                      </Grid>


                    </Grid>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>



      </div>
    </Layout>
  );
};

export default OrderDetailsPage;
