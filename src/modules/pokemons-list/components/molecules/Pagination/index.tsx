type Props = {
  page: number;
  totalPages: number;
  limit: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, totalPages, limit, onPageChange }: Props) => {
  const getPageNumbers = (): (number | '...')[] => {
    const pages: (number | '...')[] = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    // ─── Always show 5 page numbers ───────────────────────────
    let start = Math.max(0, page - 2);
    let end = start + 4;

    // adjust if end exceeds totalPages
    if (end >= totalPages) {
      end = totalPages - 1;
      start = Math.max(0, end - 4);
    }

    // First page + left ellipsis
    if (start > 0) {
      pages.push(0);
      if (start > 1) pages.push('...');
    }

    // Middle 5 pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Right ellipsis + last page
    if (end < totalPages - 1) {
      if (end < totalPages - 2) pages.push('...');
      pages.push(totalPages - 1);
    }

    return pages;
  };
  return (
    <div className="flex flex-col items-center gap-2 mt-8">
      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0}
          className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium 
                     hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          &lt; Previous
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((pageNumber, i) =>
          pageNumber === '...' ? (
            <span
              key={`ellipsis-${i}`}
              className="px-3 py-2 text-gray-400 text-sm"
            >
              ...
            </span>
          ) : (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`w-10 h-10 rounded-lg border text-sm font-medium transition-colors ${
                page === pageNumber
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {pageNumber + 1}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page + 1 >= totalPages}
          className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium 
                     hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next &gt;
        </button>
      </div>

      {/* Info */}
      <p className="text-sm text-gray-500">
        Page {page + 1} of {totalPages} ({limit} Pokemon shown)
      </p>
    </div>
  );
};

export default Pagination;
