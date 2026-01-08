import React, { useRef } from "react";
import "./HorizontalScroll.css";

function HorizontalScroll({ children }) {
  const scrollAmount = 300;
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="horizontalScroll">
      <button className="scrollButton left" onClick={() => scroll("left")} aria-label="Scroll Left">
        &#8249;
      </button>
      <div className="scrollContainer" ref={scrollRef}>
        {children}
      </div>
      <button className="scrollButton right" onClick={() => scroll("right")} aria-label="Scroll Right">
        &#8250;
      </button>
    </div>
  );
}

export default HorizontalScroll;
