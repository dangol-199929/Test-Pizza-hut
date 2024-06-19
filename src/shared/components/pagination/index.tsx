import React, { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export interface IPagination {
    currentPage: number;
    pageChange: (arg0: number) => void;
    totalPages: number,
}

const Pagination: React.FC<IPagination> = ({ pageChange, currentPage, totalPages }) => {
    const [pageNumber, setPageNumber] = useState<any>(null)
    const paginationNumber = [];
    for (let i = 1; i <= totalPages + 1; i++) {
        paginationNumber.push(i);
    }

    const handlePaginationEllipsis= () => {
        let isPageNumberOutOfRange: boolean = false;
        let pageNumbers: any;
        pageNumbers = [...new Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            const isPageNumberFirst = pageNumber === 1;
            const isPageNumberLast = pageNumber === totalPages;
            const isCurrentPageWithinTwoPageNumbers = Math.abs(pageNumber - currentPage) <= 2;
            const handleEllipsisClick = () => {
                if (pageNumber > 0) pageChange(pageNumber);
            };

            if (isPageNumberFirst || isPageNumberLast || isCurrentPageWithinTwoPageNumbers) {
                isPageNumberOutOfRange = false;
                return (
                    <button key={pageNumber} className={`${pageNumber === currentPage && 'active'}`} onClick={() => pageChange(pageNumber)}>{pageNumber}</button>
                );
            }
            if (!isPageNumberOutOfRange) {
                isPageNumberOutOfRange = true;
                return <button className="page-link" key={pageNumber} onClick={handleEllipsisClick}>...</button>;
            }

            return null;
        });
        setPageNumber(pageNumbers)
    }
    useEffect(() => {
        handlePaginationEllipsis()
    }, [totalPages, currentPage])
    
    return (
        <div className='pagination_content'>
            <button className={currentPage === 1 ? 'disabled' : ''}
                disabled={currentPage === 1}
                onClick={() => pageChange(currentPage - 1)}
            >
                <FaChevronLeft />
            </button>
            <div className='flex items-center gap-[5px]'>
                {pageNumber}
            </div>
            <button
                className={currentPage === totalPages ? 'disabled' : ''}
                disabled={currentPage === totalPages}
                onClick={() => pageChange(currentPage + 1)}
            >
                <FaChevronRight />
            </button>
        </div>
    )
}

export default Pagination