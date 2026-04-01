import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Pagination = ({
  totalItems = 0,
  itemsPerPage = 10,
  siblingCount = 1,
  showFirstLast = true,
  showPrevNext = true,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    () => Number(searchParams.get("page")) || 1,
  );

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Don't render pagination if there's only one page or no items
  if (totalPages <= 1) return null;

  const handlePageChange = (page) => {
    if (page === currentPage) return;
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", page);
      params.set("limit", itemsPerPage);
      return params;
    });
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftEllipsis = leftSiblingIndex > 2;
    const showRightEllipsis = rightSiblingIndex < totalPages - 1;

    // Always show first page
    pageNumbers.push(1);

    // Left ellipsis
    if (showLeftEllipsis) {
      pageNumbers.push("...");
    }

    // Middle pages
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if (i !== 1 && i !== totalPages) {
        pageNumbers.push(i);
      }
    }

    // Right ellipsis
    if (showRightEllipsis) {
      pageNumbers.push("...");
    }

    // Always show last page if totalPages > 1
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex flex-col gap-4 border-t border-gray-200 pt-6 mt-6">
      {/* Page Numbers Row - Shows on all screens */}
      <div className="flex justify-center">
        <div className="flex items-center flex-wrap justify-center gap-1 sm:gap-2">
          {/* First page button */}
          {showFirstLast && currentPage !== 1 && totalPages > 1 && (
            <button
              onClick={() => handlePageChange(1)}
              className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-700  dark:text-slate-400 rounded-md transition-colors duration-200 cursor-pointer"
            >
              First
            </button>
          )}

          {/* Page numbers */}
          {pageNumbers.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-1.5 sm:px-2 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-700  dark:text-slate-400"
                >
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`
              min-w-8 sm:min-w-9 px-1.5 sm:px-3 py-1.5 sm:py-2 
              text-xs sm:text-sm font-medium rounded-md transition-all duration-200 cursor-pointer
              ${
                currentPage === page
                  ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                  : "text-slate-700  dark:text-slate-400 hover:bg-slate-400 dark:hover:bg-slate-600"
              }
            `}
              >
                {page}
              </button>
            );
          })}

          {/* Last page button */}
          {showFirstLast && currentPage !== totalPages && totalPages > 1 && (
            <button
              onClick={() => handlePageChange(totalPages)}
              className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-700  dark:text-slate-400 rounded-md transition-colors duration-200 cursor-pointer"
            >
              Last
            </button>
          )}
        </div>
      </div>

      {/* Previous/Next Buttons Row */}
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        {/* Previous button */}
        {showPrevNext && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`
          flex-1 sm:flex-none sm:w-32 px-4 py-2.5 sm:py-2 
          text-sm font-medium rounded-lg transition-all duration-200
          flex items-center justify-center gap-2
          ${
            currentPage === 1
              ? " dark:text-slate-700 text-slate-400  cursor-not-allowed"
              : " dark:text-slate-400 text-slate-700  cursor-pointer"
          }
        `}
          >
            <ChevronLeft className="w-6 h-6" />
            <span>Previous</span>
          </button>
        )}

        {/* Page Info - Mobile */}
        <div className="text-sm text-slate-700 dark:text-slate-400  font-medium whitespace-nowrap">
          Page {currentPage} of {totalPages}
        </div>

        {/* Next button */}
        {showPrevNext && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`
          flex-1 sm:flex-none sm:w-32 px-4 py-2.5 sm:py-2 
          text-sm font-medium rounded-lg transition-all duration-200
          flex items-center justify-center gap-2
          ${
            currentPage === totalPages
              ? " dark:text-slate-700 text-slate-400  cursor-not-allowed"
              : " dark:text-slate-400 text-slate-700  cursor-pointer"
          }
        `}
          >
            <span>Next</span>
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Pagination;
