import React from 'react'

interface IProps {
    className?: string
}
const SkeletonImage = ({ className }: IProps) => {
    return (
        <figure className={`mb-4 bg-gray-300 w-full md:w-80 h-40 md:h-80 animate-pulse  ${className}`}></figure>
    )
}

export default SkeletonImage