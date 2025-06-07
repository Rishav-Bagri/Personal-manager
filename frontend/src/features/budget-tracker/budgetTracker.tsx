import { useEffect, useState } from "react"
import {
  BudgetTrackerCreateType,
  BudgetTrackerUpdateType,
  BudgetTrackerType,
} from "daddys-personal-manager"
import { BudgetCard } from "./BudgetCard"

export function BudgetTracker() {
  const [entries, setEntries] = useState<BudgetTrackerType[]>([])
  const [form, setForm] = useState<BudgetTrackerCreateType>({
    thingsToSpend: "",
    money: "",
    category: "",
    paidBy: new Date().toISOString(),
    paid: false,
  })

  const api = "https://backend.bagririshav01.workers.dev/api/v1/budget"
  const headers = {
    "content-type": "application/json",
    authorization: "Bearer <your-token-here>",
  }

  useEffect(() => {
    fetch(`${api}`, { headers })
      .then(res => res.json())
      .then(setEntries)
      .catch(console.error)
  }, [])

  const handleCreate = async () => {
    const res = await fetch(`${api}`, {
      method: "POST",
      headers,
      body: JSON.stringify(form),
    })

    if (res.ok) {
      const { created } = await res.json()
      setEntries(prev => [...prev, created])
      setForm({
        thingsToSpend: "",
        money: "",
        category: "",
        paidBy: new Date().toISOString(),
        paid: false,
      })
    }
  }

  const handleUpdate = async (id: string, update: BudgetTrackerUpdateType) => {
    const res = await fetch(`${api}/update`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ ...update, id }),
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
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">Budget Tracker</h1>

      <div className="bg-green-50 p-6 rounded-2xl shadow-lg mb-8 space-y-4 border border-green-200">
        <input
          className="w-full border border-green-300 p-2 rounded"
          placeholder="Thing to spend on"
          value={form.thingsToSpend}
          onChange={e => setForm({ ...form, thingsToSpend: e.target.value })}
        />
        <input
          className="w-full border border-green-300 p-2 rounded"
          placeholder="Amount"
          value={form.money}
          onChange={e => setForm({ ...form, money: e.target.value })}
        />
        <input
          className="w-full border border-green-300 p-2 rounded"
          placeholder="Category (optional)"
          value={form.category || ""}
          onChange={e => setForm({ ...form, category: e.target.value })}
        />
        <label className="block text-sm">
          Paid:
          <input
            type="checkbox"
            className="ml-2"
            checked={form.paid}
            onChange={e => setForm({ ...form, paid: e.target.checked })}
          />
        </label>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
          onClick={handleCreate}
        >
          Add Entry
        </button>
      </div>

      <div className="space-y-4">
        {entries.map(entry => (
          <BudgetCard key={entry.id} entry={entry} onUpdate={handleUpdate} />
        ))}
      </div>
    </div>
  )
}
