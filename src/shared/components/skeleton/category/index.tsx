import React from 'react'

const CategorySkeletonLoading = () => {
    return (
        <div className="bg-white border card plant-card">
            <div className='flex items-center h-40'>
                <div>
                    <div className="w-40 h-5 mx-4 mb-3 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-20 h-5 mx-4 mb-3 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-24 h-5 mx-4 mb-3 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <figure className="w-full h-full bg-gray-300 animate-pulse"></figure>
            </div>
        </div>
    )
}

export default CategorySkeletonLoading