type ViewMode = 'pagination' | 'infinite';

type Props = {
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
};

const PaginationController = ({ viewMode, onViewChange }: Props) => {
  return (
    <div className="w-full py-10 flex flex-col items-center gap-3">
      <h1 className="text-3xl font-bold text-gray-900">⚡ Pokédex</h1>
      <p className="text-gray-800">
        {viewMode === 'pagination'
          ? 'Discover and explore Pokemon with page controls'
          : 'Discover and explore Pokemon with infinite scroll'}
      </p>
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onViewChange('pagination')}
          className={`px-5 py-2 rounded-lg text-sm font-medium border transition-colors ${
            viewMode === 'pagination'
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          Page Controls
        </button>

        <button
          onClick={() => onViewChange('infinite')}
          className={`px-5 py-2 rounded-lg text-sm font-medium border transition-colors ${
            viewMode === 'infinite'
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          Infinite Scroll
        </button>
      </div>
    </div>
  );
};

export default PaginationController;
