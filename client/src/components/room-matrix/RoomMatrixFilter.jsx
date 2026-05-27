function RoomMatrixFilter({
  categoryValue,
  onCategoryChange,
  floorValue,
  onFloorChange,
  floors = [],
}) {
  const filters = [
    { label: "All", value: "all" },
    { label: "Hotel", value: "hotel" },
    { label: "Residency", value: "residency" },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-3">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onCategoryChange(filter.value)}
          className={`px-4 py-2 rounded-md transition ${
            categoryValue === filter.value
              ? "bg-black text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {filter.label}
        </button>
      ))}

      <div className="flex items-center gap-3">
        <select
          value={floorValue}
          onChange={(e) => onFloorChange(e.target.value)}
          className="px-4 py-2 border border-gray-500 rounded-md w-full text-center md:text-left"
        >
          <option value="all">All Floors</option>
          {floors.map((floor) => (
            <option key={floor} value={floor}>
              Floor {floor}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default RoomMatrixFilter;