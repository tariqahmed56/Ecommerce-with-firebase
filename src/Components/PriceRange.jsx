import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { FaChevronDown } from 'react-icons/fa6';

function valuetext(value) {
  return `${value}`;
}

const minDistance = 1000;

export default function MinimumDistanceSlider({ setFilter  }) {
  const [value2, setValue2] = React.useState([0, 15000]);
  const [isExpanded, setIsExpanded] = React.useState(true);

  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 15000 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue);
    }

    // Update the parent with the new price range
    setFilter((prevFilters) => ({
      ...prevFilters,
      priceRange: newValue,
    }));
  };

  const toggleExpansion = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="w-full text-white box-border py-2 border-t border-gray-800 mt-1">
      <div 
        className="flex items-center justify-between cursor-pointer text-black font-semibold text-sm mb-2 w-full hover:text-gray-500"
        onClick={toggleExpansion}
      >
        <span>Price Range</span>
        <span className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
          <FaChevronDown size={15} />
        </span>
      </div>

      {isExpanded && (
        <Box sx={{ width: '100%' }}>
          <Slider
            getAriaLabel={() => 'Price Range'}
            value={value2}
            onChange={handleChange2}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={0}
            max={15000}
            disableSwap
          />
        </Box>
      )}
    </div>
  );
}
