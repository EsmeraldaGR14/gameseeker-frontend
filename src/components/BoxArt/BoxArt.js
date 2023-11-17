import React from "react";
import "./BoxArt.css";

/* BOX ART COMPONENT
 ** CARD THAT HAS IMAGE, NAME, AND YEAR
 ** HEIGHT FOR IMAGES? 300PX
 */

function BoxArt({ image, name, year }) {
  return (
    <div className="card">
      <img src={image} alt="" height="300px"></img>
      <div>{name}</div>
    </div>
  );
}

export default BoxArt;
