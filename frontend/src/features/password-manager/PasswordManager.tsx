// PasswordManager.tsx
import { useEffect, useState } from "react"
import {
  PasswordManagerType,
  PasswordManagerCreateInput,
  PasswordManagerUpdateInput,
  PasswordManagerDeleteInput,
} from "daddys-personal-manager"
import { PasswordEntryCard } from "./PasswordEntryCard.tsx"

export function PasswordManager() {
  const [entries, setEntries] = useState<PasswordManagerType[]>([])
  const [form, setForm] = useState<PasswordManagerCreateInput>({
    domain: "",
    password: "",
    notes: "",
  })

  const api = "https://backend.bagririshav01.workers.dev/api/v1/password-manager"
  const authToken =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxZjJmZTE5LTQ0ZDYtNGMyOS1hZjc3LTA2NGE3MjU5YmNjNiIsInVzZXJOYW1lIjoiam9obmUxMjMifQ.1TOn_Vs5RcRKcoxiP8JKRyAbvT3ofaCtyLYkYqBnhe0"

  const headers = {
    "content-type": "application/json",
    authorization: authToken,
  }

  useEffect(() => {
    fetch(`${api}/domains/bulk`, { headers })
      .then(res => res.json())
      .then(setEntries)
      .catch(console.error)
  }, [])

  const handleCreate = async () => {
    const res = await fetch(`${api}/domains/create`, {
      method: "POST",
      headers,
      body: JSON.stringify(form),
    })

    if (res.ok) {
      const { created } = await res.json()
      setEntries(prev => [...prev, created])
      setForm({ domain: "", password: "", notes: "" })
    }
  }

  const handleDelete = async (id: string) => {
    const input: PasswordManagerDeleteInput = { id }
    const res = await fetch(`${api}/delete`, {
      method: "DELETE",
      headers,
      body: JSON.stringify(input),
    })

    if (res.ok) {
      setEntries(prev => prev.filter(entry => entry.id !== id))
    }
  }

  const handleUpdate = async (id: string, password: string, notes?: string) => {
    const input: PasswordManagerUpdateInput = { id, password, notes }
    const res = await fetch(`${api}/update`, {
      method: "PUT",
      headers,
      body: JSON.stringify(input),
    })

    if (res.ok) {
      const { updated } = await res.json()
      setEntries(prev =>
        prev.map(entry => (entry.id === id ? { ...entry, ...updated } : entry))
      )
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-pink-700 mb-6 text-center">Password Manager</h1>

      <div className="bg-pink-50 p-6 rounded-2xl shadow-lg mb-8 space-y-4 border border-pink-200">
        <input
          className="w-full border border-pink-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="Domain"
          value={form.domain}
          onChange={e => setForm({ ...form, domain: e.target.value })}
        />
        <input
          className="w-full border border-pink-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <input
          className="w-full border border-pink-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="Notes (optional)"
          value={form.notes || ""}
          onChange={e => setForm({ ...form, notes: e.target.value })}
        />
        <button
          className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded shadow"
          onClick={handleCreate}
        >
          Add Entry
        </button>
      </div>

      <div className="space-y-4">
        {entries.map(entry => (
          <PasswordEntryCard
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
