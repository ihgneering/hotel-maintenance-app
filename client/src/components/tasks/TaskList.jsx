import TaskCard from "./TaskCard";

function TaskList({ tasks, onRefresh,}) {
  if (!tasks.length) {
    return <p>No tasks found</p>;
  }

  return (
    <div className="flex flex-col gap-y-2">
      {tasks.map((task) => (
        <TaskCard 
        key={task.id} 
        task={task}
        onRefresh={onRefresh}
        />
      ))}
    </div>
  );
}

export default TaskList;