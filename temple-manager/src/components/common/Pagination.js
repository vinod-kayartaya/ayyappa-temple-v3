import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i);

  if (totalPages <= 1) return null;

  return (
    <nav>
      <ul className='pagination pagination-sm justify-content-center mb-0'>
        <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
          <button
            className='page-link'
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Previous
          </button>
        </li>
        {pages.map(page => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? 'active' : ''}`}
          >
            <button
              className='page-link'
              onClick={() => onPageChange(page)}
            >
              {page + 1}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
          <button
            className='page-link'
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination; 