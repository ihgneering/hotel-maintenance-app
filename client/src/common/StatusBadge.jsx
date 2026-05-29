function StatusBadge({ type, status }) {

  // rooms.status color
  const roomStatusStyle = {
    normal: "bg-green-500 text-white",
    defect: "bg-red-500 text-white",
    maintenance: "bg-yellow-500 text-white",
    out_of_service: "bg-gray-700 text-white",
  };

  // room_assignment.status color
  const assignmentStatusStyle = {
    pending: "bg-yellow-500 text-white",
    on_progress: "bg-blue-500 text-white",
    on_review: "bg-gray-500 text-white",
  };

  // room_assignment_workers.status color
  const workerStatusStyle = {
    pending: "bg-yellow-500 text-white",
    on_progress: "bg-blue-500 text-white",
    completed: "bg-green-500 text-white",
  };


  const getStyle = () => {
    if (type === "room") {
      return roomStatusStyle[status];
    }

    if (type === "assignment") {
      return assignmentStatusStyle[status];
    }

    if (type === "worker") {
      return workerStatusStyle[status];
    }

    return "bg-gray-300 text-black";
  };

  const activeStyle = getStyle();

  return (
    <span className={`px-4 py-2 rounded-full text-xs font-semibold capitalize ${activeStyle}`}>
      {status.replace("_", " ")}
    </span>
  );
}

export default StatusBadge;