import React, { useCallback } from 'react';
import './Pagination.css'; 

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }, [currentPage, totalPages, onPageChange]);

  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage, onPageChange]);

  return (
    <div className="pagination-container">
      <button className="pagination-button" onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </button>
      <span className="pagination-info">{`Page ${currentPage} of ${totalPages}`}</span>
      <button className="pagination-button" onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
