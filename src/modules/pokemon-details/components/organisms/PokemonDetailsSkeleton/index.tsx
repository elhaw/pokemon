const DetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-purple-50 p-8">
      <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse mb-6" />
      <div className="max-w-2xl mx-auto bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
        <div className="bg-gray-200 h-32" />
        <div className="grid grid-cols-2 gap-8 p-8">
          <div className="flex flex-col items-center gap-4">
            <div className="bg-gray-200 rounded-full w-56 h-56" />
            <div className="h-6 w-20 bg-gray-200 rounded-full" />
            <div className="grid grid-cols-2 w-full gap-3">
              <div className="h-16 bg-gray-200 rounded-xl" />
              <div className="h-16 bg-gray-200 rounded-xl" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded" />
            ))}
            <div className="h-4 w-24 bg-gray-200 rounded mt-2" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSkeleton;
