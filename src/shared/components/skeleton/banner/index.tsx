import React from 'react'

const BannerSkeletonLoader = () => {
    return (
        <div className="w-full rounded-md">
            <div className="flex space-x-4 animate-pulse">
                <div className="w-full h-[300px] md:h-[calc(100vh-250px)] bg-gray-400"></div>
            </div>
        </div>
    )
}

export default BannerSkeletonLoader