import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <img 
          src="/closed-shop_16104544.gif" 
          alt="Loading..." 
          className="loading-gif"
        />
        <p className="loading-text">ROSA LOVER</p>
      </div>
    </div>
  );
};

export default Loading;