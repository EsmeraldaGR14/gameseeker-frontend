import React from "react";

function Publisher({ publisher }) {
     let string = publisher
       .map((element, index) =>
         index === publisher.length - 1 ? element : element + ", "
       )
       .join("");
  return <p>Publisher: {string}</p>;
}

export default Publisher;
