import TaskCard from "./TaskCard";

function TaskList({ tasks, onRefresh }) {

  return (
    <div className="flex flex-col gap-y-2">
      {!tasks.length ? (
        <div className="bg-white p-4 rounded-md">
          <p className="text-gray-500 italic">
            No tasks found
          </p>
        </div>
      ) : (
        tasks.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onRefresh={onRefresh} 
          />
        ))
      )}
    </div>
  );
}

export default TaskList;
