export const PokemonCardSkeleton = () => {
  return (
    <div className="animate-pulse border-gray-50 rounded-lg p-4 flex flex-col gap-3">
      <div className="w-full h-40 bg-gray-200 rounded-lg" />
      <div className="h-3 w-4/6 bg-gray-200 rounded" />
      <div className="h-3 w-1/2 bg-gray-200 rounded" />
    </div>
  );
};

export default PokemonCardSkeleton;
