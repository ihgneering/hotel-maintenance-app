import { useEffect, useState } from "react";
import { createAssignment, getWorkers } from "../../services/roomAssignmentService";
import useDebounce from "../../hooks/useDebounce";
import { useAuth } from "../../context/AuthContext";
import { Search } from "lucide-react";
import StatusBadge from "../../common/StatusBadge";

function RoomDetailModal({ 
  isOpen, 
  onClose, 
  room,
  onAssignmentCreated,
}) {
  const { user } = useAuth();

  const [workers, setWorkers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedWorkers, setSelectedWorkers] = useState([]);
  const [assignedDate, setAssignedDate] = useState("");
  const [loading, setLoading] = useState(true);

  // fetch workers
  const fetchWorkers = async () => {
    try {
      const data = await getWorkers();
      setWorkers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchWorkers();
    }
  }, [isOpen]);

  // filter search
  const debouncedSearch = useDebounce(search, 300);

  const filteredWorkers = workers.filter((w) => {
    const fullName = `${w.first_name} ${w.last_name}`.toLowerCase();
    return fullName.includes(debouncedSearch.toLowerCase());
  });

  // select/unselect worker
  const toggleWorker = (id) => {
    setSelectedWorkers((prev) =>
      prev.includes(id)
        ? prev.filter((w) => w !== id)
        : [...prev, id]
    );
  };

  // assignment date
  useEffect(() => {
    if (isOpen) {
      fetchWorkers();

      // set default date = today
      const today = new Date().toISOString().split("T")[0];
      setAssignedDate(today);
    }
  }, [isOpen]);

  // submit assignment
  const handleSubmit = async () => {
    try {
      // validation
      if (!assignedDate) {
        alert("Please select assignment date");
        return;
      }

      if (selectedWorkers.length === 0) {
        alert("Please select at least one worker");
        return;
      }

      // payload
      const payload = {
        room_id: room.id,
        worker_ids: selectedWorkers,
        assigned_by: user.id,
        assigned_date: assignedDate,
      };

      await createAssignment(payload);
      await onAssignmentCreated();

      // reset state
      setSelectedWorkers([]);
      setAssignedDate("");

      // close modal
      onClose();

      alert("Assignment created successfully!");

    } catch (err) {
      console.error(err);
      alert("Failed to create assignment");
    }
  };

  if (!isOpen || !room) return null;

  return (

      <div
        className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
        onClick={onClose}
      >
        <div 
        className=" bg-white flex flex-col p-5 gap-y-4 rounded-md text-primary w-xl"
        onClick={(e) => e.stopPropagation()}
        >
            <div className="border-b py-4 border-gray-400">
              <div className="relative">
                <button
                  onClick={onClose}
                  className="text-gray-400 font-semibold hover:text-gray-700 text-xl absolute right-0 bottom-0"
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-row justify-between pr-10">
                <h2 className="text-xl flex items-center font-semibold">
                  Room {room.room_number}
                </h2>
                <div className="border-l border-gray-400"></div>
                <span className="text-xl flex items-center font-semibold">
                    Floor {room.floor}
                  </span>
                <div className="border-l border-gray-400"></div>
                <p className="text-xl flex items-center font-semibold capitalize ">
                  {room.room_category}
                </p>
                <div className="border-l border-gray-400"></div>
                <StatusBadge
                type="room"
                status={room.status}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-semibold">
                Assign Maintenance Task
              </h3>
              <div className="relative flex items-center">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50 w-5 h-5"/>
                <input
                  type="text"
                  placeholder="Search worker..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border border-gray-500 rounded-md p-2 w-full focus:ring-blue-500 focus:border-blue-500 outline-none pl-10"
                />
              </div>
              <div className="border-b border-gray-400 pb-4">
                <p className="font-semibold">
                  Worker list
                </p>
              </div>
              
              {loading ? (
                <div className="flex flex-col items-center justify-center p-5 h-60">
                  <div className="w-12 h-12 rounded-full border-gray-300 border-t-blue-500 border-4 animate-[spin_0.5s_linear_infinite]"></div>
                  <p className="mt-4 text-gray-600">Loading workers...</p>
                </div>
              ) : (
                <div className="max-h-60 overflow-y-auto p-2 space-y-1 rounded-md">
                  {filteredWorkers.map((worker) => {
                    
                    const isSelected = selectedWorkers.includes(worker.id);

                    return (
                      <div
                        key={worker.id}
                        onClick={() => toggleWorker(worker.id)}
                        className={`flex items-center justify-between p-2 rounded cursor-pointer transition
                          ${isSelected ? "bg-blue-100" : "hover:bg-gray-100"}`}
                      >
                        <span>
                          {worker.first_name} {worker.last_name}
                        </span>

                        {isSelected && (
                          <span className="text-blue-500 text-sm">Selected</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {selectedWorkers.map((id) => {

                  const worker = workers.find((w) => w.id === id);

                  return (
                    <div
                      key={id}
                      className="flex items-center gap-2 bg-blue-500 px-3 py-2 rounded-full"
                    >
                      <span className="text-sm font-semibold text-white">
                        {worker?.first_name} {worker?.last_name}
                      </span>

                      <button
                        onClick={() => toggleWorker(id)}
                        className="text-white text-sm font-semibold"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="">
              <h3 className="font-semibold mb-2">Assignment Date</h3>
              <input
                type="date"
                value={assignedDate}
                onChange={(e) => setAssignedDate(e.target.value)}
                className="border border-gray-500 rounded-md p-2 w-full focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div className="">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`text-white px-4 py-2 rounded w-full transition duration-300 ${
                  loading 
                    ? "bg-gray-500 cursor-not-allowed" 
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Please wait..." : "Submit Assignment"}
              </button>
            </div>

        </div>
      </div>

      

  );
}

export default RoomDetailModal;