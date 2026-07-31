import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForwardStep, faBackwardStep } from "@fortawesome/free-solid-svg-icons";
import "./Pagination.css";

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  containerClassName,
  maxVisiblePages = 3,
}) {
  const safeTotalPages = Math.max(1, totalPages || 1);
  const safeCurrentPage = Math.max(1, Math.min(currentPage, safeTotalPages));

  if (safeTotalPages <= 1) {
    return null;
  }

  const goToPage = (pageNumber) => {
    const clampedPage = Math.max(1, Math.min(pageNumber, safeTotalPages));
    onPageChange(clampedPage);
  };

  const getPageNumbers = () => {
    const pages = [];

    if (safeTotalPages <= maxVisiblePages) {
      for (let i = 1; i <= safeTotalPages; i += 1) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    if (safeCurrentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(4, safeCurrentPage - 1);
    const end = Math.min(safeTotalPages - 1, safeCurrentPage + 1);

    for (let i = start; i <= end; i += 1) {
      pages.push(i);
    }

    if (safeCurrentPage < safeTotalPages - 2) {
      pages.push("...");
    }

    pages.push(safeTotalPages);

    return pages;
  };

  return (
    <div className={`pagination-component ${containerClassName || ""}`}>
      <button
        className="pagination-nav"
        onClick={() => goToPage(safeCurrentPage - 1)}
        disabled={safeCurrentPage === 1}
      >
        <FontAwesomeIcon icon={faBackwardStep} />
      </button>

      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="pagination-ellipsis">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`pagination-button ${safeCurrentPage === page ? "active" : ""}`}
          >
            {page}
          </button>
        ),
      )}

      <button
        className="pagination-nav"
        onClick={() => goToPage(safeCurrentPage + 1)}
        disabled={safeCurrentPage === safeTotalPages}
      >
        <FontAwesomeIcon icon={faForwardStep} />
      </button>
    </div>
  );
}

export default Pagination;
