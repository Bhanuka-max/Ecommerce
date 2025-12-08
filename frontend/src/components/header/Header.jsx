import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";
import CartIndicatorCard from "../../components/shared/CartIndicator/CartIndicatorCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation(); // Get current route
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const navigate = useNavigate();
  const profileMenuRef = useRef(null); 

  const { isAuthenticated, logout, isAdmin } = useAuth(); 
  
  const [adminVisible, setAdminVisible] = useState(false);
  // Track active menu based on the current route
  const [menu, setMenu] = useState(location.pathname);

  useEffect(() => {
    setMenu(location.pathname);
    setAdminVisible(isAdmin);
  }, [location.pathname, isAdmin]); 
  

  // Toggle profile menu
  const toggleProfileMenu = () => {
    setProfileMenuVisible((prev) => !prev);
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setProfileMenuVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="nav-logo" onClick={() => navigate("/")}>
        <span className="pointer">
          ROSA <span className="color-lover">FLORA</span>
        </span>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/" className={menu === "/" ? "active" : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className={menu === "/products" ? "active" : ""}>
              Product
            </Link>
          </li>
          <li>
            <Link to="/contactus" className={menu === "/contactus" ? "active" : ""}>
              Contact Us
            </Link>
          </li>
          {/* Render Admin Panel dynamically after isAdmin is set */}
          {adminVisible && (
            <li>
              <Link to="/admin" className={menu === "/admin" ? "active" : ""}>
                Admin Panel
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div className="icons">
        <div className="icon user-icon" onClick={toggleProfileMenu} ref={profileMenuRef}>
          <FontAwesomeIcon icon={faUserCircle} />
          {profileMenuVisible && (
            <div className="profile-menu">
              {isAuthenticated ? (
                <>
                  <button className="profile-menu-btn" onClick={handleLogout}>
                    Log Out
                  </button>
                  <hr />
                  <ul>
                    <li>
                      <Link to="/account">Account</Link>
                    </li>
                    <li>
                      <a href="/support_Page">Help Center</a>
                    </li>
                  </ul>
                </>
              ) : (
                <button className="profile-menu-btn" onClick={handleLogin}>
                  Log In
                </button>
              )}
            </div>
          )}
        </div>
        <CartIndicatorCard />
      </div>
    </header>
  );
};

export default Header;
