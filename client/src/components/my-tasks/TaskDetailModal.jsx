import CollapsibleSection from "../../common/CollapsibleSection";
import TaskForm from "./TaskForm";


function TaskDetailModal({
  isOpen,
  onClose,
  task,
  onRefresh,
}) {

  if (!isOpen) return null;

  // intial db
  const room = task.room_assignments.rooms; // parent (from getTaskDetailService)
  const report = task.latest_report; // child data: latestReport
  const submission = task.submission; // child data: submission

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg overflow-y-auto max-h-300 w-2xl">

        <div className="border-b border-gray-400 pb-4">
          <div className="relative">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black text-xl absolute right-0"
            >
              ✕
            </button>
          </div>
          <h2 className="text-2xl font-bold">
            Task Details
          </h2>
        </div>

        {!task ? (
          <div className="flex flex-col items-center bg-white justify-center rounded-md p-5 h-60">
            <p className="mt-4 text-gray-600">No task found</p>
          </div>
        ) : (
          <div>
            <div className="flex flex-col md:flex-row justify-normal md:justify-between border-b border-gray-400">
              <div className="py-4 w-full flex flex-col gap-y-2 border-b md:border-none border-gray-400">
                <h3 className="font-bold text-xl">
                  Room Information
                </h3>
                <p className="font-semibold flex capitalize">
                  Floor: {room.floor}
                </p>
                <p className="font-semibold capitalize">
                  Room Number: {room.room_number}
                </p>
                <p className="font-semibold capitalize">
                  Category: {room.room_category}
                </p>
              </div>

              <div className="py-4 w-full flex flex-col gap-y-2">
                <h3 className="font-bold text-xl">
                  Status Information
                </h3>
                <p className="font-semibold flex capitalize">
                  Your Status: {task.status?.replace("_", " ")}
                </p>
                <p className="font-semibold flex capitalize">
                  Assignment Status: {" "} {task.room_assignments.status?.replace("_", " ")}
                </p>
                <p className="font-semibold capitalize">
                  Room Status: {room.status?.replace("_", " ")}
                </p>
                <p className="font-semibold flex capitalize">
                  Assigned Date: {" "} {task.room_assignments.assigned_date}
                </p>
              </div>
            </div>

              {report ? (
                <div className="py-4 w-full gap-y-2 border-b border-gray-400">
                  <div className="relative">
                      <p className="font-bold text-xl absolute top-1">
                        Report List
                      </p>
                    </div>

                  <CollapsibleSection
                  defaultOpen={true}
                  >
                    {report.report_items.map((item) => (
                      <div
                        key={item.id}
                        className="rounded p-4 flex flex-col-reverse md:flex-row justify-normal md:justify-between gap-y-2 md:gap-y-0"
                      >
                        <div className="flex flex-col gap-y-0 md:gap-y-2">
                          <div className="flex flex-row gap-x-2">
                            <p className="font-semibold">Title:</p>
                            <p >{item.title} </p>
                          </div>
                          <div className="flex flex-row gap-x-2">
                            <p className="font-semibold">Type:</p>
                            <p className="capitalize">{item.defect_type} </p>
                          </div>
                          <div className="flex flex-row gap-x-2">
                            <p className="font-semibold">Priority:</p>
                            <p className="capitalize">{item.priority_level} </p>
                          </div>

                        </div>

                        <div className="">
                          <div className="flex gap-3 flex-wrap">
                            {item.report_item_images?.length > 0 ? (
                              item.report_item_images.map((img) => (
                                <img
                                  key={img.id}
                                  src={img.image_url}
                                  alt="report"
                                  className="w-40 h-40 object-cover rounded border"
                                />
                              ))
                            ) : (
                              <p>No images</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CollapsibleSection>
                </div>
              ) : (
                <div  className="py-4 w-full gap-y-2 border-b border-gray-400">
                  <p className="font-bold text-xl">
                    Report List
                  </p>
                  <p>
                    No defect report found.
                  </p>
                </div>
              )} 
          </div>
        )}

        <div className="flex flex-col py-4 gap-y-2">
          <p className="font-bold text-xl">
            Task
          </p>
          <TaskForm
          assignmentWorkerId={task.id}
          submission={submission}
          onSuccess={onRefresh}
          status={task.status}
          onClose={onClose}
          />
        </div>

      </div>
    </div>
  );
}

export default TaskDetailModal;