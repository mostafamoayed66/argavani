import React from "react";
import StarRateIcon from '@material-ui/icons/StarRate';

/**
 * @author
 * @function Rating
 **/

const Rating = (props) => {
  return (
    <span
      style={{
        display: "inline-block",
        background: "#4CAF55",
        color: "#fff",
        fontWeight: "400",
        fontSize: "13px",
        borderRadius: "3px",
        width: '40px',
        padding: "1px 3px",
      }}
    >
      <StarRateIcon fontSize="small"/> {props.value} 
    </span>
  );
};

export default Rating;
