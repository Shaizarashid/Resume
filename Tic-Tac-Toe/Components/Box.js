import React from "react";
import './Box.css';

const Box = ({ logo }) => {
  return (
    <div className="box">
      {logo && <img src={logo} alt="Player Logo" className="box-logo" />}
    </div>
  );
};

export default Box;
