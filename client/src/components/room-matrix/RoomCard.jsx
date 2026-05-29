function RoomCard({ room, onClick, }) {

  // room matrix status color (from db rooms.status)
  const roomStatusColor = {
    normal: "bg-green-500 hover:bg-green-400",
    defect: "bg-red-500 hover:bg-red-400",
    maintenance: "bg-yellow-500 hover:bg-yellow-400",
  };

  // status color for rooms.status 
  const activeClass =
    roomStatusColor[room.status] || "bg-gray-500 hover:bg-gray-400";

  return (
    <button
      onClick={onClick}
      className={`
        rounded-md px-4 py-2 text-white transition-colors duration-200
        ${activeClass}
      `}
    >
      <h3 className="font-bold text-sm">
        {room.room_number}
      </h3>
    </button>
  );
}

export default RoomCard;