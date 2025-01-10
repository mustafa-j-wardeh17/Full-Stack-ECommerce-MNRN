'use client'
import React, { memo } from 'react';
import { FaStar } from 'react-icons/fa';

const RatingStars = memo(({ avgRating }:{avgRating:number}) => {
  const filledStars = Math.floor(avgRating || 0);  // Pre-calculate the number of filled stars
  const stars = Array(5).fill(false).map((_, idx) => idx < filledStars);

  return (
    <span className="flex xl:text-sm text-xs space-x-1 items-center">
      {stars.map((isFilled, idx) => (
        <FaStar
          key={idx} // Use index for key (fine in this case as it’s static)
          className={isFilled ? 'text-amber-500' : 'text-gray-300'}
        />
      ))}
    </span>
  );
});

export default RatingStars;
