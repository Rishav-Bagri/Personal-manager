import { useEffect, useState } from "react"
import {
  BudgetTrackerCreateType,
  BudgetTrackerUpdateType,
  BudgetTrackerType
} from "daddys-personal-manager"

export function BudgetTracker() {
  const [entries, setEntries] = useState<BudgetTrackerType[]>([])
  const [form, setForm] = useState<BudgetTrackerCreateType>({
    thingsToSpend: "",
    money: "",
    category: "",
    paidBy: new Date().toISOString(),
    paid: false
  })

  const api = "https://backend.bagririshav01.workers.dev/api/v1/budget"
  const headers = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxZjJmZTE5LTQ0ZDYtNGMyOS1hZjc3LTA2NGE3MjU5YmNjNiIsInVzZXJOYW1lIjoiam9obmUxMjMifQ.1TOn_Vs5RcRKcoxiP8JKRyAbvT3ofaCtyLYkYqBnhe0"
  }

  const fetchEntries = async () => {
    const res = await fetch(`${api}/budget`, { headers })
    if (res.ok) {
      const data: BudgetTrackerType[] = await res.json()
      setEntries(data.sort((a, b) => +new Date(b.paidBy) - +new Date(a.paidBy)))
    } else {
      console.error("Failed to fetch budget entries")
    }
  }

  useEffect(() => {
    fetchEntries()
  }, [])

  const handleCreate = async () => {
    const res = await fetch(`${api}/budget`, {
      method: "POST",
      headers,
      body: JSON.stringify(form)
    })

    if (res.ok) {
      const { created } = await res.json()
      setEntries(prev =>
        [created, ...prev].sort((a, b) => +new Date(b.paidBy) - +new Date(a.paidBy))
      )
      setForm({
        thingsToSpend: "",
        money: "",
        category: "",
        paidBy: new Date().toISOString(),
        paid: false
      })
    } else {
      console.error("Failed to create entry")
    }
  }

  const handleTogglePaid = async (id: string, paid: boolean) => {
    const updateData: BudgetTrackerUpdateType = { id, paid }
    const res = await fetch(`${api}/update`, {
      method: "PUT",
      headers,
      body: JSON.stringify(updateData)
    })

    if (res.ok) {
      const { updated } = await res.json()
      setEntries(prev =>
        prev.map(entry => (entry.id === id ? { ...entry, ...updated } : entry))
      )
    } else {
      console.error("Failed to update entry")
    }
  }

  const totalSpent = entries
    .filter(e => e.paid)
    .reduce((sum, e) => sum + (parseFloat(e.money) || 0), 0)

  const totalUnpaid = entries
    .filter(e => !e.paid)
    .reduce((sum, e) => sum + (parseFloat(e.money) || 0), 0)

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        Budget Tracker
      </h1>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-green-100 text-green-800 p-4 rounded-xl shadow text-center">
          <p className="text-sm font-medium">Total Spent</p>
          <p className="text-xl font-bold">₹{totalSpent.toFixed(2)}</p>
        </div>
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-xl shadow text-center">
          <p className="text-sm font-medium">Unpaid Budget</p>
          <p className="text-xl font-bold">₹{totalUnpaid.toFixed(2)}</p>
        </div>
      </div>

      {/* Form */}
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
          type="number"
          value={form.money}
          onChange={e => setForm({ ...form, money: e.target.value })}
        />
        <input
          className="w-full border border-green-300 p-2 rounded"
          placeholder="Category"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
        />
        <input
          className="w-full border border-green-300 p-2 rounded"
          type="datetime-local"
          value={form.paidBy.slice(0, 16)}
          onChange={e =>
            setForm({ ...form, paidBy: new Date(e.target.value).toISOString() })
          }
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleCreate}
        >
          Add Entry
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {entries.map(entry => (
          <div
            key={entry.id}
            className={`p-4 border rounded-lg shadow flex justify-between items-center ${
              entry.paid ? "bg-green-50" : "bg-yellow-50"
            }`}
          >
            <div>
              <p className="font-semibold text-lg">{entry.thingsToSpend}</p>
              <p className="text-sm text-gray-600">
                ₹{entry.money} • {entry.category} •{" "}
                {new Date(entry.paidBy).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => handleTogglePaid(entry.id, !entry.paid)}
              className={`px-3 py-1 rounded text-sm font-medium ${
                entry.paid
                  ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {entry.paid ? "✓ Paid" : "Mark Paid"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
