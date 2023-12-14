import React from "react";
import "./BoxArt.css";

function BoxArt({ image, name, year, className }) {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const boundingBox = card.getBoundingClientRect();
    const mouseX = e.clientX - boundingBox.left;
    const mouseY = e.clientY - boundingBox.top;
    const rotateX = (mouseY / boundingBox.height - 0.5) * 30;
    const rotateY = (mouseX / boundingBox.width - 0.5) * 30;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "rotateX(0) rotateY(0)";
  };
  
  return (
    <div
      className={`card-${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img className="card-image" src={image} alt={name}></img>
    </div>
  );
}

export default BoxArt;
