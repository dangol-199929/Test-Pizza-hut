import Link from 'next/link'
import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion'
import { Button } from '../../ui/button'

interface IMobAccordionProps {
    item: any,
    changeRoute: (value: string) => void,
}

const CategoryMobAccordion = ({ item, changeRoute }: IMobAccordionProps) => {
    return (
        <>
            <AccordionTrigger className="!py-2.5 !px-5 !border-b-gray-1200 !font-normal flex items-center justify-between !text-sm no-underline hover:no-underline ">
                <p className='!p-0 text-start font-normal h-auto' onClick={() => changeRoute(`/categories/${item?.slug}`)}>{item?.name}</p>
            </AccordionTrigger>
            <AccordionContent className='p-0 border-t [&>div]:pb-0'>
                {item.subCategories.map((subCategory: any, subIndex: number) => (
                    <Button
                        variant='ghost'
                        onClick={() => changeRoute(`/categories/${subCategory.slug}`)}
                        className="py-2.5 w-full text-start font-normal px-5 border-b hover:!pl-7 block"
                        key={subIndex}
                    >
                        {subCategory.name}
                    </Button>
                ))}
            </AccordionContent>
        </>
    )
}

export default CategoryMobAccordion