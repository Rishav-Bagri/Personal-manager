import { useEffect, useState } from "react"
import {
  TaskType,
  TaskCreateType,
  TaskUpdateType,
  TaskDeleteType,
} from "daddys-personal-manager"
import { TaskEntryCard } from "./TaskEntry"

export function Tasks() {
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [form, setForm] = useState<TaskCreateType>({
    title: "",
    description: "",
    dueDate: undefined,
    priority: "MEDIUM",
  })

  const api = "https://backend.bagririshav01.workers.dev/api/v1/task"
  const authToken =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxZjJmZTE5LTQ0ZDYtNGMyOS1hZjc3LTA2NGE3MjU5YmNjNiIsInVzZXJOYW1lIjoiam9obmUxMjMifQ.1TOn_Vs5RcRKcoxiP8JKRyAbvT3ofaCtyLYkYqBnhe0"

  const headers = {
    "content-type": "application/json",
    authorization: authToken,
  }

  // Fetch all tasks on mount
  useEffect(() => {
    fetch(`${api}/bulk`, { headers })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTasks(data)
        } else {
          setTasks([])
        }
      })
      .catch(console.error)
  }, [])

  // Add task (with backend response validation)
  const handleCreate = async () => {
    if (!form.title.trim() || !form.description.trim()) return
    const res = await fetch(`${api}/create`, {
      method: "POST",
      headers,
      body: JSON.stringify(form),
    })
    if (res.ok) {
      const data = await res.json()
      // Defensive: check for expected field
      if (data && data.created && data.created.id) {
        setTasks(prev => [...prev, data.created])
      } else if (Array.isArray(data)) {
        setTasks(data)
      } else {
        // fallback: re-fetch all
        fetch(`${api}/bulk`, { headers })
          .then(res => res.json())
          .then(data => Array.isArray(data) ? setTasks(data) : setTasks([]))
      }
      setForm({ title: "", description: "", dueDate: undefined, priority: "MEDIUM" })
    }
  }

  // Delete task
  const handleDelete = async (id: string) => {
    const input: TaskDeleteType = { id }
    const res = await fetch(`${api}/delete`, {
      method: "DELETE",
      headers,
      body: JSON.stringify(input),
    })
    if (res.ok) {
      setTasks(prev => prev.filter(task => task.id !== id))
    }
  }

  // Update task
  const handleUpdate = async (id: string, updates: Partial<TaskType>) => {
    const input: TaskUpdateType = { id, ...updates }
    const res = await fetch(`${api}/update`, {
      method: "PUT",
      headers,
      body: JSON.stringify(input),
    })
    if (res.ok) {
      const data = await res.json()
      if (data && data.updated && data.updated.id) {
        setTasks(prev =>
          prev.map(task => (task.id === id ? { ...task, ...data.updated } : task))
        )
      } else {
        // fallback: re-fetch all
        fetch(`${api}/bulk`, { headers })
          .then(res => res.json())
          .then(data => Array.isArray(data) ? setTasks(data) : setTasks([]))
      }
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Task Manager</h1>
      <div className="bg-blue-50 p-6 rounded-2xl shadow-lg mb-8 space-y-4 border border-blue-200">
        <input
          className="w-full border border-blue-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="w-full border border-blue-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <div className="flex gap-2">
          <input
            type="date"
            className="border border-blue-300 p-2 rounded"
            value={form.dueDate ? (typeof form.dueDate === "string" ? form.dueDate : (form.dueDate as Date).toISOString().slice(0, 10)) : ""}
            onChange={e => setForm({ ...form, dueDate: e.target.value ? new Date(e.target.value) : undefined })}
          />
          <select
            className="border border-blue-300 p-2 rounded"
            value={form.priority}
            onChange={e => setForm({ ...form, priority: e.target.value as "HIGH" | "MEDIUM" | "LOW" })}
          >
            <option value="HIGH">HIGH</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LOW">LOW</option>
          </select>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          onClick={handleCreate}
        >
          Add Task
        </button>
      </div>
      <div className="space-y-4">
        {Array.isArray(tasks) && tasks.length > 0 ? (
          tasks
            .filter(task => task && task.id && task.title)
            .map(task => (
              <TaskEntryCard
                key={task.id}
                task={task}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))
        ) : (
          <p>No tasks yet.</p>
        )}
      </div>
    </div>
  )
}