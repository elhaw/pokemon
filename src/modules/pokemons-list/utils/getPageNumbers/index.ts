type GetPageNumbersParams = {
  totalPages: number;
  page: number;
};

type PageItem = number | '...';

const getPageNumbers = ({
  totalPages,
  page,
}: GetPageNumbersParams): PageItem[] => {
  // Show all pages if total is small enough
  const isSmallList = totalPages <= 7;
  if (isSmallList) {
    return Array.from({ length: totalPages }, (_, i) => i);
  }

  // Calculate the window of 5 pages around current page
  let start = Math.max(0, page - 2);
  let end = start + 4;

  // Clamp end to last page and adjust start accordingly
  if (end >= totalPages) {
    end = totalPages - 1;
    start = Math.max(0, end - 4);
  }

  const pages: PageItem[] = [];

  // Add first page and left ellipsis if needed
  const hasLeftGap = start > 0;
  if (hasLeftGap) {
    pages.push(0);
    const needsLeftEllipsis = start > 1;
    if (needsLeftEllipsis) pages.push('...');
  }

  // Add the middle window of pages
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // Add right ellipsis and last page if needed
  const hasRightGap = end < totalPages - 1;
  if (hasRightGap) {
    const needsRightEllipsis = end < totalPages - 2;
    if (needsRightEllipsis) pages.push('...');
    pages.push(totalPages - 1);
  }

  return pages;
};

export default getPageNumbers;
