import React from "react";
import { useNavigate } from "react-router-dom";
import "./hero.css";
import Button from "../../../components/shared/button/Button";
import hero1 from "../../../assets/Home/Hero/flowers.jpg"

const Hero = () => {

  const navigate = useNavigate();

  return (
    <div className="hero">
      <div className="hero-content">
        <div className="hero-image">
          <img
            src={hero1} // Placeholder image
            alt="Couple on a Bike"
          />
        </div>
        <div className="hero-text">
          <h1>
            Feel the <br/><span className="highlight">Rythom</span> of<br/> Love 
          </h1>
          <p>Unleash the Power of Music Together</p>
          <Button label="Shopping Now" onClick={() => navigate("/products")} class="hero-btn" />
        </div>
      </div>
      <div className="hero-bg">
        
      </div>
    </div>
  );
};

export default Hero;
