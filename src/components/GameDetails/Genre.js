import React from "react";

function Genre({ genre }) {
    
    let string = genre
      .map((element, index) =>
        index === genre.length - 1 ? element : element + ", "
      )
      .join("");
    
  return (
    <p>
      <strong>Genre(s):</strong> {string}
    </p>
  );
}

export default Genre;
