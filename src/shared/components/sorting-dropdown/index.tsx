import CaretDownIcon from '@/shared/icons/common/CaretDownIcon';
import React, { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

export interface ISortDropdown {
    sortChange: (arg0: string) => void;

}

const SortingDropdown: React.FC<ISortDropdown> = ({ sortChange }) => {
    const options = [
        { label: 'A to Z', value: 'asc' },
        { label: 'Z to A', value: 'desc' },
        { label: 'Price (Low > High)', value: 'low' },
        { label: 'Price (High > Low)', value: 'high' }
    ];

    const [selectedType, setSelectedType] = useState("Please Select");

    const handleTypeChange = (text: string) => {
        setSelectedType(text);
    };

    return (
        <div className='flex-grow md:flex-grow-0'>
            <DropdownMenu>
                <DropdownMenuTrigger className="rounded-[20px] w-full bg-white border px-4 py-2 border-gray-350 md:min-w-full lg:min-w-[250px] whitespace-nowrap text-gray-50 text-sm font-medium flex gap-1 justify-between items-center focus:outline-none">
                    <span className="capitalize">{selectedType}</span>
                    <CaretDownIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[250px] p-0 rounded-sm">
                    <DropdownMenuItem
                        disabled
                        className='pointer-events-none bg-slate-150 hover:bg-none'
                    >
                        <span className='border-0 rounded-none bg-none hover:!bg-none opacity-25'>Please Select</span>
                    </DropdownMenuItem>

                    {options.map((option) => (
                        <DropdownMenuItem
                            key={option?.value}
                            className={`cursor-pointer rounded-none font-normal py-2.5 text-black hover:!bg-[#f5faff] hover:!text-black ${selectedType === option.label ? 'bg-[#ebf5ff]' : '!bg-transparent'}`}
                            onClick={() => { handleTypeChange(option.label); sortChange(option.value) }}>
                            <span className='border-0 rounded-none bg-none hover:!bg-transparent'>{option.label}</span>
                        </DropdownMenuItem>
                    ))}

                </DropdownMenuContent>
            </DropdownMenu >
        </div>
    );
};

export default SortingDropdown;