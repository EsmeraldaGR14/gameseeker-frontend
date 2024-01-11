import React from "react";

function Publisher({ publisher }) {
     let string = publisher
       .map((element, index) =>
         index === publisher.length - 1 ? element : element + ", "
       )
       .join("");
  return (
    <p>
      <strong>Publisher(s):</strong> {string}
    </p>
  );
}

export default Publisher;
