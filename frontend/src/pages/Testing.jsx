import React, { useState } from "react";

const Pagination = ({
  totalItems = 0,
  itemsPerPage = 10,

  siblingCount = 1,
  showFirstLast = true,
  showPrevNext = true,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Don't render pagination if there's only one page or no items
  if (totalPages <= 1) return null;

  const handlePageChange = (page) => {
    if (page === currentPage) return;
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
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
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 mt-6">
      <div className="flex flex-1 w-0">
        {/* Previous button */}
        {showPrevNext && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`
              relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
              ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-50"
              }
            `}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </button>
        )}
      </div>

      <div className="hidden md:flex items-center space-x-2">
        {/* First page button */}
        {showFirstLast && currentPage !== 1 && (
          <button
            onClick={() => handlePageChange(1)}
            className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
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
                className="px-3 py-2 text-sm text-gray-500"
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
                px-3 py-2 text-sm font-medium rounded-md
                ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-50"
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
            className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
          >
            Last
          </button>
        )}
      </div>

      {/* Mobile version - simpler navigation */}
      <div className="flex md:hidden items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md disabled:text-gray-300 disabled:cursor-not-allowed"
        >
          ←
        </button>
        <span className="px-3 py-2 text-sm font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md disabled:text-gray-300 disabled:cursor-not-allowed"
        >
          →
        </button>
      </div>

      <div className="flex flex-1 justify-end w-0">
        {/* Next button */}
        {showPrevNext && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`
              relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
              ${
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-50"
              }
            `}
          >
            Next
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>
    </nav>
  );
};

// Example usage with data
const Testing = () => {
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 5;

  // // Sample data
  // const allItems = Array.from({ length: 50 }, (_, i) => ({
  //   id: i + 1,
  //   name: `Item ${i + 1}`,
  //   description: `Description for item ${i + 1}`,
  // }));

  // // Get current items
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = allItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Pagination Example</h1>

      {/* Items grid
      <div className="grid gap-4 mb-6">
        {currentItems.map((item) => (
          <div key={item.id} className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div> */}

      {/* Pagination component */}
      <Pagination
        totalItems={50}
        itemsPerPage={5}
        siblingCount={1}
        showFirstLast={true}
        showPrevNext={true}
      />

      {/* Optional: Show items info */}
      {/* <div className="text-center text-sm text-gray-500 mt-4">
        Showing {indexOfFirstItem + 1} to{" "}
        {Math.min(indexOfLastItem, allItems.length)} of {allItems.length} items
      </div> */}
    </div>
  );
};

export default Testing;
