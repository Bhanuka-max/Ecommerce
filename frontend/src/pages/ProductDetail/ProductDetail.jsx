import React, { useEffect, useState, useContext } from "react";
//CSS Import
import "./ProductDetailComponent.css";
//Context Imports
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useAlert } from "../../context/GlobalAlertContext";
import { useWishlist } from "../../context/WishlistContext";
//Component Import
import ProductImageSection from "./ProductImageSection/ProductImageSection";
import Review from "./Reviews/Review";
import Loading from "../../components/shared/Loading/Loading";
import Spinner from "../../components/spinner/Spinner";

//Api Services Import
import { GetProductDetailById } from "../../api/productService";
import { getRreviews } from "../../api/reviewService";

const ProductDetail = () => {
  const { productId } = useParams(); // Get the productId from the URL
  const [product, setProduct] = useState(null); // State for the product data
  const [quantity, setQuantity] = useState(1);
  const [selectedVariations, setSelectedVariations] = useState({}); //Saving currently Selected Variation (eg : color:brown )
  const [variationState, setVariationState] = useState({}); //Variation Object

  //Pagination
  const [currPage, setCurrPage] = useState(0); //Page
  const [totalPages, setTotalPages] = useState(1); //Total Pages

  //Other States
  const [reviews, setReviews] = useState([]); //Reviews

  //Loading And Alert States
  const [isLoading, setIsLoading] = useState(true); // Loading state
  //Cart and Wishlist States
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  //Error State
  const [error, setError] = useState(null); // Error state

  //Context Import
  const { cartItems, addToCart, removeFromCart } = useCart(); //Cart Context
  const { isAuthenticated } = useAuth(); //Auth Context
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist(); //Wishlist Context
  const { showAlert } = useAlert(); //For Alerts

  // Fetch product details and reviews only when productId changes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (productId) {
          await Promise.all([
            fetchProductDetails(productId),
            fetchReviews(productId),
          ]);
        }
      } catch (error) {
        console.error("Error fetching product or reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  // Update wishlist status when wishlistItems or productId change
  useEffect(() => {
    if (productId) {
      const wishlistStatus = wishlistItems.some(
        (item) => item.id === productId
      );
      setIsInWishlist(wishlistStatus);
    }
  }, [wishlistItems, productId]);

  // Update cart status when cartItems, productId, or selectedVariations change
  useEffect(() => {
    if (productId) {
      const cartStatus = cartItems.some(
        (item) =>
          item.productId === productId &&
          deepEqual(item.variation || {}, selectedVariations || {})
      );
      setIsInCart(cartStatus);
    }
  }, [cartItems, productId, selectedVariations]);

  const deepEqual = (obj1 = {}, obj2 = {}) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }

    return true;
  };

  //
  useEffect(() => {
    if (product) {
      setSelectedVariations(initializeVariations(product)); //Variation Intialization
      setVariationState(initializeStock(product)); //Intialize the stocks from product Object (variations)
    }
  }, [product]);

  // Fetch product details by ID
  const fetchProductDetails = async (id) => {
    try {
      setIsLoading(true);
      const response = await GetProductDetailById(id);
      setProduct(response.data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message || "Failed to fetch product details.");
      setIsLoading(false);
    }
  };

  const fetchReviews = async (productId, page) => {
    try {
      const reviews = await getRreviews(productId, page);
      console.log(reviews);
      setReviews(reviews.content);
      setCurrPage(reviews.pageable.pageNumber);
      setTotalPages(reviews.totalPages);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // Initialize variations and stock based on product data
  const initializeVariations = (product) => {
    return product.variations.reduce((acc, variation) => {
      acc[variation.type] = variation.options[0].value; // Default to the first option
      return acc;
    }, {});
  };

  const initializeStock = (product) => {
    return product.variations.reduce((stk, variation) => {
      variation.options.forEach((option) => {
        stk[option.value] = option.stock; // Map option value to its stock
      });
      return stk;
    }, {});
  };

  //Functions

  // Add item to cart
  const handleAddToCart = async () => {
    // console.log(selectedVariations)

    // return
    // Showing Alert If not Authenticated
    if (!isAuthenticated) {
      showAlert("Please log in to add items to the cart.");
      return;
    }

    if (isInCart) {
      setIsCartLoading(true); // Start loading
      try {
        const response = await removeFromCart(productId, selectedVariations);
        if (response.success) {
          showAlert("Item removed from cart");
          setIsInCart(false); // Update state to reflect removal
        } else {
          showAlert("Failed to remove item from cart");
        }
      } catch (error) {
        console.error("Error removing item from cart:", error);
        showAlert("An unexpected error occurred");
      } finally {
        setIsCartLoading(false); // Stop loading in both success and failure cases
      }
      return;
    }

    setIsCartLoading(true); // Start loading
    try {
      const result = await addToCart(productId, quantity, selectedVariations); // Use the quantity state

      if (result.success) {
        showAlert("Item added to cart successfully");
      } else {
        showAlert("Failed to Add to Cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      showAlert("An error occurred while adding the item to the cart.");
    } finally {
      setIsCartLoading(false); // End loading
    }
  };

  //Other Functionalities

  //Change Quantity Upon changing the variation

  useEffect(() => {
    setQuantity(1);
  }, [selectedVariations]);

  //Handle thw Changing the quanity Finctionality
  //Use for limit for stock
  const handleQuantityChange = (type) => {
    const selectedStockValue = Object.values(selectedVariations).reduce(
      (maxStock, selectedOption) =>
        Math.max(maxStock, variationState[selectedOption]),
      product.stock
    );

    if (type === "increment" && quantity < selectedStockValue) {
      setQuantity(quantity + 1);
    }
    if (type === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  //Change the state for the variation ( eg:color:"red" )
  const handleVariationChange = (type, value) => {
    setSelectedVariations((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  //Wishlist Functionalities

  const handleWishlist = async () => {
    try {
      if (!isAuthenticated) {
        showAlert("Please log in to add items to the wishlist.");
        return;
      }
      setIsWishlistLoading(true);
      const response = await addToWishlist(productId);
      setIsWishlistLoading(false);

      if (response.success) {
        showAlert("Item added to Wishlist!");
        setIsInWishlist(true);
        console.log("Item added to wishlist:", response.data);
      } else {
        showAlert("Failed to add item to Wishlist.");
      }
    } catch (error) {
      setIsWishlistLoading(false);
      console.error("Error adding item to wishlist:", error);
      showAlert("An error occurred. Please try again.");
    }
  };

  // Toggle the wishlist status
  const toggleWishlist = async () => {
    if (isInWishlist) {
      setIsWishlistLoading(true);
      await removeFromWishlist(productId);
      showAlert("Item Removed from Wishlist");
      setIsWishlistLoading(false);
    } else {
      handleWishlist();
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {product && (
        <div className="product-detail-container">
          <ProductImageSection product={product} />
          <div className="product-info-section">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-description">{product.description}</p>
            {product.stock !== null && (<p className="product-stock">In Stock: {product.stock}</p>)}
            <div className="price-section">
              <span className="current-price">Rs {product.price}</span>
              <span className="original-price">Rs {product.previousPrice}</span>
            </div>
            <hr />

            {product.variations.map((variation) => (
              <div key={variation.type} className="variation-section">
                <h3>Choose {variation.type}</h3>
                <select
                  className="variation-dropdown"
                  value={selectedVariations[variation.type]}
                  onChange={(e) =>
                    handleVariationChange(variation.type, e.target.value)
                  }
                >
                  {variation.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.value} ({option.stock} in stock)
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <div className="quantity-wrapper">
              <div className="quantity-section">
                <button
                  className="quantity-button"
                  onClick={() => handleQuantityChange("decrement")}
                >
                  -
                </button>
                <span className="quantity">{quantity}</span>
                <button
                  className="quantity-button"
                  onClick={() => handleQuantityChange("increment")}
                >
                  +
                </button>
              </div>
              {/* Wishlist Button */}
              <button
                className="wishlist-button"
                style={{ color: isInWishlist ? "red" : "black" }}
                onClick={toggleWishlist}
                disabled={isWishlistLoading}
              >
                {isWishlistLoading ? (
                  <Spinner size="24px" color="#ff12dc" />
                ) : isInWishlist ? (
                  "♥ In Wishlist"
                ) : (
                  "♡ Add to Wishlist"
                )}
              </button>
            </div>

            <div className="action-buttons">
              <button
                className="add-to-cart-button"
                onClick={handleAddToCart}
                disabled={isCartLoading}
              >
                {isCartLoading ? (
                  <Spinner size="24px" color="#ff12dc" />
                ) : isInCart ? (
                  "In Cart"
                ) : (
                  "Add to Cart"
                )}
              </button>
            </div>
            <hr />
            <div className="product-meta">
              <p>
                <strong>Category:</strong> {product.category}
              </p>
              <p>
                <strong>SKU:</strong> {product.id}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="review-list">
        <h2>Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review) => <Review key={review.id} review={review} />)
        ) : (
          <p className="no-reviews">No reviews available for this product.</p>
        )}

        {/* Pagination Controls */}
        <div className="pagination">
          <button
            disabled={currPage === 0}
            onClick={() => fetchReviews(productId, currPage - 1)}
          >
            Previous
          </button>
          <span>
            Page {currPage + 1} of {totalPages}
          </span>
          <button
            disabled={currPage + 1 >= totalPages}
            onClick={() => fetchReviews(productId, currPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
