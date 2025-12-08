import { useState } from "react";

import "./imagesection.css";
import Spinner from "../../../components/spinner/Spinner";
import arrowLeft from "../../../assets/ProductDetail/arrow-left.svg";
import arrowRight from "../../../assets/ProductDetail/arrow-right.svg";

const ProductImageSection = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const images = product?.images ?? []; // Ensure images array exists

  const handleImageNavigation = (direction) => {
    if (images.length <= 1) return; // No need to navigate if there is 0 or 1 image

    setIsImageLoading(true); // Show spinner while switching images

    if (direction === "prev") {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    } else if (direction === "next") {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  return (
    <div className="product-image-section">
      {images.length === 0 ? (
        <div className="no-image">No image available</div>
      ) : (
        <>
          <div className="badge-container">
            <span className="badge-new">NEW</span>
            {product.previousPrice > product.price && (
              <span className="badge-sale">
                -{Math.round(((product.previousPrice - product.price) / product.previousPrice) * 100)}%
              </span>
            )}
          </div>

          <div className="image-container">
            {isImageLoading && <Spinner size="48px" color="#ff12dc" />}
            <img
              className="product-image"
              src={images[currentImageIndex]}
              alt={product.name}
              onLoad={() => setIsImageLoading(false)}
              style={{ display: isImageLoading ? "none" : "block" }}
            />
          </div>

          {images.length > 1 && (
            <div className="image-navigation">
              <button className="nav-button" onClick={() => handleImageNavigation("prev")}>
                <img src={arrowLeft} className="arrows" alt="Previous" />
              </button>
              <button className="nav-button" onClick={() => handleImageNavigation("next")}>
                <img src={arrowRight} className="arrows" alt="Next" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};


export default ProductImageSection;
