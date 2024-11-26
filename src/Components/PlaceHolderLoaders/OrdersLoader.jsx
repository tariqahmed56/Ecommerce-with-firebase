const OrdersLoader = () => {
    return (
      <div className="py-4 border-t border-b text-gray-300 flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-pulse">
        <div className="flex items-start gap-6 text-sm">
          <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gray-300 rounded"></div>
          <div className="flex flex-col gap-2 w-full">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="flex gap-3 mt-1">
              <div className="h-4 bg-gray-300 rounded w-16"></div>
              <div className="h-4 bg-gray-300 rounded w-24"></div>
              <div className="h-4 bg-gray-300 rounded w-12"></div>
            </div>
            <div className="h-4 bg-gray-300 rounded w-1/3 mt-1"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mt-1"></div>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="min-w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-300 rounded w-24"></div>
          </div>
          <div className="h-8 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
    );
  };
  
  export default OrdersLoader;
  