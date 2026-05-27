import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getMyTasks } from "../../services/roomAssignmentService";
import TaskList from "../../components/tasks/TaskList";
import { ClipboardList } from "lucide-react";

function MyTaskPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch worker tasks
  const fetchTasks = async () => {
    try {
      const data = await getMyTasks(user.id);
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) 
      fetchTasks();
  }, [user]);

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-row gap-x-2 bg-white rounded-md p-5">
        <ClipboardList className="w-8 h-8"/>
        <h2 className="text-2xl font-semibold">
          My Tasks
        </h2>
      </div>
      {loading ? (
        <div>
          <div className="flex flex-col items-center bg-white justify-center rounded-md p-5 h-60">
            <div className="w-12 h-12 rounded-full border-gray-300 border-t-blue-500 border-4 animate-[spin_0.5s_linear_infinite]"></div>
            <p className="mt-4 text-gray-600">Loading your tasks...</p>
          </div>
        </div>
      ) : (
        <TaskList
        tasks={tasks}
        onRefresh={fetchTasks}
      />
      )}
      
    </div>
  );
}

export default MyTaskPage;