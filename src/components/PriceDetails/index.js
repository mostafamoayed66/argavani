import React from "react";
import Card from "../../components/UI/Card";
import Grid from '@material-ui/core/Grid';
import './stylePrice.css';
/**
 * @author
 * @function PriceDetails
 **/

const PriceDetails = (props) => {
  return (
    <Card headercenter={"جزئیات خرید"} >
      <Grid container className="gridMainPriceDetail">
        <Grid item xs={6} sm={6}>
          <div className="sixPriceDetail">
            <div>هزینه ({props.totalItem} کالا)</div>
            <div className="ptag">{props.totalPrice}</div>
          </div>
        </Grid>
        <Grid item xs={6} sm={6} className="linetag">
          <div className="sixPriceDetail">
            <div> هزینه تحویل</div>
            <div className="ptag">هزینه پست</div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12}>
          <div className="twoelvPriceDetail">
            <span>{props.totalPrice}</span>
            <span className="ptag2">مبلغ کل</span>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

export default PriceDetails;
