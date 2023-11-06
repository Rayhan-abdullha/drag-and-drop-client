import React from "react";

const Card = ({ onDragStart, onDrop, image, index }) => {
  return (
    <div
      onDragStart={() => onDragStart(image)}
      onDrop={() => onDrop(index)}
      draggable={true}
      key={index}
      className={`image-card ${index === 0 ? "big" : "small"}`}
    >
      <img src={image.img} alt={`Image ${index}`} />
      <div className="overlay"></div>
    </div>
  );
};

export default Card;
