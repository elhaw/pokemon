const StatBar = ({ name, value }: { name: string; value: number }) => (
  <div className="flex flex-col gap-1">
    <div className="flex justify-between text-sm">
      <span className="text-gray-600 capitalize">{name}</span>
      <span className="text-gray-500">{value}</span>
    </div>
    <div className="w-full bg-gray-100 rounded-full h-1.5">
      <div
        className="bg-gray-800 h-1.5 rounded-full"
        style={{ width: `${Math.min((value / 255) * 100, 100)}%` }}
      />
    </div>
  </div>
);

export default StatBar;
