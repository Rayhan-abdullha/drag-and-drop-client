import React, { useState } from "react";
import "./modal.css";

function Modal({ openmodal, confirmDel }) {
  const [isOpen, setIsOpen] = useState(openmodal);

  const closeModal = () => {
    confirmDel(false);
    setIsOpen(false);
  };

  const handleDelete = () => {
    confirmDel(true);
    setIsOpen(false);
  };

  return (
    <div>
      {isOpen && (
        <div className="modal-container">
          <div className="backdrop"></div>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Confirm Delete</h2>
            <p>Are you sure?</p>
            <button onClick={handleDelete} className="delete-button">
              Deleted Files
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
