import React, { useState, useRef, useEffect } from "react";

const PriceRange = ({ minPrice = 0, maxPrice = 10000, step = 1 }) => {
  const [minValue, setMinValue] = useState(minPrice);
  const [maxValue, setMaxValue] = useState(maxPrice);
  const [dragging, setDragging] = useState(null); // 'min' or 'max'
  const sliderRef = useRef(null);
  const gap = 500;
  const handleMouseDown = (e, handle) => {
    e.preventDefault();
    setDragging(handle);
  };

  const handleMouseMove = (e) => {
    if (dragging === null) return;

    const slider = sliderRef.current;
    const rect = slider.getBoundingClientRect();
    const sliderWidth = rect.width;
    const offsetX = e.clientX - rect.left;
    console.log(offsetX)
    const value = Math.min(maxPrice, Math.max(minPrice, Math.round((offsetX / sliderWidth) * (maxPrice - minPrice) + minPrice)));

    if (dragging === 'min') {
      setMinValue(Math.min(value, maxValue - (step + gap))); // Prevent minValue from crossing maxValue
    } else if (dragging === 'max') {
      setMaxValue(Math.max(value, minValue + (step+gap))); // Prevent maxValue from crossing minValue
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  useEffect(() => {
    // Attach mouse move and mouse up events
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  // Calculate percentage positions for min and max handles
  const minPercent = ((minValue - minPrice) / (maxPrice - minPrice)) * 100;
  const maxPercent = ((maxValue - minPrice) / (maxPrice - minPrice)) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto py-2">
      <h1 className="font-bold text-xl mb-2">Price</h1>
      <div className="flex  justify-start mb-4 gap-3 items-center">
        <input type="number" value={minValue} className="w-[30%] h-10 outline-none border pl-3"></input> 
        <span className="text-xl"> - </span>
        <input type="number" value={maxValue} className="w-[30%] h-10 outline-none border pl-3"></input>
      </div>
      <div className="relative w-[80%] h-2 bg-gray-400 rounded-full" ref={sliderRef}>
        {/* Min handle */}
        <div
          className="absolute w-5 h-5 bg-gray-300 z-10 rounded-full cursor-pointer transform -translate-x-1/2 -bottom-1"
          style={{ left: `${minPercent}%` }}
          onMouseDown={(e) => handleMouseDown(e, 'min')}
        />
        {/* Max handle */}
        <div
          className="absolute w-5 h-5 bg-gray-300 z-10 rounded-full cursor-pointer transform -translate-x-1/2 -bottom-1"
          style={{ left: `${maxPercent}%` }}
          onMouseDown={(e) => handleMouseDown(e, 'max')}
        />
        {/* Progress bar between handles */}
        <div
          className="absolute h-full bg-gray-500 rounded-full"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />
      </div>
      <button className="px-10 py-3 border border-black text-black hover:bg-black hover:text-white text-center mt-4 mx-auto">
      Apply Filter
      </button>
    </div>
  );
};

export default PriceRange;
