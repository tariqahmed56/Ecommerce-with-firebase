import React from 'react';
import { FaStar, FaUserCircle } from 'react-icons/fa';

const ReviewsList = ({ reviews, productTitle }) => {
  const formatTimestampToDate = (millisecond) => {
    const date = new Date(millisecond);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  return (
    <div className="reviews container mx-auto px-5 lg:px-10 py-5">
      <h2 className="text-xl font-normal text-gray-800 mb-4 text-center">
        <span className="text-gray-600">Reviews & Ratings for</span> {productTitle}
      </h2>
      <div className="grid  gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="border border-gray-200 shadow-lg rounded-lg bg-white p-5 flex flex-col gap-4 relative"
          >
            <div className="flex items-center gap-3">
              <FaUserCircle size={40} className="text-gray-400" />
              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  {review?.userName  || 'Anonymous'}
                </h3>
                <span className="text-sm text-gray-500">
                  {formatTimestampToDate(review.updatedAt.seconds * 1000)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  size={20}
                  className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>

            <p className="text-gray-700 text-sm">
              {review?.description || 'No description provided.'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsList;
