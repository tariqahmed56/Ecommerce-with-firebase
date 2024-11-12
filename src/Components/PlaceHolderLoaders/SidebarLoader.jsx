import React from 'react';
import { FaChevronDown } from 'react-icons/fa6';
const SidebarLoader = () => {
  return (
    <div className="md:min-w-[250px] md:max-w-[320px] md:w-[320px] w-full px-5 text-black pt-4 py-8 mt-12 relative min-h-[100dvh]">
      <div className="py-2 border-t border-gray-800 text-sm font-semibold flex items-center justify-between">
        <div className="w-1/2 h-4 bg-gray-300 animate-pulse"></div>
        <span className="text-gray-400">
          <FaChevronDown size={15} />
        </span>
      </div>
      
      <div className="flex flex-col py-2 space-y-2">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-gray-300 animate-pulse"></div>
            <div className="w-3/4 h-4 bg-gray-300 animate-pulse"></div>
          </div>
        ))}
      </div>

      <div className="py-4 border-t border-gray-800">
        <div className="w-full h-4 bg-gray-300 animate-pulse mb-2"></div>
        <div className="flex justify-between">
          <div className="w-1/3 h-4 bg-gray-300 animate-pulse"></div>
          <div className="w-1/3 h-4 bg-gray-300 animate-pulse"></div>
        </div>
      </div>

      <div className="py-2 mt-2 border-t border-gray-800">
        <div className="text-sm font-semibold flex items-center justify-between">
          <div className="w-1/3 h-4 bg-gray-300 animate-pulse"></div>
          <span className="text-gray-400">
            <FaChevronDown size={15} />
          </span>
        </div>
        <div className="py-2 space-y-2">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-gray-300 animate-pulse"></div>
              <div className="w-3/4 h-4 bg-gray-300 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarLoader;
