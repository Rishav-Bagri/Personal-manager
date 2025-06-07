import { useEffect, useState } from "react"
import {
  NotepadCreateInput,
  NotepadDeleteInput,
  NotepadUpdateInput,
  NotepadType
} from "daddys-personal-manager"
import { NoteCard } from "./NoteCard"

export function Notepad() {
  const [entries, setEntries] = useState<NotepadType[]>([])
  const [form, setForm] = useState<NotepadCreateInput>({ title: "", content: "" })

  const notepadApi = "https://backend.bagririshav01.workers.dev/api/v1/notepad/notepad"
  const notepadHeaders = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxZjJmZTE5LTQ0ZDYtNGMyOS1hZjc3LTA2NGE3MjU5YmNjNiIsInVzZXJOYW1lIjoiam9obmUxMjMifQ.1TOn_Vs5RcRKcoxiP8JKRyAbvT3ofaCtyLYkYqBnhe0"
  }

  useEffect(() => {
    fetch(notepadApi, { headers: notepadHeaders })
      .then(res => res.json())
      .then(setEntries)
      .catch(console.error)
  }, [])

  const handleCreate = async () => {
    const res = await fetch(notepadApi, {
      method: "POST",
      headers: notepadHeaders,
      body: JSON.stringify(form)
    })

    if (res.ok) {
      const { created } = await res.json()
      setEntries(prev => [...prev, created])
      setForm({ title: "", content: "" })
    }
  }

  const handleDelete = async (id: string) => {
    const input: NotepadDeleteInput = { id }
    const res = await fetch(notepadApi, {
      method: "DELETE",
      headers: notepadHeaders,
      body: JSON.stringify(input)
    })

    if (res.ok) {
      setEntries(prev => prev.filter(e => e.id !== id))
    }
  }

  const handleUpdate = async (id: string, update: NotepadUpdateInput) => {
    const res = await fetch(notepadApi, {
      method: "PUT",
      headers: notepadHeaders,
      body: JSON.stringify({ ...update, id })
    })

    if (res.ok) {
      const { updated } = await res.json()
      setEntries(prev => prev.map(e => (e.id === id ? { ...e, ...updated } : e)))
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Notepad</h1>

      <div className="bg-blue-50 p-6 rounded-2xl shadow-lg mb-8 space-y-4 border border-blue-200">
        <input
          className="w-full p-2 border border-blue-300 rounded"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="w-full p-2 border border-blue-300 rounded"
          placeholder="Content"
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleCreate}
        >
          Add Note
        </button>
      </div>

      <div className="space-y-4">
        {entries.map(entry => (
          <NoteCard
            key={entry.id}
            entry={entry}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  )
}
