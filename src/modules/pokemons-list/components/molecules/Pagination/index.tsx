import classNames from 'classnames';
import { getPageNumbers } from '@/modules/pokemons-list/utils';
type Props = {
  page: number;
  totalPages: number;
  limit: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, totalPages, limit, onPageChange }: Props) => {
  const navButtonClass = classNames(
    'px-2 sm:px-4 py-2 rounded-lg border border-gray-200 text-xs sm:text-sm font-medium',
    'hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap'
  );

  const getPageButtonClass = (pageNumber: number) =>
    classNames(
      'w-8 h-8 sm:w-10 sm:h-10 rounded-lg border text-xs sm:text-sm font-medium transition-colors',
      {
        'bg-gray-900 text-white border-gray-900': page === pageNumber,
        'border-gray-200 text-gray-700 hover:bg-gray-50': page !== pageNumber,
      }
    );

  const pagesArray = getPageNumbers({ totalPages, page });
  return (
    <div className="flex flex-col items-center gap-2 mt-8 px-4 w-full">
      <div className="flex items-center gap-1 flex-wrap justify-center">
        {/* Previous */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0}
          className={navButtonClass}
        >
          &lt; <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Page Numbers */}
        {pagesArray.map((pageNumber, i) =>
          pageNumber === '...' ? (
            <span
              key={`ellipsis-${i}`}
              className="px-1 sm:px-3 py-2 text-gray-400 text-xs sm:text-sm"
            >
              ...
            </span>
          ) : (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={getPageButtonClass(pageNumber)}
            >
              {pageNumber + 1}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page + 1 >= totalPages}
          className={navButtonClass}
        >
          <span className="hidden sm:inline">Next</span> &gt;
        </button>
      </div>

      {/* Info */}
      <p className="text-xs sm:text-sm text-gray-500 text-center">
        Page {page + 1} of {totalPages}{' '}
        <span className="hidden sm:inline">({limit} Pokemon shown)</span>
      </p>
    </div>
  );
};

export default Pagination;
