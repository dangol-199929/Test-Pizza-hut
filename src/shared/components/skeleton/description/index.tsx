import React from 'react'

const SkeletonDescription = () => {
    return (
        <div className='animate-pulse'>
            <div className="w-48 h-5 mb-4 bg-gray-300 rounded-full"></div>
            <div className='mt-8'>
                <div className="h-5 bg-gray-300 rounded-full max-w-[480px] mb-2.5"></div>
                <div className="h-5 bg-gray-300 rounded-full mb-2.5"></div>
                <div className="h-5 bg-gray-300 rounded-full max-w-[440px] mb-2.5"></div>
                <div className="h-5 bg-gray-300 rounded-full max-w-[460px] mb-2.5"></div>
                <div className="h-5 bg-gray-300 rounded-full max-w-[360px]"></div>
            </div>
        </div >
    )
}

export default SkeletonDescription