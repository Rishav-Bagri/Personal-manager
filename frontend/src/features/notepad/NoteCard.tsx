import { useState } from "react"
import { NotepadType, NotepadUpdateInput } from "daddys-personal-manager"

interface Props {
  entry: NotepadType
  onDelete: (id: string) => void
  onUpdate: (id: string, update: NotepadUpdateInput) => void
}

export function NoteCard({ entry, onDelete, onUpdate }: Props) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    title: entry.title,
    content: entry.content
  })

  const handleSave = () => {
    onUpdate(entry.id, {
      id: entry.id,
      title: prompt("New Title", entry.title) || entry.title,
      content: prompt("New Content", entry.content) || entry.content
    })
    setEditing(false)
  }

  return (
    <div className="p-4 border rounded-xl bg-white shadow space-y-2">
      {editing ? (
        <>
          <input
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <textarea
            value={form.content}
            onChange={e => setForm({ ...form, content: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-green-500 text-white rounded" onClick={handleSave}>
              Save
            </button>
            <button className="px-3 py-1 bg-gray-300 rounded" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold">{entry.title}</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{entry.content}</p>
          <div className="flex justify-between">
            <button className="text-blue-600" onClick={() => setEditing(true)}>Edit</button>
            <button className="text-red-600" onClick={() => onDelete(entry.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  )
}
