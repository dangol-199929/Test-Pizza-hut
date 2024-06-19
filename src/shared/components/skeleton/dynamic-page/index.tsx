import React from 'react'
import SkeletonImage from '../image'
import SkeletonDescription from '../description'

const SkeletonDynamicPage = () => {
    return (
        <>
            <SkeletonImage className='w-full' />
            <div className="container">
                <div className="grid grid-cols-12 gap-4 py-8 md:gap-6">
                    <div className="col-span-4">
                        <SkeletonImage />
                    </div>
                    <div className="col-span-8">
                        <SkeletonDescription />
                    </div>

                </div>
            </div>
        </>
    )
}

export default SkeletonDynamicPage