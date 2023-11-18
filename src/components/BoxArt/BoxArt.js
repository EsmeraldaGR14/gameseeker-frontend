import React from "react";
import "./BoxArt.css";

function BoxArt({ image, name }) {
  return (
    <div className="card">
      <img src={image} alt="" height="300px"></img>
      <div>{name}</div>
    </div>
  );
}

export default BoxArt;
