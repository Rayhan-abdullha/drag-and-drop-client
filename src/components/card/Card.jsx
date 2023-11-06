import React, { useState } from "react";
import "./card.css";
const Card = ({
  onDragStart,
  onDrop,
  image,
  index,
  selectId,
  handleSelect,
  checked,
}) => {
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
      <input
        onClick={() => handleSelect(image._id)}
        type="checkbox"
        checked={checked}
        readOnly
      />
      <img src={image.img} alt={`Image ${index + 1}`} />
      <div className={`${selectId.includes(image._id) ? "" : "overlay"}`}></div>
    </div>
  ) : (
    <div className={isPopupOpen ? "image-popup" : ""}>
      <img src={image.img} alt="Popup" />
      <div className="delete-icon" onClick={closePopup}></div>
    </div>
  );
};

export default Card;
