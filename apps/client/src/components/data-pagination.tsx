import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/ui/components/ui/pagination";

interface DataPaginationProps {
  currentPage: number;
  lastPage: number;
  /** Number of page links to show on each side of the current page. */
  siblingCount?: number;
  onPageChange: (page: number) => void;
}

const DOTS = "dots";

const range = (start: number, end: number): number[] =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

/**
 * Builds a compact page list with ellipses, e.g. `1 … 5 6 7 … 42`.
 * Keeps the first/last page and a window around the current page.
 */
const getPaginationRange = (
  currentPage: number,
  lastPage: number,
  siblingCount: number,
): (number | typeof DOTS)[] => {
  // first + last + current + 2*siblings + 2 ellipsis slots
  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPageNumbers >= lastPage) {
    return range(1, lastPage);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, lastPage);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < lastPage - 1;

  if (!showLeftDots && showRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    return [...range(1, leftItemCount), DOTS, lastPage];
  }

  if (showLeftDots && !showRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    return [1, DOTS, ...range(lastPage - rightItemCount + 1, lastPage)];
  }

  return [1, DOTS, ...range(leftSibling, rightSibling), DOTS, lastPage];
};

export const DataPagination: React.FC<DataPaginationProps> = ({
  currentPage,
  lastPage,
  siblingCount = 1,
  onPageChange,
}) => {
  if (lastPage <= 1) return null;

  const pages = getPaginationRange(currentPage, lastPage, siblingCount);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(currentPage - 1)}
            aria-disabled={currentPage <= 1}
            className={
              currentPage <= 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>

        {pages.map((page, index) =>
          page === DOTS ? (
            <PaginationItem key={`dots-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => onPageChange(page)}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(currentPage + 1)}
            aria-disabled={currentPage >= lastPage}
            className={
              currentPage >= lastPage
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
