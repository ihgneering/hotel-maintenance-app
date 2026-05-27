import { acceptTask } from "../../services/roomAssignmentService";

function TaskCard({ task, onRefresh }) {

  // handle accept
  const handleAccept = async () => {
    try {
      await acceptTask({
        assignment_worker_id: task.id,
        assignment_id: task.room_assignments.id,
      });

      alert("Task accepted");

      if (onRefresh) {
        onRefresh();
      }

    } catch (err) {
      console.error(err);
      alert("Failed to accept task");
    }
  };

  // intial db
  const room = task.room_assignments.rooms;
  const report = task.latest_report;

  return (
    <div className="bg-white p-5 rounded-md flex flex-col gap-y-2">

      <div className=" flex flex-row justify-between">
        <div className="flex w-full flex-col">
          <p>
            Floor {room.floor} | Room {room.room_number}
          </p>
          <p>Worker Status: {task.status}</p>
          <p>Assignment Status: {task.room_assignments.status}</p>
          <p>Assignment date: {task.room_assignments.assigned_date}</p>
        </div>
        <div  className="flex w-full flex-col">
          {report ? (
            <div>
              <p>Defect Report List:</p>
              {report.report_items.map((item) => (
                <div key={item.id}>
                  <p>Title: {item.title}</p>
                  <p>Type: {item.defect_type}</p>
                  <p>Priority: {item.priority_level}</p>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p>Defect Report List:</p>
              <p>No defect reported</p>
            </div>
          )}
        </div>
      </div>

      <div>
        {task.status === "pending" ? (
        <button
        onClick={handleAccept}
        className="p-2 rounded-md bg-green-500 text-white font-semibold hover:bg-green-400 w-full"
        >
          Accept Task
        </button>
        ) : (
        <button
        className="p-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-400 w-full"
        >
          Open Task
        </button>
        )}
      </div>

    </div>
  );
}

export default TaskCard;