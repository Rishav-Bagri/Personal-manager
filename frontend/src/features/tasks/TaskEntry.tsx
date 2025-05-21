import { useState } from "react"
import { TaskType } from "daddys-personal-manager"

interface Props {
  task: TaskType
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: Partial<TaskType>) => Promise<void>
}

export function TaskEntryCard({ task, onDelete, onUpdate }: Props) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [priority, setPriority] = useState(task.priority || "MEDIUM")
  const [dueDate, setDueDate] = useState(task.dueDate ? task.dueDate.slice(0, 10) : "")
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    await onUpdate(task.id, {
      title,
      description,
      priority,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
    })
    setEditing(false)
    setLoading(false)
  }

  const handleToggleDone = async () => {
    setLoading(true)
    await onUpdate(task.id, { done: !task.done })
    setLoading(false)
  }

  return (
    <div className={`bg-white p-4 rounded-xl shadow border ${task.done ? "opacity-60" : ""}`}>
      <div className="flex justify-between items-center">
        <h2 className={`text-lg font-semibold ${task.done ? "line-through text-gray-500" : ""}`}>
          {editing ? (
            <input
              className="border rounded px-2 py-1 w-full"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          ) : (
            task.title
          )}
        </h2>
        <button
          onClick={() => onDelete(task.id)}
          className="text-sm text-red-500 hover:underline"
        >
          delete
        </button>
      </div>
      <div className="mt-2">
        <span
          className={`text-xs font-bold mr-2 ${
            task.priority === "HIGH"
              ? "text-red-600"
              : task.priority === "LOW"
              ? "text-green-600"
              : "text-yellow-600"
          }`}
        >
          [{task.priority || "MEDIUM"}]
        </span>
        <span className="text-xs text-gray-600">
          Due: {task.dueDate ? task.dueDate.slice(0, 10) : "No due date"}
        </span>
      </div>
      <div className="mt-2">
        {editing ? (
          <textarea
            className="border rounded px-2 py-1 w-full"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        ) : (
          <p className="text-gray-700">{task.description}</p>
        )}
      </div>
      {editing ? (
        <div className="mt-2 flex gap-2">
          <input
            type="date"
            className="border rounded px-2 py-1"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />
          <select
            className="border rounded px-2 py-1"
            value={priority}
            onChange={e => setPriority(e.target.value as "HIGH" | "MEDIUM" | "LOW")}
          >
            <option value="HIGH">HIGH</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LOW">LOW</option>
          </select>
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
            onClick={handleSave}
            disabled={loading}
          >
            save
          </button>
          <button
            className="bg-gray-300 px-3 py-1 rounded"
            onClick={() => setEditing(false)}
            disabled={loading}
          >
            cancel
          </button>
        </div>
      ) : (
        <div className="mt-3 flex gap-3">
          <button
            className={`text-sm px-2 py-1 rounded ${
              task.done
                ? "bg-yellow-400 hover:bg-yellow-500"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
            onClick={handleToggleDone}
            disabled={loading}
          >
            {task.done ? "Mark Undone" : "Mark Done"}
          </button>
          <button
            className="text-sm text-blue-600 hover:underline"
            onClick={() => setEditing(true)}
            disabled={loading}
          >
            edit
          </button>
        </div>
      )}
    </div>
  )
}