const TypeBadge = ({ type }: { type: string }) => (
  <span className="px-3 py-1 rounded-full text-white text-xs font-medium bg-red-500 capitalize">
    {type}
  </span>
);
export default TypeBadge;
