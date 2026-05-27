function RoomCard({ room, onClick, assignment }) {

  // room status color (from db rooms.status)
  const roomStatusColor = {
    normal: "bg-green-500 hover:bg-green-400",
    defect: "bg-red-500 hover:bg-red-400",
  };

  // assignment status color (from room_assignment.status)
  const assignmentStatusColor = {
    pending: "bg-yellow-500 hover:bg-yellow-400",
    on_progress: "bg-blue-500 hover:bg-blue-400",
    completed: "bg-green-500 hover:bg-green-400",
  };

  // room_assignment.status overrides rooms.status color
  const activeClass = assignment
    ? assignmentStatusColor[assignment.status]
    : roomStatusColor[room.status];

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