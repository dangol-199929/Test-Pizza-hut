import React from 'react'

const SkeletonInput = () => {
    return (
            <div className=" text-gray-650 h-[45px] w-full outline-0 text-sm flex items-center space-x-4 animate-pulse">
                <div className="flex items-center w-full h-full space-y-6">
                    <div className="flex items-center w-full h-full space-y-3">
                        <div className="w-full h-full rounded bg-gray-350"></div>
                    </div>
                </div>
            </div>
    )
}

export default SkeletonInput