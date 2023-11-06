import React from "react";
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
  return (
    <div
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
  );
};

export default Card;
