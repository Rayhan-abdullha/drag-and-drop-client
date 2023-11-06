import React, { useState } from "react";

const Card = ({ onDragStart, onDrop, image, index }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return !isPopupOpen ? (
    <div
      onClick={openPopup}
      onDragStart={() => onDragStart(image)}
      onDrop={() => onDrop(index)}
      draggable={true}
      key={index}
      className={`image-card ${index === 0 ? "big" : "small"}`}
    >
      <img src={image.img} alt={`Image ${index}`} />
      <div className="overlay"></div>
    </div>
  ) : (
    <div className={isPopupOpen ? "image-popup" : ""}>
      <img src={image.img} alt="Popup" />
      <div className="delete-icon" onClick={closePopup}></div>
    </div>
  );
};

export default Card;
