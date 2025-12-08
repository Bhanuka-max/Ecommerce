import React from "react";
import "./Spinner.css";

const Spinner = ({ size = "16px", color = "#fff" }) => {
  return (
    <div
      className="spinner"
      style={{
        width: size,
        height: size,
        border: `2px solid ${color}`,
        borderTopColor: "transparent",
      }}
    ></div>
  );
};

export default Spinner;
