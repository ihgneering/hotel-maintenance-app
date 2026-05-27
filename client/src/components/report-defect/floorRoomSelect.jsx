function FloorRoomSelect({
  rooms,
  selectedFloor,
  setSelectedFloor,
  roomId,
  setRoomId,
}) {
  
  return (
    <div className="w-full gap-y-4 flex flex-col">

      <div>
        <p className="font-bold bg-white p-5 rounded-md">
          1. Pinpoint the location
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-5 bg-white p-5 rounded-md">
        <div className="flex flex-col w-full gap-y-2">
          <p className="font-medium text-gray-500">
            Floor / Area <span className="text-red-500">*</span>
          </p>
          <select
            className="border border-gray-500 rounded-md p-2 w-full focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
            value={selectedFloor}
            onChange={(e) => {
              setSelectedFloor(e.target.value);
              setRoomId("");
            }}
          >
            <option value="">
              Select Floor
            </option>
            {[...new Set(rooms.map((r) => r.floor))].map(
              (floor) => (
                <option key={floor} value={floor}>
                  Floor {floor}
                </option>
              )
            )}
          </select>
        </div>

        <div className="flex flex-col w-full gap-y-2">
          <p className="font-medium text-gray-500">
            Equipment / Room <span className="text-red-500">*</span>
          </p>
          <select
            className="border border-gray-500 rounded-md p-2 w-full focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
            value={roomId}
            onChange={(e) =>
              setRoomId(e.target.value)
            }
            disabled={!selectedFloor}
          >
            <option value="">
              {selectedFloor
                ? "Select Room"
                : "Select Floor/Area First"}
            </option>
            {rooms
              .filter(
                (r) => r.floor === selectedFloor
              )
              .map((r) => (
                <option key={r.id} value={r.id}>
                  {r.room_number} (
                  {r.room_category})
                </option>
              ))}
          </select>
        </div>
      </div>

    </div>
  );
}

export default FloorRoomSelect;