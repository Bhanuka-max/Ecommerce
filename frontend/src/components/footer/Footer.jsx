import React from 'react';
import './Footer.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import ameriacan from "../../assets/Footer/americanExpress.svg";
import apple from "../../assets/Footer/applePay.svg";
import master from "../../assets/Footer/MasterCard.svg";
import stripe from "../../assets/Footer/stripe.svg";
import visa from "../../assets/Footer/visa.svg";
import paypal from "../../assets/Footer/payPal.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_content">
        <div className="brand">
          <h2>Rose Flora</h2>
          <p>
            Fresh blooms, joyful moments.
            <br />
            Flowers for every story.
          </p>

          <div className="social-icons">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="socialFontawesome"
            >
              <FontAwesomeIcon
                icon={faInstagram}
              />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="socialFontawesome"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="socialFontawesome"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
        </div>
        <div className="footer_links">
          <div>
            <h3>Page</h3>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/products">Shop</a>
              </li>
              <li>
                <a href="/products">Product</a>
              </li>
              
              <li>
                <a href="contactus">Contact Us</a>
              </li>
            </ul>
          </div>
          <div>
            <h3>Info</h3>
            <ul>
              <li>
                <a href="/shiping_Policy">Shipping Policy</a>
              </li>
              <li>
                <a href="/return_refund">Return & Refund</a>
              </li>
              <li>
                <a href="/support_Page">Support</a>
              </li>
              <li>
                <a href="/faqS">FAQs</a>
              </li>
            </ul>
          </div>
          <div>
            <h3>Office</h3>
            <ul>
              <li>Rose Flora</li>
              <li>Kelaniya</li>
              <li>Sri Lanka</li>
              <li>078 6465739</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer_bottom">
        <p>
          Copyright © 2025 Rose Flora. All rights reserved |
          <a href="/privacy_policy"> Privacy Policy</a> |<a href="/Terms_condition"> Terms & Conditions</a>
        </p>
        <div className="payment_methods">
          <img src={visa} alt="Visa" />
          <img src={ameriacan} alt="American Express" />
          <img src={master} alt="MasterCard" />
          <img src={stripe} alt="Stripe" />
          <img src={paypal} alt="paypal" />
          <img src={apple} alt="Apple Pay" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
