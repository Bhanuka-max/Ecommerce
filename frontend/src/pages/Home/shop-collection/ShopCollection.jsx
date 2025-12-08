import React from "react";
import { Link } from "react-router-dom";
import "./ShopCollection.css";
import mug from "../../../assets/Home/Shop-Collection/weddingflowers.jpg"
import { useNavigate } from "react-router-dom";


const ShopCollection = () => {
  const navigate = useNavigate();

  const navigatetoCategory = (category) => {


  }

  return (
    <div className="shop-collection">
      <h2>Shop Collection</h2>
      <div className="collection-grid">
        {/* Left side: Large item */}
        <div className="collection-item large">
          <img
            src={mug}
            alt="Customized Mug"
            className="collection-image"
          />
          <div className="collection-text">
            <h3>Customized Mug</h3>
            <Link to="/products?category=Mug">Collection →</Link>
          </div>
        </div>

        {/* Right side: Two smaller items */}
        <div className="collection-item small">
          {/* Small Content Wrapper */}
          
          <div className="small-container">
            <div className="collection-text">
              <h3>T-Shirt</h3>
              <Link to="/products?category=Tshirt">Collection →</Link>
            </div>
            
          </div>
          <div className="small-container">
            <div className="collection-text">
              <h3>Teddy</h3>
              <Link to="/products?category=Teddy">Collection →</Link>
            </div>
            
          </div>

        </div>
      </div>
    </div>
  );
};

export default ShopCollection;
