import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext"; // Import the useAuth hook to get auth status
import { CartContext} from "../../../context/CartContext"; // Import CartContext
import shopping from "../../../assets/Header/shopping-bag.svg"; // Import shopping cart icon
import Modal from "../../shared/Model/Model"; // Import Modal
import "./CartCard.css";

const CartIndicatorCard = () => {
   // Get authentication status from AuthContext
  const { isAuthenticated } = useAuth();
  const { cartItemCount } = useContext(CartContext); 
  const [showModal, setShowModal] = useState(false); // State to show/hide modal
  const navigate = useNavigate();

  const handleClick = () => {
    if (isAuthenticated) {
      navigate('/cart'); 
    } else {
      setShowModal(true); 
    }
  };

  const handleModalClose = () => {
    setShowModal(false); // Close the modal
    navigate('/login'); // Redirect to login
  };

  return (
    <div>
      <div className="cart-indicator" onClick={handleClick}>
        <div className="cart-icon">
          <img src={shopping} alt="Shopping Cart" />
        </div>
        <span className="cart-count">{cartItemCount || 0}</span>
      </div>

      {/* Render Modal */}
      {showModal && (
        <Modal
          title="Authentication Required"
          message="You need to log in to access your cart."
          onClose={() => setShowModal(false)} // Optional close without navigation
          actions={[
            {
              label: "OK",
              className: "primary-button", // Add any custom class if needed
              onClick: handleModalClose, // Handle OK click
            },
          ]}
        />
      )}
    </div>
  );
};

export default CartIndicatorCard;



