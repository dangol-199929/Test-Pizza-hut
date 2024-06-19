import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/components/ui/dropdown-menu';
import Link from 'next/link'
import React, { useState } from 'react'

const CategorySubItem = ({ item }: any) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    return (
        <DropdownMenu
            open={isHovered}
            onOpenChange={setIsHovered}
            modal={false}
        >
            <DropdownMenuTrigger 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)} 
            className="text-sm text-left transition-all hover:text-primary !bg-transparent py-2.5 px-5 border-b hover:!pl-7 cursor-pointer w-full">
                <Link
                    href={`/categories/${item.slug}`}
                    className=' whitespace-nowrap focus:!bg-transparent block '
                >
                    {item.name}
                </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)} 
            side='right' className='!p-0'>
                {item.subCategories.map((subCategory: any, subIndex: number) => (
                    <DropdownMenuItem key={`sub-menu-${subIndex}`} className="border-b rounded-0">
                        <Link
                            href={`/categories/${subCategory.slug}`}
                            className="transition-all hover:text-primary py-2 px-5 hover:!pl-7"
                        >
                            {subCategory.name}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CategorySubItem
