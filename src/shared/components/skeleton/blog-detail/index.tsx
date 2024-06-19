import React from 'react'

const SkeletonBlogDetail = () => {
  return (
    <div className="w-full bg-white">
      <figure className="mb-4 bg-gray-300 h-80 animate-pulse"></figure>
      <div className="w-40 h-5 mx-4 mb-3 bg-gray-300 rounded animate-pulse"></div>
      <div className="h-5 mx-4 mb-3 bg-gray-300 rounded w-80 animate-pulse"></div>
      <div className="h-5 mx-4 mb-3 bg-gray-300 rounded w-60 animate-pulse"></div>
      <div className="w-24 h-5 mx-4 mb-3 bg-gray-300 rounded animate-pulse"></div>
    </div>
  )
}

export default SkeletonBlogDetail
