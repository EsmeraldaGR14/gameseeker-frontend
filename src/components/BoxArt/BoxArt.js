import React from "react";
import "./BoxArt.css";

function BoxArt({ boxart, title }) {
  return (
    <div className="card">
      <img src={boxart} alt="" height="300px"></img>
      <div>{title}</div>
    </div>
  );
}

export default BoxArt;
