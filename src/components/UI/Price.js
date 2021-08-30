import React from "react";
// import { BiDollar } from "react-icons/bi";

/**
 * @author
 * @function Price
 **/

const Price = (props) => {
  return (
    <div
      style={{
        fontSize: props.fontSize ? props.fontSize : "14px",
        fontWeight: "bold",
        margin: "5px 0",
      }}
    >
      {props.value}
      <span className="pl-1">تومان</span>
    </div>
  );
};

export default Price;
