import React from "react";
import "./Model.css";

const Modal = ({ title, message, onClose, actions }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {title && <h3 className="modal-title">{title}</h3>}
        <p>{message}</p>
        <div className="modal-actions">
          {actions ? (
            actions.map((action, index) => (
              <button
                key={index}
                className={`modal-button ${action.className || ""}`}
                onClick={action.onClick}
              >
                {action.label}
              </button>
            ))
          ) : (
            <button className="modal-button" onClick={onClose}>
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
