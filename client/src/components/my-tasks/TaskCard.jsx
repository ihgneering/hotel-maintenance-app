import { useState } from "react";
import { acceptTask, getTaskDetail } from "../../services/roomAssignmentService";
import TaskDetailModal from "./TaskDetailModal";
import StatusBadge from "../../common/StatusBadge";
import { Dot } from "lucide-react";

function TaskCard({ task, onRefresh }) {

  const [openModal, setOpenModal] = useState(false);
  const [taskDetail, setTaskDetail] = useState(null);
  const [loading, setLoading] = useState(false);

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

  // open task detail modal
  const handleOpenTask = async () => {
    try {
      setLoading(true);
      const data = await getTaskDetail(task.id);
      setTaskDetail(data);
      setOpenModal(true);
    } catch (err){
      console.error(err);
      alert("Failed to load task detail");
    } finally {
      setLoading(false);
    }
  };

  // intial db
  const room = task.room_assignments.rooms; // parent parent (from getWorkerTasksService)
  const report = task.latest_report; // child data: latest_report

  return (
    <div className="bg-white p-6 rounded-md flex flex-col gap-y-2">

      <div className="flex flex-col">

        <div className="flex flex-col-reverse md:flex-row border-b pb-4 border-gray-400 gap-y-4 md-gap-y-0">
          <div className="flex flex-col w-full">
            <div className="flex flex-col">
              <p className="text-xl font-semibold">
                Floor {room.floor}
              </p>
              <p className="text-xl font-semibold">
                Room {room.room_number}
              </p>
            </div>
            <p className="text-xl font-semibold capitalize">
              {room.room_category}
            </p>
          </div>

          <div className="flex flex-col gap-y-2 w-full">
            <div className="flex justify-between md:justify-end gap-x-4 items-center">
              <p className="font-semibold">
                Your Status
              </p>
              <StatusBadge
              type="worker"
              status={task.status}
              />
            </div>
            <div className="flex justify-between md:justify-end gap-x-4 items-center">
              <p className="font-semibold">
                Assignment Status
              </p>
              <StatusBadge
              type="assignment"
              status={task.room_assignments.status}
              />
            </div>
              
          </div>
        </div>

        <div  className="flex w-full flex-col">
          {report ? (
            <div className="flex flex-col py-4">
              {report.report_items.map((item) => (
                <div 
                key={item.id}
                className="flex flex-row gap-x-2"
                >
                  <div className="flex flex-row">
                    <Dot/>
                    <p>{item.title}</p>
                  </div>
                  <p className="capitalize">
                    ({item.priority_level})
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col py-4">
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
        onClick={handleOpenTask}
        disabled={loading}
        className={`
          p-2 rounded-md text-white font-semibold w-full
          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-400"
          }
        `}
        >
        {loading
          ? "Loading detail..."
          : "Open Task"}
        </button>
        )}
      </div>

      <TaskDetailModal
      isOpen={openModal}
      onClose={() => setOpenModal(false)}
      task={taskDetail}
      onRefresh={onRefresh}
      />

    </div>
  );
}

export default TaskCard;