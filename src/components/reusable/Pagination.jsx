"use client";
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as ShadcnPagination,
} from "@/components/ui/pagination";
import { useEffect } from "react";
import useDataHandler from "../../hooks/useDataHandler";

const Pagination = ({ totalItemsNumber, itemsPerPage }) => {
  const { activePageNumber, setActivePageNumber, setTotalPageNumber } =
    useDataHandler();

  const totalPages =
    Number(totalItemsNumber) > 0
      ? Math.ceil(Number(totalItemsNumber) / Number(itemsPerPage))
      : 0;

  useEffect(() => {
    setTotalPageNumber(totalPages);
  }, [totalPages]);

  const handlePreviousPage = () => {
    if (activePageNumber > 0) {
      setActivePageNumber(activePageNumber - 1);
    }
  };

  const handleNextPage = () => {
    if (activePageNumber < totalPages - 1) {
      setActivePageNumber(activePageNumber + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setActivePageNumber(pageNumber);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 3;
    const startPage = Math.max(0, activePageNumber - 1);
    const endPage = Math.min(totalPages - 1, activePageNumber + 1);

    // first page and ellipsis
    if (activePageNumber > 1) {
      pages.push(
        <PaginationItem key="first">
          <PaginationLink
            onClick={() => handlePageClick(0)}
            className="cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (activePageNumber > 2) {
        pages.push(
          <PaginationItem key="start-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    // main page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageClick(i)}
            className={`cursor-pointer ${
              i === activePageNumber ? "bg-muted hover:bg-muted" : ""
            }`}
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // last page and ellipsis
    if (activePageNumber < totalPages - 2) {
      if (activePageNumber < totalPages - 3) {
        pages.push(
          <PaginationItem key="end-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      pages.push(
        <PaginationItem key="last">
          <PaginationLink
            onClick={() => handlePageClick(totalPages - 1)}
            className="cursor-pointer"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  if (totalPages === 0) return null;

  return (
    <ShadcnPagination>
      <PaginationContent>
        {/* previous button */}
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePreviousPage}
            className={`cursor-pointer ${
              activePageNumber === 0 ? "opacity-50 pointer-events-none" : ""
            }`}
          />
        </PaginationItem>

        {/* page numbers */}
        {renderPagination()}

        {/* next button */}
        <PaginationItem>
          <PaginationNext
            onClick={handleNextPage}
            className={`cursor-pointer ${
              activePageNumber === totalPages - 1
                ? "opacity-50 pointer-events-none"
                : ""
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
};

export default Pagination;
