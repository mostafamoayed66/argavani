import React from "react";
import "./style.css";

/**
 * @author
 * @function Card
 **/

const Card = (props) => {
  return (
    <div className="card" {...props}>
      {(props.headerleft || props.headerright) && (
        <div className="cardHeader">
          {props.headerleft && (
            <div className="headerLeftCustomCart">
              {props.headerleft}
            </div>
          )}
          {props.headerright && props.headerright}
        </div>
      )}
      {(props.headercenter) && (
        <div className="cardHeaderCenter">
          {props.headercenter && (
            <div className="headerCenterCustomCart">
              {props.headercenter}
            </div>
          )}
        </div>
      )}
      {props.children}
    </div>
  );
};

export default Card;
