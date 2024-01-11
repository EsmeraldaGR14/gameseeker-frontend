import React from "react";

function Platform({ platform }) {
  let string = platform.map((element, index) =>
      index === platform.length - 1 ? element : element + ", "
    ).join("")
    
  return (
    <p>
      <strong>Platforms(s):</strong> {string}
    </p>
  );
}

export default Platform;
