import { useEffect, useState } from "react"
import {
  ReminderCreateInput,
  ReminderDeleteInput,
  ReminderType,
} from "daddys-personal-manager"
import { ReminderCard } from "./ReminderCard"

export function ReminderManager() {
  const [entries, setEntries] = useState<ReminderType[]>([])
  const [form, setForm] = useState<ReminderCreateInput>({
    title: "",
    time: "",
  })

  const api = "https://backend.bagririshav01.workers.dev/api/v1/reminder/reminder"
  const headers = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxZjJmZTE5LTQ0ZDYtNGMyOS1hZjc3LTA2NGE3MjU5YmNjNiIsInVzZXJOYW1lIjoiam9obmUxMjMifQ.1TOn_Vs5RcRKcoxiP8JKRyAbvT3ofaCtyLYkYqBnhe0"
  }

  useEffect(() => {
    fetch(api, { headers })
        .then(res => res.json())
        .then(data => {
        console.log("Fetched reminders:", data)
        if(data.length!==entries.length){
            setEntries(data)
        }
        })
        .catch(console.error)
    }, [entries])


  const handleCreate = async () => {
    const res = await fetch(api, {
      method: "POST",
      headers,
      body: JSON.stringify({
        ...form,
        time: new Date(form.time).toISOString(), // Convert to ISO string
      }),
    })

    if (res.ok) {
      const created: ReminderType = await res.json()
      setEntries(prev => [...prev, created])
      setForm({ title: "", time: "" })
    }
  }

  const handleDelete = async (id: string) => {
    const input: ReminderDeleteInput = { id }
    const res = await fetch(api, {
      method: "DELETE",
      headers,
      body: JSON.stringify(input),
    })

    if (res.ok) {
      setEntries(prev => prev.filter(e => e.id !== id))
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Reminder Manager</h1>

      <div className="bg-blue-50 p-6 rounded-2xl shadow-lg mb-8 space-y-4 border border-blue-200">
        <input
          className="w-full border border-blue-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Reminder Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="datetime-local"
          className="w-full border border-blue-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.time}
          onChange={e => setForm({ ...form, time: e.target.value })}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          onClick={handleCreate}
        >
          Add Reminder
        </button>
      </div>

      <div className="space-y-4">
        {entries.map(entry => (
          <ReminderCard key={entry.id} entry={entry} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  )
}
