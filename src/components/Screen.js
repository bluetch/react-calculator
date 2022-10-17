import React from "react";
import { Textfit } from "react-textfit";
import "./Screen.css";

const Screen = ({ value }) => {
  return (
    <div className="screen">
      {value}
    </div>
  );
};

export default Screen;
