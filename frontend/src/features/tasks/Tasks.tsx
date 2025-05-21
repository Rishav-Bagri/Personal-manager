import { useState, useEffect } from "react";

export function Tasks() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
      priority,
    };
    setTasks([...tasks, task]);
    setNewTask("");
    setPriority("Medium");
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const clearAll = () => {
    if (window.confirm("Clear all tasks?")) setTasks([]);
  };

  return (
    <div className="flex flex-col items-center mt-10 px-4">
      <h2 className="text-2xl font-bold mb-2">Task Manager</h2>
      <p className="text-gray-600 mb-5 text-sm text-center max-w-md">
        You can assign a priority to each task:
        <br />
        <span className="text-red-600 font-semibold">High</span> = Urgent & Important,{" "}
        <span className="text-yellow-600 font-semibold">Medium</span> = Important but not urgent,{" "}
        <span className="text-green-600 font-semibold">Low</span> = Can be done later.
      </p>

      <div className="flex gap-2 mb-4 w-full max-w-md">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border border-gray-300 rounded p-2"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <ul className="w-full max-w-md space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex items-center justify-between p-3 rounded border ${
              task.completed ? "bg-green-100 line-through" : "bg-white"
            }`}
          >
            <div>
              <span className="font-medium">{task.text}</span>
              <span
                className={`ml-2 text-sm ${
                  task.priority === "High"
                    ? "text-red-600"
                    : task.priority === "Medium"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                [{task.priority}]
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleComplete(task.id)}
                className="text-sm bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
              >
                {task.completed ? "Undo" : "Done"}
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-sm bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {tasks.length > 0 && (
        <button
          onClick={clearAll}
          className="mt-5 text-sm bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Clear All
        </button>
      )}
    </div>
  );
}
