import React from 'react'

const SkeletonBlogCard = () => {
    return (
        <div className="border card bg-wwhite plant-card">
            <figure className="mb-4 bg-gray-300 h-80 animate-pulse"></figure>
            <div className="w-20 h-5 mx-4 mb-3 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-40 h-5 mx-4 mb-3 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-24 h-5 mx-4 mb-3 bg-gray-300 rounded animate-pulse"></div>
        </div>
    )
}

export default SkeletonBlogCard