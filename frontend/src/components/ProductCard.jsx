import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useAlert } from "../context/GlobalAlertContext";
import { useAuth } from "../context/AuthContext";
import Spinner from "./spinner/Spinner";

const ProductCard = ({ product }) => {
  const { addToWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showAlert } = useAlert();
  const { isAuthenticated } = useAuth();
  const [isLoadingWhislist, setIsLoadingWhislist] = useState(false);
  const [isLoadingCart, setIsLoadingCart] = useState(false);

  const handleWishlistClick = async () => {
    if (!isAuthenticated) {
      return showAlert("Please login to add items to wishlist");
    }
    setIsLoadingWhislist(true);
    const response = await addToWishlist(product?.id);
    setIsLoadingWhislist(false);
    if (response?.success) {
      showAlert("Item Added To wishlist");
      console.log("Item added to wishlist:", response.data);
    } else {
      showAlert("Failed to add item to wishlist.");
    }
  };

  const handleAddtoCartClick = async () => {
    if (!isAuthenticated) {
      return showAlert("Please login to add items to Cart");
    }

    setIsLoadingCart(true);

    // Get the first variation if it exists, otherwise use an empty object
    const variation = product?.variations?.length > 0
      ? { [product.variations[0].type]: product.variations[0].options[0].value }
      : {}; // Default to empty object if no variations

    // Call the addToCart function
    const response = await addToCart(product?.id, 1, variation);

    setIsLoadingCart(false);

    if (response?.success) {
      showAlert("Item Added To Cart");
      console.log("Item added to Cart:");
    } else {
      showAlert("Failed to add item to Cart.");
    }
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product?.id}`}>
        <img
          src={product?.images?.[0] || "/images/image2.png"}
          alt={product?.name || "Product Image"}
        />
        <div className="tag">New</div>
        {product?.previousPrice > product?.price && (
          <div className="discount-tag">
            {Math.round(
              (1 - product?.price / product?.previousPrice) * 100
            )}
            % OFF
          </div>
        )}
        <h3>{product?.name || "Product Name"}</h3>

        <p>Price: Rs. {product?.price ? product.price.toFixed(2) : "N/A"}</p>
      </Link>
      <button className="Whishlist" onClick={handleWishlistClick}>
        {isLoadingWhislist ? <Spinner size="14px" /> : "Whishlist"}
      </button>
      <button className="add-to-cart" onClick={handleAddtoCartClick}>
        {isLoadingCart ? <Spinner size="14px" /> : "Add To Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
