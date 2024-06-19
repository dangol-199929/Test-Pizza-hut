import React from 'react';

const SkeletonLoadingCard = () => {
  return (
    <div className="bg-white border card plant-card">
      <figure className="mb-4 bg-gray-300 h-60 animate-pulse"></figure>
      <div className="w-20 h-5 mx-4 mb-3 bg-gray-300 rounded animate-pulse"></div>
      <div className="w-40 h-5 mx-4 mb-3 bg-gray-300 rounded animate-pulse"></div>
      <div className="w-24 h-5 mx-4 mb-3 bg-gray-300 rounded animate-pulse"></div>
    </div>
  );
};

export default SkeletonLoadingCard;