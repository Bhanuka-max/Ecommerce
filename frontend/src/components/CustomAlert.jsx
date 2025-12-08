import React, { useEffect, useState } from "react";
import "./CustomAlert.css";

const CustomAlert = ({ message, onClose, duration }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => prev - (100 / duration) * 50);
    }, 50);

    const timeout = setTimeout(() => onClose(), duration);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [duration, onClose]);

  return (
    <div className="custom-alert">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      <p>{message}</p>
      <button className="close-button" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default CustomAlert;
