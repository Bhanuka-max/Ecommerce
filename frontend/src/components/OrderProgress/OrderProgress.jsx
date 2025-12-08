import React from "react";
import "./orderProgress.css";

const OrderProgress = ({ step }) => {
  return (
    <div className="cart-progress">
      <div className={`step ${step >= 1 ? "active" : ""}`}>1 Shopping cart</div>
      <div className={`step ${step >= 2 ? "active" : ""}`}>
        2 Checkout details
      </div>
      <div className={`step ${step >= 3 ? "active" : ""}`}>
        3 Order complete
      </div>
    </div>
  );
};

export default OrderProgress;
