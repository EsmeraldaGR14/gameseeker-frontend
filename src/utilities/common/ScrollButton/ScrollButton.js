import React, { useEffect, useState } from 'react';
import "./ScrollButton.css"

function ScrollButton() {
    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 300) {
          setShowScrollButton(true);
        } else {
          setShowScrollButton(false);
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
  
    return (
        <div>
          {showScrollButton && (
            <button className="scroll-top-button" onClick={scrollToTop}>
              &#8679;
            </button>
          )}
        </div> 
    );
}

export default ScrollButton;