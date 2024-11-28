import React from 'react';

const ProductsLoader = () => {
  return (
    <div className="flex flex-col w-[200px] relative h-[340px] border border-gray-200 rounded-md animate-pulse">
      <div className="bg-gray-300 h-[75%] relative group overflow-hidden" />
      <div className="mt-2 px-2 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4" />
        <div className="h-3 bg-gray-300 rounded w-full" />
        <div className="h-3 bg-gray-300 rounded w-1/2" />
      </div>
      <div className="price flex gap-1 items-center px-2 mt-2">
        <div className="w-6 h-3 bg-gray-300 rounded" />
        <div className="w-10 h-4 bg-gray-300 rounded" />
        <div className="w-10 h-3 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export default ProductsLoader;
