import React from "react";
import "./card.css";
const Card = ({ image, index, provided, selectId, handleSelect }) => {
  return (
    <div
      key={index}
      className={`image-card ${index === 0 ? "big" : "small"}`}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
    >
      <input onClick={() => handleSelect(image.id)} type="checkbox" />
      <img src={image.img} alt={`Image ${index + 1}`} />
      <div className={`${selectId.includes(image.id) ? "" : "overlay"}`}></div>
    </div>
  );
};

export default Card;
