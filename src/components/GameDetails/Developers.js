import React from "react";

function Developers({ developers }) {
 const developerString = developers.join(", ");
  return (
    <p>
      <strong>Developer(s):</strong> {developerString}
    </p>
  );
}

export default Developers;
