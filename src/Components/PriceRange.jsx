import React, { useState, useEffect, useRef } from 'react';
// styling of this component are inside index.css 
const PriceRange = ({ min, max, step, gap, onChange }) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const minRef = useRef(null);
  const maxRef = useRef(null);
  const rangeRef = useRef(null);

  useEffect(() => {
    updateRangeWidth();
  }, [minValue, maxValue]);

  const updateRangeWidth = () => {
    if (minRef.current && maxRef.current && rangeRef.current) {
      const minPercent = ((minValue - min) / (max - min)) * 100;
      const maxPercent = ((maxValue - min) / (max - min)) * 100;
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  };

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - gap); 
    setMinValue(value);
    onChange({ min: value, max: maxValue });
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + gap); 
    setMaxValue(value);
    onChange({ min: minValue, max: value });
  };

  return (
    <div className="">
      <h2 className='font-bold mb-10'> Price Range</h2>
    <div className="slider-container">
      <input
        type="range"
        ref={minRef}
        min={min}
        max={max}
        step={step}
        value={minValue}
        onChange={handleMinChange}
        className="thumb thumb-left"
      />
      <input
        type="range"
        ref={maxRef}
        min={min}
        max={max}
        step={step}
        value={maxValue}
        onChange={handleMaxChange}
        className="thumb thumb-right"
      />
      <div className="slider">
        <div className="slider-track"></div>
        <div ref={rangeRef} className="slider-range"></div>
        <div className="slider-left-value">{minValue}</div>
        <div className="slider-right-value">{maxValue}</div>
      </div>
    </div>
    </div>
  );
};

export default PriceRange;
