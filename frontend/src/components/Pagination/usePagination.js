import { useMemo, useState } from "react";

function usePagination(items, itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil((items?.length || 0) / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedItems = useMemo(() => {
    const indexOfLastItem = safeCurrentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return (items || []).slice(indexOfFirstItem, indexOfLastItem);
  }, [items, itemsPerPage, safeCurrentPage]);

  const goToPage = (pageNumber) => {
    const clampedPage = Math.max(1, Math.min(pageNumber, totalPages));
    setCurrentPage(clampedPage);
  };

  return {
    currentPage: safeCurrentPage,
    totalPages,
    paginatedItems,
    goToPage,
    setCurrentPage,
  };
}

export default usePagination;
